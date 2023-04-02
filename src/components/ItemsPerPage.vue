<template>
  <select
    class="mr-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @change="$emit('on:select', { isFilter: true })"
  >
    <option :value="10">10</option>
    <option :value="15">15</option>
    <option :value="20">20</option>
  </select>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ["on:select", "update:modelValue"],
};
</script>
