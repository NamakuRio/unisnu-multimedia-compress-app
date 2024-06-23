import sharp from "sharp";
import { createResponse } from "~/server/response";
import { randomText } from "~/utils/helpers";

async function compressImage(file: File, quality: number = 0.5) {
  try {
    /** GET BUFFER FILE */
    const originalBuffer = Buffer.from(await file.arrayBuffer());

    /** COMPRESSION */
    let { width, height } = await sharp(originalBuffer).metadata();
    const MAX_WIDTH = 1080;
    const MAX_HEIGHT = 1080;
    let resized = {};
    if (width && height) {
      if (width > height) {
        resized = { width: MAX_WIDTH };
      } else {
        resized = { height: MAX_HEIGHT };
      }
    }

    let sharpInstance = sharp(originalBuffer);
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
      sharpInstance = sharpInstance.jpeg({
        quality: Math.round(quality * 100),
      });
    }

    const compressedFileBuffer = await sharpInstance.resize(resized).toBuffer();

    /** GENERATE COMPRESSED RANDOM NAME */
    const compressedFileNameManipulate = `${
      file.name?.split(".")[0]
    }-compressed-${Date.now()}.${file.name?.split(".")[1]}`;

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
