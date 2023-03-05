<template>
  <Card>
    <CardHeader>
      <Title text="Clientes" />
      <LinkButton :to="{ name: 'client-create' }" text="Nuevo Cliente" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadClients" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <ClientsTable v-else />
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
import Title from "@/components/TitleText.vue";
import LinkButton from "@/components/LinkButton.vue";
import Loading from "@/components/Loading.vue";
import SearchInput from "@/components/SearchInput.vue";
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import ClientsTable from "../components/ClientsTable.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useClients from "../composables/useClients";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    ClientsTable,
    ItemsPerPage,
    LinkButton,
    Loading,
    Pagination,
    SearchInput,
    Title,
  },
  setup() {
    const { loadClients, resetClient } = useClients();
    const { pagination, isLoading, resetPagination } = useUI();

    loadClients();
    resetClient();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      loadClients,
    };
  },
};
</script>
