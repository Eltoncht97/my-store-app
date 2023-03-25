<template>
  <!-- Saldos de la caja  -->
  <Card>
    <CardHeader>
      <TitleText text="INFORME DE VENTAS" />
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
            @change="loadInformeVentas(dates)"
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
            @change="loadInformeVentas(dates)"
          />
        </div>
      </div>
    </CardHeader>
  </Card>
  <!-- Ventas en el periodo -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Ventas" />
    </CardHeader>
    <CardBody>
      <VentasInformeTable
        v-if="informeData && informeData.ventas.length > 0"
        :ventas="informeData.ventas"
      />
    </CardBody>
  </Card>
  <!-- Categorias vendidas -->
  <Card class="mt-5">
    <CardHeader>
      <TitleText text="Familias" />
    </CardHeader>
    <CardBody>
      <DoughnutChart
        v-if="informeData && informeData.ventas.length > 0"
        label="T. vendido $"
        :labels="informeData.categories.labels"
        :values="informeData.categories.counts"
        :title="`Categorias Vendidas`"
      />
    </CardBody>
  </Card>
</template>

<script>
import { ref } from 'vue';
import moment from "moment";

import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";

import VentasInformeTable from "@/modules/cajas/components/VentasInformeTable.vue";
import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    VentasInformeTable,
    DoughnutChart,
  },
  setup() {
    const dates = ref({
      startDate: moment().set("date",1).format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    });
    const { loadInformeVentas, informeData } = useVentas();

    loadInformeVentas(dates.value);

    return {
      dates,
      loadInformeVentas,
      informeData,
    };
  },
};
</script>
