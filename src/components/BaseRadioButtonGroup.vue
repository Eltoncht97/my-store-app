<template>
  <div class="grid gap-6 mb-2 md:grid-cols-4">
    <BaseRadioButton v-for="option in options" :option="option" :key="option" />
  </div>
</template>

<script>
import BaseRadioButton from "./BaseRadioButton.vue";

export default {
  name: "BaseRadionButtonGroup",
  components: {
    BaseRadioButton,
  },
  props: {
    options: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>

label {
  cursor: pointer;
}
</style>
