<template>
  <Card>
    <CardHeader>
      <TitleText text="Recibos" />
      <LinkButton :to="{ name: 'recibo-create' }" text="Nuevo Recibo" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadRecibos" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <RecibosTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadRecibos"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadRecibos" />
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
import RecibosTable from "../components/RecibosTable.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useRecibos from "../composables/useRecibos";

export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    ItemsPerPage,
    LinkButton,
    Loading,
    Pagination,
    RecibosTable,
    SearchInput,
    TitleText,
  },
  setup() {
    const { loadRecibos, resetRecibo } = useRecibos();
    const { pagination, isLoading, resetPagination } = useUI();

    loadRecibos();
    resetRecibo();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      loadRecibos,
    };
  },
};
</script>
