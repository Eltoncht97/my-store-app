<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Factura</th>
      <th scope="col" class="py-3 px-6">Proveedor</th>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6">Total</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="ordenDeCompra in ordenesDeCompra" :key="ordenDeCompra.id">
        <OrdenDeCompraRow :ordenDeCompra="ordenDeCompra" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import TableRow from "@/components/TableRow.vue";
import TableBody from "@/components/TableBody.vue";
import Table from "@/components/Table.vue";
import TableHead from "@/components/TableHead.vue";
import OrdenDeCompraRow from "./OrdenDeCompraRow.vue";
import useOrdenesDeCompra from '../composables/useOrdenesDeCompra';

export default {
  components: { TableRow, TableBody, Table, TableHead, OrdenDeCompraRow },
  setup() {
    const { ordenesDeCompra } = useOrdenesDeCompra();

    return {
      ordenesDeCompra,
    };
  },
};
</script>

<style></style>
