<template>
  <Card>
    <CardHeader>
      <TitleText text="Productos" />
      <div class="flex">
        <CategoryFilter />
        <LinkButton :to="{ name: 'product-create' }" text="Nuevo Producto" />
      </div>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadProducts" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <ProductsTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadProducts"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadProducts" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { onUnmounted } from "vue";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import LinkButton from "@/components/LinkButton.vue";
import Loading from "@/components/Loading.vue";
import SearchInput from "@/components/SearchInput.vue";
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import ProductsTable from "../components/ProductsTable.vue";
import useProducts from "../composables/useProducts";
import useCategories from "@/modules/categories/composables/useCategories";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    CategoryFilter,
    ItemsPerPage,
    LinkButton,
    Loading,
    Pagination,
    ProductsTable,
    SearchInput,
    TitleText,
  },
  setup() {
    const { loadProducts, resetProduct } = useProducts();
    const { loadCategories } = useCategories();
    const { pagination, isLoading, resetPagination } = useUI();

    loadCategories({ limited: false });
    loadProducts();
    resetProduct();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      loadProducts,
    };
  },
};
</script>
