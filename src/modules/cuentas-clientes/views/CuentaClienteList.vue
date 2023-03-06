<template>
  <Card>
    <CardHeader>
      <TitleText text="Cuenta Corrientes" />
      <div class="flex">
        <select
          class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="loadClients()"
          v-model="filterSaldo"
        >
          <option selected value="todos">Todos</option>
          <option value="saldo">Con Saldo</option>
        </select>
        <router-link
          :to="{ name: 'recibo-create' }"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Imprimir
        </router-link>
      </div>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadClients" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <CuentasTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadClients"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadClients" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { onUnmounted } from "vue";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import useClients from "@/modules/clients/composables/useClients";
import TitleText from "@/components/TitleText.vue";
import SearchInput from "@/components/SearchInput.vue";
import CuentasTable from "../components/CuentasTable.vue";
import Pagination from "@/components/Pagination.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    SearchInput,
    Pagination,
    CuentasTable,
    ItemsPerPage,
    Loading,
  },
  setup() {
    const { loadClients, filterSaldo } = useClients();
    const { pagination, isLoading, resetPagination } = useUI();

    loadClients();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      filterSaldo,
      pagination,
      loadClients,
    };
  },
};
</script>
