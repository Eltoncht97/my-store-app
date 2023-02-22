<template>
  <Card>
    <CardHeader>
      <TitleText text="Productos" />
      <div class="flex">
        <select
          class="mr-2 pr-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="categoryFilter"
          @change="filterProducts({})"
        >
          <option value="">Todas las Categorias</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <router-link
          :to="{ name: 'product-create' }"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Nuevo Producto
        </router-link>
      </div>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterProducts" />
      <ProductsTable />
      <Pagination v-if="pageCount > 10" />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import ProductsTable from "../components/ProductsTable.vue";
import useProducts from "../composables/useProducts";
import TitleText from "@/components/TitleText.vue";
import SearchInput from "@/components/SearchInput.vue";
import useCategories from "@/modules/categories/composables/useCategories";
import Pagination from "../components/ProductListPagination.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    ProductsTable,
    TitleText,
    SearchInput,
    Pagination,
  },
  setup() {
    const { loadProducts, filterProducts, categoryFilter, pageCount } = useProducts();
    const { loadCategories, categories } = useCategories();

    loadProducts();
    loadCategories();

    return {
      filterProducts,
      categoryFilter,
      categories,
      loadCategories,
      pageCount
    };
  },
};
</script>
