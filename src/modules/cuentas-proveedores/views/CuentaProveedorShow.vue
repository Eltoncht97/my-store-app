<template>
  <!-- Saldos de la cuenta  -->
  <Card>
    <CardHeader>
      <Loading v-if="isLoading" />
      <TitleText
        :text="`Detalle de cuenta corriente ${cuenta.proveedor.name}`"
        v-else
      />
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <CuentaInfo v-else />
    </CardBody>
  </Card>
  <!-- Movimientos de la cuenta -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Movimientos" />
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <MovimientosCuentaTable
        v-if="cuenta && cuenta.movimientos && !isLoading"
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
import Loading from "@/components/Loading.vue";
import CuentaInfo from "../components/CuentaInfo.vue";
import useCuentasProveedores from "../composables/useCuentasProveedores";
import MovimientosCuentaTable from "../components/MovimientosCuentaTable.vue";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    CuentaInfo,
    MovimientosCuentaTable,
    Loading,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;

    const { loadCuenta, cuenta } = useCuentasProveedores();
    const { isLoading } = useUI();

    loadCuenta(id);

    return {
      cuenta,
      isLoading,
    };
  },
};
</script>
