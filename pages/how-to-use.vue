<template>
  <div class="-m-4 sm:-m-8 w-screen h-[calc(100vh_-_80px)]">
    <LazyBaseIframe
      src="https://s.id/27Oel"
      class="w-full h-full"
      iframe-class="w-full h-full"
    >
      <template #loading>
        <div
          class="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-10 bg-opacity-5 backdrop-blur-sm"
        >
          <div class="p-4 shadow rounded-xl bg-gray-2">
            <LazyBaseIcon
              name="mdi:loading"
              size="40"
              class="animate-spin text-primary-10"
            />
          </div>
        </div>
      </template>
    </LazyBaseIframe>
  </div>
</template>
