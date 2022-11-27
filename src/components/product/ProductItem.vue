<template>
  <div class="product">
    <img
      class="product__img"
      :src="product.main_image_thumb_300"
      alt="Изображение продукта"
    />
    <div class="product__info">
      <div class="product__category-name">{{ product.category.name }}</div>
      <div class="product__present-name">{{ product.present_name }}</div>
      <div class="product__comment-name">{{ product.comment_name }}</div>
      <div class="product__price">{{ product.price + " ₽" }}</div>
    </div>
    <div class="product__actions">
      <button class="btn" v-if="product.allowed && product.available">
        В корзину
      </button>
      <button class="btn btn_disable" v-else>Нет в наличии</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
