<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Factura</th>
      <th scope="col" class="py-3 px-6">Proveedor</th>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6 text-center">Total</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="ordenDeCompra in compras" :key="ordenDeCompra.id">
        <OrdenDeCompraRow :ordenDeCompra="ordenDeCompra" />
      </TableRow>
      <TableRow v-if="!hiddenTotal">
        <td></td>
        <td></td>
        <td class="py-3 px-3 text-right"><strong>TOTAL:</strong></td>
        <td class="py-3 px-3 text-center">
          <strong>${{ totalComprasInforme }}</strong>
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
import TableHead from "@/components/TableHead.vue";
import OrdenDeCompraRow from "./OrdenDeCompraInformeRow.vue";
import useOrdenesDeCompra from "@/modules/ordenes-de-compra/composables/useOrdenesDeCompra";

export default {
  components: { TableRow, TableBody, Table, TableHead, OrdenDeCompraRow },
  props: {
    compras: {
      type: Array,
    },
    hiddenTotal: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { totalComprasInforme } = useOrdenesDeCompra();

    return {
      totalComprasInforme,
    };
  },
};
</script>

<style></style>
