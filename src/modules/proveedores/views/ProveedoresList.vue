<template>
  <Card>
    <CardHeader>
      <TitleText text="Proveedores" />
      <div class="flex">
        <select
          class="mr-2 pr-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="filterSaldo"
          @change="loadProveedores"
        >
          <option value="todos">Todos</option>
          <option value="saldo">Con Saldo</option>
        </select>
        <LinkButton :to="{ name: 'proveedor-create' }" text="Nuevo" />
      </div>
    </CardHeader>
    <CardBody>
      <SearchInput
        @on:filter="loadProveedores"
        v-model="pagination.filterTxt"
      />
      <Loading v-if="isLoading" />
      <ProveedoresTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadProveedores"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadProveedores" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import TitleText from "@/components/TitleText.vue";
import CardBody from "@/components/CardBody.vue";
import Loading from "@/components/Loading.vue";
import SearchInput from "@/components/SearchInput.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useProveedores from "@/modules/proveedores/composables/useProveedores";
import ProveedoresTable from "../components/ProveedoresTable.vue";
import Pagination from "@/components/Pagination.vue";
import LinkButton from "@/components/LinkButton.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import { onUnmounted } from "vue";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    TitleText,
    Loading,
    SearchInput,
    Pagination,
    ProveedoresTable,
    LinkButton,
    ItemsPerPage,
  },
  setup() {
    const {
      filterSaldo,
      loadProveedores,
      resetProveedor,
    } = useProveedores();
    const { pagination, isLoading, resetPagination } = useUI();

    loadProveedores();
    resetProveedor();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      filterSaldo,
      isLoading,
      pagination,
      loadProveedores,
    };
  },
};
</script>

<style></style>
