<template>
  <nav
    class="sticky top-0 z-10 p-4 shadow bg-opacity-90 bg-primary-1 backdrop-blur-sm"
  >
    <div class="container flex items-center justify-between mx-auto">
      <div>
        <NuxtLink to="/" class="block">
          <LazyBaseImage
            src="/assets/images/favicon/icon-512.png"
            class="w-10 h-10"
          />
        </NuxtLink>
      </div>
      <div>
        <LazyCommonModeChange />
      </div>
    </div>
  </nav>
</template>
