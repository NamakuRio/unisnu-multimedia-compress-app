import sharp from "sharp";
import fs from "fs/promises";
import { createResponse } from "~/server/response";
import { supabase } from "~/utils/supabase";

async function getPublicUrl(filePath) {
  const { data } = await supabase.storage
    .from("compress-image")
    .getPublicUrl(`${filePath}`);

  return data;
}

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from("compress-image")
    .upload(`images/${file.name}`, file);

  return data;
}

async function compressImage(file) {
  try {
    const upload = await uploadFile(file);
    const publicPath = await getPublicUrl(upload.path);
    const fetchImage = await $fetch(publicPath?.publicUrl);

    // const fileBuffer = await fs.readFile(publicPath.publicUrl);
    const arrayBuffer = await fetchImage?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const compressedFileBuffer = await sharp(buffer)
      .resize({ width: 1080 })
      .toBuffer();

    await supabase.storage
      .from("compress-image")
      .upload(`output/${file.name}`, compressedFileBuffer);

    // Prepare compressed file details
    const compressedFile = {
      file: compressedFileBuffer,
      name: `compressed_${file.name}`,
      size: compressedFileBuffer.length,
      type: file.type,
      lastModified: file.lastModified,
    };

    return compressedFile;
  } catch (error: any) {
    throw new Error(`Failed to compress image: ${error?.message}`);
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readFormData(event);

    const files = [];
    for (const [key, value] of body.entries()) {
      files.push(value);
    }

    const compressedFilesPromises = files.map(compressImage);
    const compressedFiles = await Promise.all(compressedFilesPromises);

    return createResponse(
      true,
      "Images compressed successfully",
      compressedFiles
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to compress file",
    });
  }
});
