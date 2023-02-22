<template>
  <!-- Saldos de la cuenta  -->
  <Card v-if="cuenta">
    <CardHeader>
      <TitleText
        :text="`Detalle de cuenta corriente ${cuenta.client.lastname} ${cuenta.client.name}`"
      />
    </CardHeader>
    <CardBody>
      <CuentaInfo />
    </CardBody>
  </Card>
  <!-- Movimientos de la cuenta -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Movimientos" />
    </CardHeader>
    <CardBody>
      <MovimientosCuentaTable v-if="cuenta && cuenta.movimientos" />
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import CuentaInfo from "../components/CuentaInfo.vue";
import useCuentas from "../composables/useCuentas";
import MovimientosCuentaTable from "../components/MovimientosCuentaTable.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    // MovimientosTable,
    CuentaInfo,
    MovimientosCuentaTable,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;

    const { loadCuenta, cuenta } = useCuentas();

    loadCuenta(id);

    return {
      cuenta,
    };
  },
};
</script>
