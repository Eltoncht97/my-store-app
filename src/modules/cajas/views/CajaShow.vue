<template>
  <!-- Saldos de la caja  -->
  <Card v-if="caja">
    <CardHeader>
      <TitleText text="Caja - 01" />
    </CardHeader>
    <CardBody>
      <SaldosCaja />
    </CardBody>
  </Card>
  <!-- Movimientos de la caja -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Movimientos" />
    </CardHeader>
    <CardBody>
      <MovimientosTable
        v-if="caja && caja.movimientos"
        :movimientos="caja.movimientos"
      />
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import MovimientosTable from "../components/MovimientosTable.vue";
import SaldosCaja from "../components/SaldosCaja.vue";
import useCajas from "../composables/useCajas";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    MovimientosTable,
    SaldosCaja,
  },
  setup() {
    const route = useRoute();

    const { id } = route.params;
    const { loadCaja, caja } = useCajas();

    loadCaja(id);

    return {
      caja,
    };
  },
};
</script>
