<template>
  <div class="container mx-auto space-y-10">
    <span v-html="outputError"> </span>
    <div class="flex flex-col gap-4 lg:flex-row">
      <!-- Card Form -->
      <BaseCard class="flex-1 p-6">
        <!-- TITLE -->
        <p class="text-3xl font-bold text-center text-gray-12">
          Compress Image
        </p>
        <!-- TITLE -->
        <!-- FORM -->
        <div class="mt-8">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div
              @dragover.prevent="handleDragOver"
              @dragenter.prevent="handleDragEnter"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
              :class="[
                'relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer',
                isDragging
                  ? 'border-primary-6 bg-primary-2'
                  : 'border-gray-6 bg-gray-2 bg-opacity-50 hover:border-primary-6 hover:bg-primary-2 transition-all duration-200',
              ]"
              @click="triggerFileInput"
            >
              <input
                type="file"
                @change="handleSelectedFile"
                accept="image/*"
                multiple
                class="hidden"
                ref="fileInputElement"
                :disabled="isLoading"
              />
              <div>
                <!-- BELUM MEMILIH FILE -->
                <div
                  v-if="!selectedFiles.length"
                  class="flex flex-col items-center"
                >
                  <BaseIcon
                    name="material-symbols:add-photo-alternate-outline-rounded"
                    size="4rem"
                    class="text-primary-10"
                  />
                  <p class="mt-2 text-sm text-gray-10">
                    Drag files here or
                    <span class="text-primary-10">browse</span> to choose files
                  </p>
                </div>
                <!-- BELUM MEMILIH FILE -->
                <!-- SUDAH MEMILIH FILE -->
                <div v-else class="relative">
                  <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3"
                  >
                    <!-- LIST FILE -->
                    <div
                      v-for="(file, index) in selectedFiles"
                      :key="index"
                      class="relative p-3 border rounded-lg border-gray-6 bg-gray-1"
                    >
                      <button
                        @click.stop="removeImage(index)"
                        type="button"
                        class="absolute z-[1] flex items-center justify-center gap-1 p-1 overflow-hidden transition-all duration-150 border rounded-full w-[26px] hover:w-[84px] hover:px-2 shadow whitespace-nowrap text-primary-surface bg-gray-1 border-gray-5 -top-3 -right-3 group/remove"
                      >
                        <BaseIcon
                          name="material-symbols:close-rounded"
                          class="w-4 h-4 transition duration-200 group-hover/remove:rotate-90"
                        />
                        <p
                          class="hidden overflow-hidden text-xs whitespace-nowrap group-hover/remove:block"
                        >
                          Hapus
                        </p>
                      </button>
                      <div
                        class="flex items-center justify-center w-full overflow-hidden h-52"
                      >
                        <BaseImage
                          :src="file.preview"
                          alt="Selected"
                          class="object-contain h-auto max-w-full max-h-full rounded-lg"
                        />
                      </div>
                      <div class="mt-2">
                        <p class="text-sm text-gray-10">
                          Name :
                          <span
                            class="block overflow-hidden whitespace-nowrap text-ellipsis"
                            >{{ file?.name }}</span
                          >
                        </p>
                        <p class="text-sm text-gray-10">
                          Size : {{ (file.size / 1024).toFixed(2) }} KB
                        </p>
                      </div>
                    </div>
                    <!-- LIST FILE -->
                    <!-- SECTION TO ADD NEW FILE -->
                    <div
                      class="relative flex flex-col items-center h-[302px] justify-center gap-4 p-3 transition duration-200 bg-opacity-75 border-2 border-dashed rounded-lg border-primary-8 hover:border-primary-10 bg-primary-3 group/newfile hover:shadow-sm"
                    >
                      <BaseIcon
                        name="material-symbols:add-photo-alternate-outline-rounded"
                        size="3rem"
                        class="text-primary-10"
                      />
                      <p
                        class="text-sm font-semibold transition-all duration-200 scale-95 text-primary-10 group-hover/newfile:scale-105"
                      >
                        Add New File
                      </p>

                      <!-- STAR  ANIMATION -->
                      <BaseIcon
                        name="mdi:star-four-points-outline"
                        class="absolute hidden w-2 h-2 text-primary-10 top-2 left-2 animate-ping group-hover/newfile:block"
                      />
                      <BaseIcon
                        name="mdi:star-four-points-outline"
                        class="absolute hidden w-2 h-2 text-primary-10 bottom-4 left-10 animate-ping group-hover/newfile:block"
                      />
                      <BaseIcon
                        name="mdi:star-four-points-outline"
                        class="absolute hidden w-4 h-4 right-2 text-primary-10 bottom-20 animate-ping group-hover/newfile:block"
                      />
                    </div>
                    <!-- SECTION TO ADD NEW FILE -->
                  </div>
                </div>
                <!-- SUDAH MEMILIH FILE -->
                <!-- OVERLAY DROP -->
                <div
                  v-if="isDragging"
                  class="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-opacity-75 pointer-events-none bg-primary-2"
                >
                  <BaseIcon
                    name="hugeicons:image-download-02"
                    size="4rem"
                    class="text-primary-10 animate-bounce"
                  />
                  <p class="text-lg font-semibold text-primary-10">Drop it</p>
                </div>
                <!-- OVERLAY DROP -->
              </div>
            </div>

            <!-- Slider for Compression Quality -->
            <div class="flex flex-col items-start space-y-2">
              <div class="flex items-center flex-1 gap-4">
                <p class="flex-1 w-full text-sm text-gray-10">
                  Compression Quality :
                </p>
                <p class="text-sm text-gray-10">{{ compressionQuality }}</p>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                v-model="compressionQuality"
                class="w-full h-2 rounded appearance-none cursor-pointer bg-primary-5 custom-slider"
                :disabled="isLoading"
              />
            </div>
            <!-- Slider for Compression Quality -->

            <div class="flex justify-center">
              <BaseButton
                :disabled="!selectedFiles.length || isLoading"
                :loading="isLoading"
                class="group"
                type="submit"
              >
                Compress Images
                <template #right="slotProps">
                  <BaseIcon
                    name="formkit:submit"
                    :class="[
                      slotProps.class,
                      'group-hover:translate-x-1 transition duration-150',
                    ]"
                  />
                </template>
              </BaseButton>
            </div>
          </form>
        </div>
        <!-- FORM -->
      </BaseCard>
      <!-- Card Form -->

      <!-- Card Output -->
      <BaseCard class="flex-1 p-6" ref="outputCardElement">
        <!-- TITLE -->
        <p class="text-3xl font-bold text-center text-gray-12">Output</p>
        <!-- TITLE -->
        <!-- OUTPUT -->
        <div class="mt-6 text-center">
          <div class="p-6 border-2 border-double rounded-lg border-gray-6">
            <template v-if="compressedFiles.length">
              <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3"
              >
                <div
                  v-for="(file, index) in compressedFiles"
                  :key="index"
                  class="relative p-3 transition-all duration-200 border rounded-lg border-gray-6 bg-gray-1 hover:border-dashed hover:border-primary-4 group"
                >
                  {{ file }}
                  <div>
                    <div
                      class="flex items-center justify-center w-full overflow-hidden h-52"
                    >
                      <BaseImage
                        :src="file?.after?.preview"
                        alt="Compressed"
                        class="object-contain h-auto max-w-full max-h-full rounded-lg"
                      />
                    </div>
                    <div class="mt-2">
                      <div>
                        <p class="text-sm text-gray-10">Size :</p>
                        <span
                          class="flex items-center justify-center w-full gap-1"
                        >
                          <span
                            class="relative inline-block after:block after:h-0.5 after:w-full after:absolute after:inset-3 after:left-0 after:-skew-y-6 after:bg-red-600"
                          >
                            <span class="relative text-sm text-gray-11">
                              {{ (file?.before?.size / 1024).toFixed(2) }} KB
                            </span>
                          </span>
                          <BaseIcon
                            name="material-symbols:keyboard-double-arrow-right"
                            class="text-gray-11"
                          />
                          <span
                            class="text-sm text-green-600 dark:text-green-500"
                          >
                            {{ (file?.after?.size / 1024).toFixed(2) }} KB
                          </span>
                        </span>
                        <div
                          class="flex items-center justify-center gap-1 text-sm text-green-600 dark:text-green-500"
                        >
                          <BaseIcon name="material-symbols:arrow-cool-down" />
                          <p>
                            {{
                              file?.before && file?.after
                                ? (
                                    ((file.before.size - file.after.size) /
                                      file.before.size) *
                                    100
                                  ).toFixed(2)
                                : "0.00"
                            }}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- OVERLAY HOVER -->
                  <div
                    class="absolute inset-0 items-center justify-center hidden rounded-lg backdrop-blur-sm bg-opacity-30 bg-primary-3 group-hover:flex"
                  >
                    <BaseButton
                      size="sm"
                      variant="soft"
                      @click="handleDownload(file)"
                    >
                      Download
                      <template #right="slotProps">
                        <BaseIcon
                          name="material-symbols:download-rounded"
                          :class="slotProps.class"
                        />
                      </template>
                    </BaseButton>
                  </div>
                  <!-- OVERLAY HOVER -->
                </div>
              </div>
            </template>
            <template v-else>
              <div class="py-10">
                <p class="text-sm text-gray-10">
                  No images have been compressed yet.
                </p>
              </div>
            </template>
          </div>
        </div>
        <!-- OUTPUT -->
        <!-- Action -->
        <div
          class="flex items-center justify-center gap-4 mt-4"
          v-if="compressedFiles.length"
        >
          <BaseButton
            variant="gray"
            :disabled="isLoading"
            :loading="isLoading"
            @click="handleDownloadAll"
          >
            Download All
            <template #right="slotProps">
              <BaseIcon
                name="material-symbols:download-rounded"
                :class="slotProps.class"
              />
            </template>
          </BaseButton>
          <BaseButton
            variant="gray"
            :disabled="isLoading"
            :loading="isLoading"
            @click="handleClearCompressedFile"
          >
            Clear
            <template #right="slotProps">
              <BaseIcon name="pajamas:clear-all" :class="slotProps.class" />
            </template>
          </BaseButton>
        </div>
      </BaseCard>
      <!-- Card Output -->
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SelectedFile, CompressedFile } from "~/types";

