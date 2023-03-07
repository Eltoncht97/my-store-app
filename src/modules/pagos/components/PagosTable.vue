<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Voucher</th>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6">Proveedor</th>
      <th scope="col" class="py-3 px-6">Metodo de Pago</th>
      <th scope="col" class="py-3 px-6">Total</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="pago in pagos" :key="pago.id">
        <PagoRow :pago="pago" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import Table from "@/components/Table.vue";
import TableHead from "@/components/TableHead.vue";
import TableBody from "@/components/TableBody.vue";
import TableRow from "@/components/TableRow.vue";
import PagoRow from "./PagoRow.vue";
import usePagos from "../composables/usePagos";

export default {
  components: { PagoRow, Table, TableHead, TableBody, TableRow },
  setup() {
    const { pagos } = usePagos();

    return {
      pagos,
    };
  },
};
</script>
