<template>
  <div class="relative overflow-hidden" v-bind="$attrs">
    <iframe
      :src="src"
      frameborder="0"
      @load="isLoading = false"
      :class="iframeClass"
    />
    <slot name="loading" v-if="isLoading" />
  </div>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  iframeClass: {
    type: String,
    default: "",
  },
});

const isLoading = ref(true);
</script>