const nuxtApp = useNuxtApp();

const selectedFiles: Ref<SelectedFile[]> = ref([]);
const compressedFiles: Ref<CompressedFile[]> = ref([]);
const compressionQuality: Ref<number> = ref(1.0);
const isDragging: Ref<Boolean> = ref(false);
const fileInputElement: Ref<HTMLInputElement | null> = ref(null);
const outputCardElement: Ref<HTMLDivElement | any | null> = ref(null);
const isLoading: Ref<boolean> = ref(false);

const handleAppendFile = (files: File[]) => {
  files.forEach((file) => {
    selectedFiles.value.push({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    });
  });
};

/** HANDLE CLICK INPUT SPACE */
const triggerFileInput = () => {
  fileInputElement?.value?.click();
};

const handleSelectedFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  handleAppendFile(files);
};

/** HANDLE DRAGGING FILE OVER INPUT SPACE */
const handleDrop = (event: DragEvent) => {
  const files = Array.from(event.dataTransfer?.files || [])?.filter((file) =>
    file.type.startsWith("image/")
  );
  handleAppendFile(files);
  isDragging.value = false;
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragEnter = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

/** HANDLE REMOVE IMAGE */
const removeImage = (index: number) => {
  if (!isLoading.value) {
    selectedFiles.value.splice(index, 1);
  }
};

const outputError = ref("");
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const formData = new FormData();

    selectedFiles.value.forEach((file, index) => {
      formData.append(`files[${index}]`, file?.file, file?.name);
    });

    const response = await $fetch("/api/v1/images/compress", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      },
    });
    console.log(response);
    const blob = new Blob([response.results[0].file]);
    console.log(blob);
    // Buat URL objek dari Blob
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);

    compressedFiles.value = [
      {
        after: {
          preview: blobUrl,
        },
      },
    ];

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    outputError.value = error?.response?._data?.stack;
    console.error("Error compressing image:", error);
  }
  // compressedFiles.value = [];
  // let tempCompressedFiles: CompressedFile[] = [];
  // isLoading.value = true;
  // for (let file of selectedFiles.value) {
  //   try {
  //     const compressedFile: SelectedFile = await nuxtApp.$compressImage(
  //       file,
  //       compressionQuality.value
  //     );

  //     let output: CompressedFile = {
  //       before: file,
  //       after: compressedFile,
  //     };
  //     tempCompressedFiles.push(output);
  //   } catch (error) {
  //     console.error("Error compressing image:", error);
  //   }
  // }
  // compressedFiles.value = tempCompressedFiles;
  // selectedFiles.value = [];
  // isLoading.value = false;

  // // Scroll to the output card after compression is complete
  await nextTick();
  outputCardElement.value?.$el?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

