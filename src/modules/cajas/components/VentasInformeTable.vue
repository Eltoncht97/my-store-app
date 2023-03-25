<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6">Cliente</th>
      <th scope="col" class="py-3 px-6">M. Pago</th>
      <th scope="col" class="py-3 px-6">Total</th>
      <th scope="col" class="py-3 px-6">Caja</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="venta in ventas" :key="venta.id">
        <VentaInformeRow :venta="venta" />
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

export default {
  components: { VentaInformeRow, TableRow, TableBody, Table, TableHead },
  props: {
    ventas: {
      type: Array
    }
  },
  setup() {
  },
};
</script>

<style></style>
