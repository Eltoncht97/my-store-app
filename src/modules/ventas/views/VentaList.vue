<template>
  <Card>
    <CardHeader>
      <TitleText text="Ventas" />
      <LinkButton :to="{ name: 'venta-create' }" text="Nueva Venta" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadVentas" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <VentasTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadVentas"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadVentas" />
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
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import LinkButton from "@/components/LinkButton.vue";
import VentasTable from "../components/VentasTable.vue";
import useVentas from "../composables/useVentas";
import useUI from "@/modules/dashboard/composables/useUI";
import { onUnmounted } from "vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    VentasTable,
    TitleText,
    SearchInput,
    Loading,
    Pagination,
    ItemsPerPage,
    LinkButton,
  },
  setup() {
    const { loadVentas, resetVenta } = useVentas();
    const { pagination, isLoading, resetPagination } = useUI();

    loadVentas();
    resetVenta();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      pagination,
      isLoading,
      loadVentas,
    };
  },
};
</script>
