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
<script setup>
useHead({
  title: "How To Use | Compress Image Online - Free and Easy Tool",
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
      content: "How To Use | Compress Image Online - Free and Easy Tool",
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
      content: "/assets/images/meta/how-to-use.png",
    },
    { hid: "og:url", property: "og:url", content: "/how-to-use" },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    // Twitter Card meta tags
    {
      hid: "twitter:title",
      property: "twitter:title",
      content: "How To Use | Compress Image Online - Free and Easy Tool",
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
      content: "/assets/images/meta/how-to-use.png",
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
