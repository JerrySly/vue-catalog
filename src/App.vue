<template>
  <header class="header">
    <div class="header__location location" @click="selectCityDialog = true">
      <icon-location></icon-location>
      <span class="location__text" v-if="selectedCity()">{{
        JSON.parse(selectedCity()).city
      }}</span>
    </div>
  </header>
  <div class="content _container">
    <router-view />
  </div>
  <select-city-dialog
    v-if="selectCityDialog"
    @close="selectCityDialog = false"
  ></select-city-dialog>
  <div
    class="overlay"
    v-if="selectCityDialog"
    @click="selectCityDialog = false"
  ></div>
</template>
<script>
import SelectCityDialog from "./components/cities/SelectCityDialog.vue";
import IconLocation from "./components/icons/IconLocation.vue";
import { getCityById } from "./services/apiService";
export default {
  components: {
    IconLocation,
    SelectCityDialog,
  },
  data() {
    return {
      selectCityDialog: false,
    };
  },
  mounted() {
    getCityById(1).then((x) => {
      localStorage.setItem("selectedCity", JSON.stringify(x));
    });
  },
  computed: {
    selectedCity() {
      return () => localStorage.getItem("selectedCity");
    },
  },
};
</script>
