<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
      fill="#979797"
    />
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  },
};
</script>
