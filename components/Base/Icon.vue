<template>
  <Icon :name="name" :color="color" v-bind="$attrs" />
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const isLoaded = ref(false);
</script>
