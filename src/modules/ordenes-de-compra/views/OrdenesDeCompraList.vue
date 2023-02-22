<template>
  <Card>
    <CardHeader>
      <TitleText text="Ordenes de compra" />
      <router-link
        :to="{ name: 'ordenes-de-compra-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nueva Orden de Compra
      </router-link>
    </CardHeader>
    <CardBody>
      <!-- <SearchInput @on:filter="filterVentas" /> -->
      <OrdenesDeCompraTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import OrdenesDeCompraTable from "../components/OrdenesDeCompraTable.vue";
import useOrdenesDeCompra from "../composables/useOrdenesDeCompra";

export default {
  components: { Card, CardHeader, CardBody, TitleText, OrdenesDeCompraTable },
  setup() {
    const { loadOrdenesDeCompra } = useOrdenesDeCompra();

    loadOrdenesDeCompra();
  },
};
</script>
