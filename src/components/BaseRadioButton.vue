<template class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
    <label
      :for="option"
      class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      <input
        type="radio"
        :value="option"
        :id="option"
        @change="$parent.$emit('input', $event.target.value)"
        name="radio-input"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      {{ option }}
    </label>
</template>

<script>
export default {
  props: {
    option: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
label {
  cursor: pointer;
}
</style>
