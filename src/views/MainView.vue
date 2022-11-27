<template>
  <div>
    <div class="content__header">Категории товаров</div>
    <div class="categories">
      <category-item
        class="categories__item"
        v-for="category in categories"
        :category="category"
        :key="category.id"
        @click="goToSubcategories(category.slug)"
      ></category-item>
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/category/CategoryItem.vue";
import { getCategories } from "@/services/apiService";
export default {
  components: { CategoryItem },
  data() {
    return {
      categories: [],
      city: null,
    };
  },
  mounted() {
    this.getCategories(JSON.parse(this.selectedCity()).id).then(
      (x) => (this.categories = x)
    );
    document.addEventListener("selectedCitySet", this.storageListener);
  },
  unmounted() {
    document.removeEventListener("selectedCitySet", this.storageListener);
  },
  methods: {
    async storageListener() {
      let cityId = JSON.parse(localStorage.getItem("selectedCity")).id;
      this.categories = await this.getCategories(cityId);
    },
    async getCategories(cityId) {
      return await getCategories(cityId);
    },
    goToSubcategories(slug) {
      this.$router.push({ name: "Category", params: { slug } });
    },
  },
  computed: {
    selectedCity() {
      return () => localStorage.getItem("selectedCity");
    },
  },
};
</script>
