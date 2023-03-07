<template>
  <Card>
    <CardHeader>
      <TitleText text="Pagos" />
      <LinkButton :to="{ name: 'pago-create' }" text="Nuevo Pago" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadPagos" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <PagosTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadPagos"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadPagos" />
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
import PagosTable from "../components/PagosTable.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import usePagos from "../composables/usePagos";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    ItemsPerPage,
    LinkButton,
    Loading,
    Pagination,
    PagosTable,
    SearchInput,
    TitleText,
  },
  setup() {
    const { loadPagos, resetPago } = usePagos();
    const { pagination, isLoading, resetPagination } = useUI();

    loadPagos();
    resetPago();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      loadPagos,
    };
  },
};
</script>
