<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6">Cliente</th>
      <th scope="col" class="py-3 px-6">M. Pago</th>
      <th scope="col" class="py-3 px-6 text-center">Total</th>
      <!-- <th scope="col" class="py-3 px-6">Caja</th> -->
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="venta in ventas" :key="venta.id">
        <VentaInformeRow :venta="venta" />
      </TableRow>
      <TableRow v-if="!hiddenTotal">
        <td></td>
        <td></td>
        <td class="py-3 px-3 text-right"><strong>TOTAL:</strong></td>
        <td class="py-3 px-3 text-center">
          <strong>${{ totalVentasInforme }}</strong>
        </td>
        <td></td>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import TableRow from "@/components/TableRow.vue";
import TableBody from "@/components/TableBody.vue";
import Table from "@/components/Table.vue";
import VentaInformeRow from "./VentaInformeRow.vue";
import TableHead from "@/components/TableHead.vue";
import { computed } from "vue";

export default {
  components: { VentaInformeRow, TableRow, TableBody, Table, TableHead },
  props: {
    ventas: {
      type: Array,
    },
    hiddenTotal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const totalVentasInforme = computed(() =>
      props.ventas.reduce((total, venta) => total + venta.total, 0)
    );

    return {
      totalVentasInforme,
    };
  },
};
</script>

<style></style>
