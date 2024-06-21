<template>
  <div>
    <div
      @click="toggleTheme"
      class="flex items-center justify-center p-6 transition duration-150 rounded-md cursor-pointer group/mode-change hover:bg-gray-5"
    >
      <Transition
        mode="out-in"
        enter-active-class="duration-300 ease-in"
        enter-from-class="-rotate-45 opacity-0"
        enter-to-class="rotate-0 opacity-100"
        leave-active-class="duration-200 ease-out"
        leave-from-class="rotate-0 opacity-100"
        leave-to-class="rotate-45 opacity-0"
      >
        <LazyBaseIcon
          name="heroicons-solid:sun"
          class="absolute w-6 h-6 text-yellow-500 transition duration-200 group-hover/mode-change:text-yellow-600 group-hover/mode-change:scale-110"
          v-if="!isDarkMode"
        />
      </Transition>
      <Transition
        mode="out-in"
        enter-active-class="duration-300 ease-in"
        enter-from-class="-rotate-45 opacity-0"
        enter-to-class="rotate-0 opacity-100"
        leave-active-class="duration-200 ease-out"
        leave-from-class="rotate-0 opacity-100"
        leave-to-class="rotate-45 opacity-0"
      >
        <LazyBaseIcon
          name="heroicons-solid:moon"
          class="absolute w-6 h-6 transition duration-200 text-slate-300 group-hover/mode-change:text-slate-400 group-hover/mode-change:scale-110"
          v-if="isDarkMode"
        />
      </Transition>
    </div>
  </div>
</template>
<script setup>
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  applyTheme(isDarkMode.value);

  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

const applyTheme = (isDark) => {
  if (isDark) {
    document.querySelector("html").classList.remove("light-mode");
    document.querySelector("html").classList.add("dark-mode");
  } else {
    document.querySelector("html").classList.remove("dark-mode");
    document.querySelector("html").classList.add("light-mode");
  }
};

onMounted(() => {
  // Check the saved theme preference
  const userPreference = localStorage.getItem("theme");
  if (userPreference) {
    isDarkMode.value = userPreference === "dark";
    applyTheme(isDarkMode.value);
  } else {
    // Apply system preference if no user preference is set
    isDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(isDarkMode.value);
  }

  // Listen for changes in system preference
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        isDarkMode.value = e.matches;
        applyTheme(isDarkMode.value);
      }
    });
});
</script>
