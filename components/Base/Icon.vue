<template>
  <Icon :name="name" :color="color" :mode="mode" v-bind="$attrs" />
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
  mode: {
    type: String,
    default: "svg",
  },
});
</script>
