<template>
  <Card>
    <CardHeader>
      <TitleText text="Proveedores" />
      <div class="flex">
        <select
          class="mr-2 pr-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="filterProveedores()"
          v-model="filterSaldo"
        >
          <option value="todos">Todos</option>
          <option value="saldo">Con Saldo</option>
        </select>
        <router-link
          :to="{ name: 'proveedores-create' }"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Nuevo
        </router-link>
      </div>
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <template v-else>
        <SearchInput @on:filter="filterProveedores" />
        <ProveedoresTable />
      </template>
      <Pagination v-if="totalProveedores > 10" />
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
},
  setup() {
    const { isLoading } = useUI();
    const { totalProveedores, loadProveedores, filterSaldo, filterProveedores } = useProveedores();

    loadProveedores();

    return { isLoading, totalProveedores, loadProveedores, filterSaldo, filterProveedores };
  },
};
</script>

<style></style>