const handleDownload = (file: CompressedFile) => {
  const fileName = `compressed-${file?.after?.name}`;

  nuxtApp.$downloadImage(file?.after?.file, fileName);
};

const handleDownloadAll = () => {
  if (compressedFiles?.value?.length === 1) {
    const file = compressedFiles?.value[0];
    const fileName = `compressed-${file?.after?.name}`;

    nuxtApp.$downloadImage(file?.after?.file, fileName);
  } else {
    nuxtApp.$downloadZip(compressedFiles.value);
  }
};

const handleClearCompressedFile = () => {
  compressedFiles.value = [];
};

useHead({
  title: "Compress Image Online - Free and Easy Tool",
  meta: [
    // Meta tags
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    {
      hid: "description",
      name: "description",
      content:
        "Compress images online quickly and efficiently with our free tool. Reduce file sizes without losing quality.",
    },

    // Open Graph (OG) meta tags
    {
      hid: "og:title",
      property: "og:title",
      content: "Compress Image Online - Free and Easy Tool",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "Compress images online quickly and efficiently with our free tool. Reduce file sizes without losing quality.",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "/assets/images/favicon/icon-512-maskable.png",
    },
    { hid: "og:url", property: "og:url", content: "/" },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    // Twitter Card meta tags
    {
      hid: "twitter:title",
      property: "twitter:title",
      content: "Compress Image Online - Free and Easy Tool",
    },
    {
      hid: "twitter:description",
      property: "twitter:description",
      content:
        "Compress images online quickly and efficiently with our free tool. Reduce file sizes without losing quality.",
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      content: "/assets/images/favicon/icon-512-maskable.png",
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
  ],
  link: [
    // Canonical URL
    { rel: "canonical", href: "/" },

    // Favicon example (replace with your favicon link)
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/assets/images/favicon/favicon.ico",
    },
  ],
});
</script>
<style scoped>
/* Gaya untuk tombol slider di Firefox */
.custom-slider::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-primary-10 cursor-pointer shadow-md;
}

/* Gaya untuk tombol slider di WebKit (Chrome, Safari) */
.custom-slider::-webkit-slider-thumb {
  @apply w-5 h-5 rounded-full bg-primary-10 cursor-pointer shadow-md appearance-none;
}
</style>
