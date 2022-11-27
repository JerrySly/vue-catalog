<template>
  <div class="custom-select">
    <input
      class="input custom-select__input"
      :class="{ 'custom-select__input_searching': items.length > 0 }"
      type="text"
      v-model="modelValue"
      placeholder="Например, Санкт-петербург"
      @input="$emit('update:modelValue', modelValue)"
    />
    <icon-exit
      @click="clear"
      class="custom-select__delete"
      width="12"
      height="12"
    ></icon-exit>
    <div class="custom-select__options" v-if="items && items.length > 0">
      <div
        class="custom-select__option"
        v-for="item in items"
        :key="item[idField]"
        @click="setValue(item)"
      >
        {{ item[labelField] }}
      </div>
    </div>
  </div>
</template>

<script>
import IconExit from "../icons/IconExit.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    labelField: {
      type: String,
      required: true,
    },
    idField: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modelValue: null,
    };
  },
  components: {
    IconExit,
  },
  methods: {
    clear() {
      this.modelValue = "";
      this.$emit("clear");
    },
    setValue(value) {
      this.$emit("clearItems");
      this.modelValue = value[this.labelField];
      this.$emit("setValue", value);
    },
  },
};
</script>
