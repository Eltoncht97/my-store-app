<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ category.name }}
  </th>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'category-edit', params: { id: category.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><EditIcon
    /></router-link>
    <button
      @click="deleteCategory(category.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useCategories from "../composables/useCategories";

export default {
  components: { EditIcon, DeleteIcon },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteCategory } = useCategories();

    return {
      deleteCategory,
    };
  },
};
</script>

<style></style>
