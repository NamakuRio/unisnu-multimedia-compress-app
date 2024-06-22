<template>
  <div
    :class="[
      'relative overflow-hidden group',
      circle ? 'rounded-full' : 'rounded-lg',
    ]"
  >
    <img
      :class="[$attrs.class]"
      v-bind="$attrs"
      :data-src="src"
      :alt="alt"
      src="/assets/images/placeholder/no-image.svg"
      loading="lazy"
      ref="imageEl"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  circle: {
    type: Boolean,
    default: false,
  },
});

/** Lazy load */
const imageEl = ref(null);
function setLazyClass() {
  imageEl?.value?.classList?.add("lazy");
}

// watch(
//   () => props.src,
//   () => setLazyClass()
// );

onMounted(() => {
  setLazyClass();
});
</script>
