<template>
  <select
    class="mr-2 pr-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    v-model="categoryFilter"
    @change="loadProducts()"
  >
    <option value="">Todas las Categorias</option>
    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
      {{ cat.name }}
    </option>
  </select>
</template>
<script>
import useCategories from "@/modules/categories/composables/useCategories";
import useProducts from "../composables/useProducts";

export default {
  setup() {
    const { loadProducts, categoryFilter } = useProducts();
    const { categories } = useCategories();

    return {
      categoryFilter,
      categories,
      loadProducts,
    };
  },
};
</script>