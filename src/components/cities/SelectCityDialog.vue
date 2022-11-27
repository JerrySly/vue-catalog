<template>
  <div class="dialog">
    <div class="dialog__head dialog__head_exit-only">
      <icon-exit class="dialog__exit" @click="$emit('close')"></icon-exit>
    </div>
    <div class="form">
      <div class="form__label">Выбор населённого пункта:</div>
      <div class="form__select form__select_with-btn">
        <custom-select
          v-model="cityString"
          :items="cities"
          idField="id"
          labelField="label"
          @clear="clear"
          @setValue="(value) => (selectedCity = value)"
          @clearItems="cities = []"
        ></custom-select>
        <button
          class="form__btn btn"
          @click="setCity"
          :class="{ btn_disable: !selectedCity }"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconExit from "../icons/IconExit.vue";
import CustomSelect from "../ui/CustomSelect.vue";
import { getCities } from "@/services/apiService";
import { mapMutations } from "vuex";
export default {
  components: { IconExit, CustomSelect },
  data() {
    return {
      cityString: "",
      cities: [],
      selectedCity: null,
    };
  },
  methods: {
    ...mapMutations(["setSelectedCity"]),
    async getNewCities() {
      this.cities = await getCities(this.cityString);
    },
    setCity() {
      if (this.selectedCity != null) {
        localStorage.setItem("selectedCity", JSON.stringify(this.selectedCity));
        this.$emit("close");
      }
    },
    clear() {
      this.cityString = "";
      this.selectedCity = null;
    },
  },
  watch: {
    async cityString() {
      if (this.cityString != this.selectedCity?.label) this.selectedCity = null;
      if (this.cityString.split("").length > 3) {
        await this.getNewCities();
      } else this.cities = [];
    },
  },
};
</script>
