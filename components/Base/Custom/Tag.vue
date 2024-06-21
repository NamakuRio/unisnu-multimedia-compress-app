<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: "button",
  },
});

const attrs = useAttrs();
const slots = useSlots();

const renderFunction = () =>
  h(props.tag, attrs, slots.default ? slots.default() : []);
</script>

<template>
  <renderFunction />
</template>
