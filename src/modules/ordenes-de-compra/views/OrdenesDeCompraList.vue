<template>
  <Card>
    <CardHeader>
      <TitleText text="Ordenes de compra" />
      <router-link
        :to="{ name: 'ordenes-de-compra-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nueva Orden de Compra
      </router-link>
    </CardHeader>
    <CardBody>
      <SearchInput
        @on:filter="loadOrdenesDeCompra"
        v-model="pagination.filterTxt"
      />
      <Loading v-if="isLoading" />
      <OrdenesDeCompraTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadOrdenesDeCompra"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadOrdenesDeCompra" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import OrdenesDeCompraTable from "../components/OrdenesDeCompraTable.vue";
import useOrdenesDeCompra from "../composables/useOrdenesDeCompra";
import SearchInput from "@/components/SearchInput.vue";
import Loading from "@/components/Loading.vue";
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import { onUnmounted } from "vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    OrdenesDeCompraTable,
    SearchInput,
    Loading,
    Pagination,
    ItemsPerPage,
  },
  setup() {
    const { loadOrdenesDeCompra } = useOrdenesDeCompra();

    const { pagination, isLoading, resetPagination } = useUI();

    loadOrdenesDeCompra();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      loadOrdenesDeCompra,
    };
  },
};
</script>
