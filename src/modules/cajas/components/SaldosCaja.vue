<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Tipo</th>
      <th scope="col" class="py-3 px-6 text-right">Total</th>
    </TableHead>
    <TableBody>
      <TableRow>
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Efectivo
        </th>
        <td class="py-4 px-6 text-right">${{ caja.efectivo }}</td>
      </TableRow>
      <TableRow>
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Transferencias
        </th>
        <td class="py-4 px-6 text-right">${{ caja.transferencias }}</td>
      </TableRow>
      <TableRow>
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          T. Debito
        </th>
        <td class="py-4 px-6 text-right">${{ caja.debito }}</td>
      </TableRow>
      <TableRow>
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          T. Credito
        </th>
        <td class="py-4 px-6 text-right">${{ caja.credito }}</td>
      </TableRow>
    </TableBody>

    <TableFooter>
      <tr class="font-semibold text-gray-900 dark:text-white">
        <th scope="row" class="py-3 px-6 text-base">Total</th>
        <td class="py-3 px-6 text-right">${{ caja.saldo }}</td>
      </tr>
    </TableFooter>
  </Table>
</template>

<script>
import Table from "../../../components/Table.vue";
import TableHead from "../../../components/TableHead.vue";
import TableBody from "../../../components/TableBody.vue";
import TableRow from "../../../components/TableRow.vue";
import TableFooter from "../../../components/TableFooter.vue";
import useCajas from "../composables/useCajas";
export default {
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableFooter,
  },
  setup() {
    const { caja } = useCajas();
    return { caja };
  },
};
</script>

<style></style>
