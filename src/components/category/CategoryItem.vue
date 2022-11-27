<template>
  <div class="category">
    <img
      :src="category.image"
      class="category__img"
      alt="Изображение категории"
    />
    <div class="category__name" :style="{ color: category['text_color'] }">
      {{ category.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>
