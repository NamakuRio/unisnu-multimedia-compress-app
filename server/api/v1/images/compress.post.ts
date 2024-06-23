import sharp from "sharp";
import { createResponse } from "~/server/response";
import { supabase } from "~/utils/supabase";
import {
  SupabasePublicUrlResponse,
  SupabaseUploadFileResponse,
} from "~/types/supabase";
import { randomText } from "~/utils/helpers";

const BUCKET_NAME = "compress-image";

async function getPublicUrl(
  filePath: string
): Promise<SupabasePublicUrlResponse> {
  const { data } = await supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data;
}

async function uploadFile(
  file: File | Buffer,
  path: string,
  contentType?: string
): Promise<SupabaseUploadFileResponse> {
  const options: { upsert?: boolean; contentType?: string } = { upsert: true };

  if (contentType) options.contentType = contentType;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, options);

  if (error) throw new Error(`Failed to upload file: ${error.message}`);

  return data;
}

async function deleteObject(objectIds: string[]) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(objectIds);

  if (error) throw new Error(`Failed to delete objects: ${error.message}`);

  return data;
}

async function compressImage(file: File, quality: number = 0.5) {
  try {
    /** GENERATE ORIGINAL RANDOM NAME */
    const originalFileName = file.name;
    const originalFileNameManipulate =
      randomText(10, true) + "_" + originalFileName;
    const originalPath = `originals/${originalFileNameManipulate}`;

    /** UPLOAD ORIGINAL FILE */
    const originalUpload = await uploadFile(file, originalPath);
    const originalPublicPath = await getPublicUrl(originalUpload?.path);
    const originalFetchImage: any = await $fetch(originalPublicPath?.publicUrl);

    if (!originalFetchImage) throw new Error("Failed to fetch image");

    /** COMPRESSION */
    const arrayBuffer = await originalFetchImage?.arrayBuffer();
    let { width, height } = await sharp(arrayBuffer).metadata();
    const MAX_WIDTH = 1080;
    const MAX_HEIGHT = 1080;
    let resized = {};
    if (width && height) {
      if (width > height) {
        // if (width > MAX_WIDTH) {
        // height = Math.round((MAX_WIDTH / width) * height);
        // width = MAX_WIDTH;
        resized = { width: MAX_WIDTH };
        // }
      } else {
        // if (height > MAX_HEIGHT) {
        // width = Math.round((MAX_HEIGHT / height) * width);
        // height = MAX_HEIGHT;
        resized = { height: MAX_HEIGHT };
        // }
      }
    }
    const buffer = Buffer.from(arrayBuffer);
    let sharpInstance = sharp(buffer);
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      sharpInstance = sharpInstance.jpeg({
        quality: Math.round(quality * 100),
      });
    } else if (file.type === "image/png") {
      sharpInstance = sharpInstance.png({ quality: Math.round(quality * 100) });
    } else if (file.type === "image/webp") {
      sharpInstance = sharpInstance.webp({
        quality: Math.round(quality * 100),
      });
    } else {
      sharpInstance = sharpInstance.jpeg({ quality: quality });
    }

    const compressedFileBuffer = await sharpInstance.resize(resized).toBuffer();

    /** DELETE ORIGINAL FILE */
    await deleteObject([originalPath]);

    /** GENERATE COMPRESSED RANDOM NAME */
    const compressedFileName = file.name;
    const compressedFileNameManipulate = `${
      compressedFileName?.split(".")[0]
    }_compressed_${randomText(1, true)}.${compressedFileName?.split(".")[1]}`;

    // Prepare compressed file details
    const base64 = compressedFileBuffer.toString("base64");
    const now = new Date();
    const lastModified = Math.floor(now.getTime());

    const compressedFile = {
      file: null,
      preview: null,
      fileBase64: base64,
      name: compressedFileNameManipulate,
      size: compressedFileBuffer.length,
      type: file.type,
      lastModified: lastModified,
    };

    return compressedFile;
  } catch (error: any) {
    throw new Error(`Failed to compress image: ${error?.message}`);
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readFormData(event);

    const files: File[] = [];
    for (const [key, value] of body.entries()) {
      if (value instanceof File) {
        files.push(value);
      }
    }
    let bodyQuality = body.get("quality");
    let quality: number = 0.5;
    if (bodyQuality) quality = Number(bodyQuality);

    console.time("Total Processing Time");
    const compressedFilesPromises = files.map((file) =>
      compressImage(file, quality)
    );
    const compressedFiles = await Promise.all(compressedFilesPromises);
    console.timeEnd("Total Processing Time");

    return createResponse(
      true,
      "Images compressed successfully",
      compressedFiles
    );
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to compress file: ${error.message}`,
    });
  }
});
