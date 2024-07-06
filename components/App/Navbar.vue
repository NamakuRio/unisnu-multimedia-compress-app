<template>
  <nav
    class="sticky top-0 z-10 p-4 transition-all duration-200 shadow bg-opacity-90 bg-primary-1 backdrop-blur-sm"
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
      <div class="flex items-center gap-2">
        <!-- MENU -->
        <div class="relative flex items-center gap-1">
          <div class="marker" ref="markerEl"></div>
          <NuxtLink
            to="/"
            exact-active-class="text-primary-11 bg-primary-5"
            class="z-10 px-4 py-2 text-sm font-bold transition duration-150 rounded-md menu-item text-gray-10 hover:text-gray-11"
            @mouseover="moveMarker($event.target, $event)"
            @mouseleave="moveMarker($event.target, $event)"
          >
            HOME
          </NuxtLink>
          <NuxtLink
            to="/how-to-use"
            exact-active-class="text-primary-11 bg-primary-5"
            class="z-10 px-4 py-2 text-sm font-bold transition duration-150 rounded-md menu-item text-gray-10 hover:text-gray-11"
            @mouseover="moveMarker($event.target, $event)"
            @mouseleave="moveMarker($event.target, $event)"
          >
            HOW TO USE
          </NuxtLink>
        </div>
        <!-- MENU -->
        <LazyCommonModeChange />
      </div>
    </div>
  </nav>
</template>
<script setup>
const markerEl = ref(null);
let leaveTimeout = null;
function moveMarker(target, event = null) {
  if (event?.type == "mouseleave") {
    leaveTimeout = setTimeout(() => {
      if (markerEl?.value) {
        markerEl.value.style.width = "0px";
      }
    }, 1);
  } else {
    clearTimeout(leaveTimeout);
    const rect = target.getBoundingClientRect();

    if (markerEl?.value) {
      markerEl.value.style.visibility = `visible`;
      markerEl.value.style.top = `${rect.top}px`;
      markerEl.value.style.left = `${rect.left}px`;
      markerEl.value.style.width = `${rect.width}px`;
      markerEl.value.style.height = `${rect.height}px`;
    }
  }
}
</script>
<style>
.marker {
  @apply fixed z-0 h-auto w-auto bg-gray-5 rounded-md transition-all duration-300 pointer-events-none;
}
</style>
