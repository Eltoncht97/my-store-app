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
      <Pagination v-if="totalClients > 10" />
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
    const { loadClients, filterClients, resetClient, totalClients } =
      useClients();

    const { isLoading } = useUI();

    loadClients();
    resetClient();

    return {
      isLoading,
      totalClients,

      filterClients,
    };
  },
};
</script>
