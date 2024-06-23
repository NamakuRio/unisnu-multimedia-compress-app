import type { CompressedFile, SelectedFile } from "~/types";
import JSZip from "jszip";
import FileSaver from "file-saver";

// Fungsi untuk mengecek apakah suatu objek adalah Blob atau tidak
function isBlob(obj: any): obj is Blob {
  return obj instanceof Blob;
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      b64ToBlob(image: string, type: string) {
        var byteString = atob(image.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type });
      },
      compressImage(
        file: SelectedFile,
        quality: number = 0.5
      ): Promise<SelectedFile> {
        return new Promise((resolve, reject) => {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(file?.file);

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(new Error("Failed to get canvas context"));
              return;
            }

            const MAX_WIDTH = 1080;
            const MAX_HEIGHT = 1080;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Mendapatkan data URL berdasarkan tipe file
            const dataURL = canvas.toDataURL(file.type, quality);
            const now = new Date();
            const lastModified = Math.floor(now.getTime());

            const imageBase64 = dataURL?.split(";")[1];
            const blob = useNuxtApp().$b64ToBlob(imageBase64, file.type);

            const newFile = new File([blob], file.name, {
              type: file.type,
              lastModified: lastModified,
            });

            let output: SelectedFile = {
              file: newFile,
              preview: dataURL,
              name: file.name,
              size: blob.size,
              type: file.type,
              lastModified: lastModified,
            };

            resolve(output);
          };

          img.onerror = (error) => {
            reject(error);
          };
        });
      },
      downloadImage(content: File, name: string): void {
        FileSaver.saveAs(content, name);
      },
      downloadZip(files: CompressedFile[]): void {
        const zip = new JSZip();

        files.forEach((file, index) => {
          zip.file(file?.after?.name, file?.after?.file);
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
          const zipFileName = `images-compressed-${Date.now()}.zip`;
          FileSaver.saveAs(content, zipFileName);
        });
      },
    },
  };
});
function reject(arg0: Error) {
  throw new Error("Function not implemented.");
}
