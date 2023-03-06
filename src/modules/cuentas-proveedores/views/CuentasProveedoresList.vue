<template>
  <Card>
    <CardHeader>
      <TitleText text="Cuenta Proveedores" />
      <div class="flex">
        <select
          class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="loadProveedores()"
          v-model="filterSaldo"
        >
          <option selected value="todos">Todos</option>
          <option value="saldo">Con Saldo</option>
        </select>
      </div>
    </CardHeader>
    <CardBody>
      <SearchInput
        @on:filter="loadProveedores"
        v-model="pagination.filterTxt"
      />
      <Loading v-if="isLoading" />
      <CuentasProveedoresTable v-else />
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
import { onUnmounted } from "vue";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import SearchInput from "@/components/SearchInput.vue";
import Loading from "@/components/Loading.vue";
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import CuentasProveedoresTable from "../components/CuentasProveedoresTable.vue";
import useProveedores from "@/modules/proveedores/composables/useProveedores";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    SearchInput,
    Pagination,
    CuentasProveedoresTable,
    Loading,
    ItemsPerPage,
  },
  setup() {
    const { loadProveedores, filterSaldo } = useProveedores();
    const { pagination, isLoading, resetPagination } = useUI();

    loadProveedores();

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
