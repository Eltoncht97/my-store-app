<template>
  <Card>
    <CardHeader>
      <TitleText text="Categorías" />
      <LinkButton :to="{ name: 'category-create' }" text="Nueva Categoría" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterCategories" />
      <Loading v-if="isLoading" />
      <CategoriesTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadCategories"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadCategories" />
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
import Loading from "@/components/Loading.vue";
import LinkButton from "@/components/LinkButton.vue";
import SearchInput from "@/components/SearchInput.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import Pagination from "@/components/Pagination.vue";
import CategoriesTable from "../components/CategoriesTable.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useCategories from "../composables/useCategories";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    CategoriesTable,
    ItemsPerPage,
    LinkButton,
    Loading,
    Pagination,
    SearchInput,
    TitleText,
  },
  setup() {
    const { loadCategories, filterCategories, resetCategory } = useCategories();
    const { pagination, isLoading, resetPagination } = useUI();

    loadCategories();
    resetCategory();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      pagination,
      isLoading,
      filterCategories,
      loadCategories,
    };
  },
};
</script>
