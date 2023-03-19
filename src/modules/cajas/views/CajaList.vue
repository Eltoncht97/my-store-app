<template>
  <Card>
    <CardHeader>
      <TitleText text="Cajas" />
      <button
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        @click="toggleModal('newTraspaso')"
      >
        Nuevo Traspaso
      </button>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="loadCajas" v-model="pagination.filterTxt" />
      <Loading v-if="isLoading" />
      <CajasTable v-else />
      <div
        v-if="!isLoading"
        :class="`flex align-center ${
          pagination.totalPages > 1 ? 'justify-between' : 'justify-end'
        }`"
      >
        <Pagination
          v-if="pagination.totalPages > 1"
          @on:updatePage="loadCajas"
        />
        <ItemsPerPage v-model="pagination.limit" @on:select="loadCajas" />
      </div>
      <CreateTraspasoModal
        :showModal="showNewTraspasoModal"
        @on:close="toggleModal"
      />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import CajasTable from "../components/CajasTable.vue";
import useCajas from "../composables/useCajas";
import SearchInput from "@/components/SearchInput.vue";
import Loading from "@/components/Loading.vue";
import Pagination from "@/components/Pagination.vue";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import { onUnmounted } from "vue";
import useUI from "@/modules/dashboard/composables/useUI";
import CreateTraspasoModal from "../components/CreateTraspasoModal.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    CajasTable,
    TitleText,
    SearchInput,
    Loading,
    Pagination,
    ItemsPerPage,
    CreateTraspasoModal,
  },
  setup() {
    const { loadCajas } = useCajas();
    const {
      pagination,
      isLoading,
      showNewTraspasoModal,
      toggleModal,
      resetPagination,
    } = useUI();

    loadCajas();

    onUnmounted(() => {
      resetPagination();
    });

    return {
      isLoading,
      pagination,
      showNewTraspasoModal,
      loadCajas,
      toggleModal,
    };
  },
};
</script>
