<template>
  <LazyBaseCustomTag
    :tag="tag"
    :disabled="disabled"
    :class="[
      defaultClass,
      sizeClass,
      variantClass,
      roundedClass,
      blockClass,
      disabledClass,
    ]"
    v-bind="$attrs"
  >
    <IconSpinner v-if="loading" :class="[iconLeftClass, iconVariantClass]" />

    <slot v-else name="left" :class="iconLeftClass"></slot>
    <slot />

    <slot name="right" :class="[iconRightClass, iconVariantClass]"></slot>
  </LazyBaseCustomTag>
</template>
<script setup>
const props = defineProps({
  defaultClass: {
    type: String,
    default:
      "transition-all duration-200 inline-flex whitespace-nowrap items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
  },
  tag: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: function (value) {
      return ["xs", "sm", "md", "lg", "xl"].indexOf(value) !== -1;
    },
  },
  variant: {
    type: String,
    default: "primary",
    validator: function (value) {
      return (
        ["primary", "primary-outline", "soft", "gray"].indexOf(value) !== -1
      );
    },
  },
});

const sizeClass = computed(() => {
  return {
    "px-2.5 py-1.5 text-xs leading-4 rounded": props.size === "xs",
    "px-4 py-2 text-sm leading-4 rounded-md": props.size == "sm",
    "px-6 py-2 text-sm leading-5 rounded-md": props.size === "md",
    "px-6 py-2 text-base leading-6 rounded-md": props.size === "lg",
    "px-8 py-3 text-base leading-6 rounded-md": props.size === "xl",
  };
});

const variantClass = computed(() => {
  return {
    "border-transparent shadow-sm text-white bg-primary-10 hover:bg-primary-8 focus:ring-primary-8":
      props.variant === "primary",
    "border-solid border-primary-10 font-normal transition ease-in-out duration-150 text-primary-11 hover:bg-primary-3 shadow-inner focus:ring-primary-10":
      props.variant == "primary-outline",
    "border-transparent shadow-sm text-primary-10 bg-primary-3 hover:bg-primary-5 focus:ring-primary-5":
      props.variant === "soft",
    "border-solid border-gray-5 font-normal bg-gray-1 transition ease-in-out duration-150 text-gray-12 hover:bg-gray-2 hover:shadow-inner focus:ring-gray-8":
      props.variant == "gray",
  };
});

const roundedClass = computed(() => {
  return props.rounded ? "!rounded-full" : "";
});

const blockClass = computed(() => {
  return props.block ? "w-full" : "";
});

const disabledClass = computed(() => {
  return "disabled:opacity-60 disabled:cursor-not-allowed";
});

const iconLeftClass = computed(() => {
  return {
    "-ml-0.5 mr-1 h-3 w-3": props.size == "xs",
    "-ml-0.5 mr-2 h-4 w-4": props.size == "sm",
    "-ml-1 mr-2 h-5 w-5": props.size === "md",
    "-ml-1 mr-3 h-5 w-5": props.size === "lg" || props.size === "xl",
  };
});

const iconVariantClass = computed(() => {
  return {
    "text-white": props.variant === "primary",
    "text-primary-11": props.variant === "primary-output",
    "text-gray-12": props.variant === "gray",
  };
});

const iconRightClass = computed(() => {
  return {
    "ml-1 -mr-0.5 h-3 w-3": props.size == "xs",
    "ml-2 -mr-0.5 h-4 w-4": props.size == "sm",
    "ml-2 -mr-1 h-5 w-5": props.size === "md",
    "ml-3 -mr-1 h-5 w-5": props.size === "lg" || props.size === "xl",
  };
});
</script>
