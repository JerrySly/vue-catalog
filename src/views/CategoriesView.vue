<template>
  <div>
    <div class="content__header title" v-if="category">
      <icon-arrow
        class="title__icon"
        @click="$router.push({ name: 'Main' })"
      ></icon-arrow
      ><span class="title__name">{{ category.name }}</span>
    </div>
    <div class="products">
      <nav class="nav products__filters" v-if="subCategories.length > 1">
        <ul class="nav__list list">
          <li
            :class="{ list__item_selected: subcategorySlug == null }"
            class="list__item"
            @click="
              $router.push({ name: 'Category', params: { slug: this.slug } })
            "
          >
            Все продукты
          </li>
          <li
            @click="selectSub(sub.slug)"
            :class="{ list__item_selected: subcategorySlug == sub.slug }"
            class="list__item"
            v-for="sub in subCategories"
            :key="sub.id"
          >
            {{ sub.name }}
          </li>
        </ul>
      </nav>
      <div
        class="products__table table"
        :class="{ 'table_without-sidenav': !subCategories.length > 1 }"
      >
        <product-item
          class="table__item"
          v-for="product in products"
          :key="product.id"
          :product="product"
        ></product-item>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrow from "@/components/icons/IconArrow.vue";
import ProductItem from "@/components/product/ProductItem.vue";
import { getCategories, getProducts } from "@/services/apiService";
export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
    subcategorySlug: {
      type: String,
      default: null,
    },
  },
  components: {
    IconArrow,
    ProductItem,
  },
  data() {
    return {
      subCategories: [],
      allProducts: [],
      products: [],
      category: null,
    };
  },
  mounted() {
    let cityId = JSON.parse(this.selectedCity()).id;
    this.getCategories(cityId);
    this.getProducts(cityId);
    document.addEventListener("selectedCitySet", this.storageListener);
  },
  unmounted() {
    document.removeEventListener("selectedCitySet", this.storageListener);
  },
  methods: {
    async getCategories(cityId) {
      let result = await getCategories(cityId);
      this.category = result.filter((x) => x.slug == this.slug)[0];
      this.subCategories = this.category.children;
      if (!this.subCategories.map((x) => x.slug).includes(this.subcategorySlug))
        this.$router.push({ name: "Category", params: { slug: this.slug } });
    },
    async getProducts(cityId) {
      let result = await getProducts(this.slug, cityId);
      this.allProducts = result;
      if (this.subcategorySlug) {
        this.products = this.getSubItems(this.allProducts);
      } else this.products = this.allProducts;
    },
    storageListener() {
      let cityId = JSON.parse(localStorage.getItem("selectedCity")).id;
      this.getCategories(cityId);
      if (!this.category) this.$router.push({ name: "Main" });
      this.getProducts(cityId);
    },
    selectSub(subSlug) {
      this.$router.push({
        name: "SubCategory",
        params: { slug: this.slug, subcategorySlug: subSlug },
      });
    },
    getSubItems(products) {
      return products.filter(
        (y) =>
          y.tags.filter((tag) => tag.slug == this.subcategorySlug).length > 0
      );
    },
  },
  computed: {
    selectedCity() {
      return () => localStorage.getItem("selectedCity");
    },
  },
  watch: {
    subcategorySlug() {
      if (!this.subcategorySlug) {
        this.products = this.allProducts;
        return;
      }
      this.products = this.getSubItems(this.allProducts);
    },
  },
};
</script>
