<template>
  <Card>
    <CardHeader>
      <TitleText text="Clientes" />
      <router-link
        :to="{ name: 'client-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nuevo Cliente
      </router-link>
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <template v-else>
        <SearchInput @on:filter="filterClients" />
        <ClientsTable />
      </template>
      <div class="flex align-center" :class="`${totalClients > pagination.limit ? 'justify-between' : 'justify-end'}`">
        <Pagination v-if="totalClients > pagination.limit" />
        <select
          class="mr-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="pagination.limit"
          @change="loadClients"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import SearchInput from "@/components/SearchInput.vue";
import Loading from "@/components/Loading.vue";
import ClientsTable from "../components/ClientsTable.vue";
import Pagination from "../components/ClientListPagination.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useClients from "../composables/useClients";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    ClientsTable,
    TitleText,
    SearchInput,
    Pagination,
    Loading,
  },
  setup() {
    const {
      loadClients,
      filterClients,
      resetClient,
      totalClients,
      pagination,
    } = useClients();

    const { isLoading } = useUI();

    loadClients();
    resetClient();

    return {
      isLoading,
      totalClients,
      pagination,

      filterClients,
      loadClients,
    };
  },
};
</script>
