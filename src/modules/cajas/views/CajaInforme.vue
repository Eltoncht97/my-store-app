<template>
  <!-- Saldos de la caja  -->
  <Card>
    <CardHeader>
      <TitleText text="INFORME DE CAJA" />
      <div class="flex gap-3">
        <div class="flex items-center">
          <label
            for="date"
            class="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Inicio:</label
          >
          <input
            type="date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fecha de Inicio"
            required
            v-model="dates.startDate"
            @change="loadInformeCaja(dates)"
          />
        </div>
        <div class="flex items-center">
          <label
            for="date"
            class="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Fin:</label
          >
          <input
            type="date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fecha de Inicio"
            required
            v-model="dates.endDate"
            @change="loadInformeCaja(dates)"
          />
        </div>
      </div>
    </CardHeader>
  </Card>
  <!-- Movimientos de la caja -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Movimientos" />
    </CardHeader>
    <CardBody>
      <MovimientosTable
        v-if="informeData && informeData.movimientos.length > 0"
        :movimientos="informeData.movimientos[0]"
      />
    </CardBody>
  </Card>

  <!-- Ventas en el periodo -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Ventas" />
    </CardHeader>
    <CardBody>
      <VentasInformeTable
        v-if="informeData && informeData.movimientos.length > 0"
        :movimientos="informeData.movimientos[0]"
      />
    </CardBody>
  </Card>
</template>

<script>
// import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import MovimientosTable from "../components/MovimientosTable.vue";
// import SaldosCaja from "../components/SaldosCaja.vue";
import useCajas from "../composables/useCajas";
import { ref } from "vue";
import moment from "moment";
import VentasInformeTable from "../components/VentasInformeTable.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    MovimientosTable,
    VentasInformeTable,
  },
  setup() {
    const dates = ref({
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    });
    const { caja, loadInformeCaja, informeData, resetCaja } = useCajas();

    loadInformeCaja(dates.value);
    resetCaja();

    return {
      caja,
      dates,
      loadInformeCaja,
      informeData,
    };
  },
};
</script>
