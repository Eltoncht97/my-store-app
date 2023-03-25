<template>
  <DoughnutChart v-bind="doughnutChartProps" />
</template>
<script>
import { computed } from "vue";

import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
export default {
  components: {
    DoughnutChart,
  },
  props: {
    label: {
      type: String,
      default: "Label",
    },
    labels: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array[String],
      default: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
    title: {
      type: String,
    }
  },
  setup(props) {
    const data = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.values,
          backgroundColor: props.colors,
        },
      ],
      hoverOffset: 4,
    }));

    const options = computed(() => ({
      // scales: {
      //   myScale: {
      //     type: "logarithmic",
      //     position: "left",
      //   },
      // },
      plugins: {
        responsive: true,
        legend: {
          position: "top",
        },
        // title: {
        //   display: true,
        //   text: props.title,
        // },
      },
    }));

    const { doughnutChartProps } = useDoughnutChart({
      chartData: data,
      options,
    });

    return {
      data,
      options,
      doughnutChartProps,
    };
  },
};
</script>
