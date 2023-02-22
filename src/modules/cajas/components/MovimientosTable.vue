<template>
  <template v-if="movimientos.length > 0">
    <Table class="h-80">
      <TableHead>
        <th scope="col" class="py-3 px-6">Fecha</th>
        <th scope="col" class="py-3 px-6">Descripcion</th>
        <th scope="col" class="py-3 px-6 text-right">Monto</th>
      </TableHead>
      <TableBody>
        <TableRow v-for="(movimiento, index) in movimientos" :key="index">
          <th
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ $filters.formatDate(movimiento.createdAt) }}
          </th>
          <td
            scope="row"
            class="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
          >
            {{ movimiento.description }}
          </td>
          <td
            class="py-4 px-6 font-medium text-right"
            :class="{
              'text-green-400 dark:text-green-500':
                movimiento.state === 'Conciliado',
              'text-red-400 dark:text-red-500':
                movimiento.state === 'No Conciliado',
            }"
          >
            ${{ movimiento.monto > 0 ? movimiento.monto : movimiento.monto * -1 }}
          </td>
        </TableRow>
      </TableBody>
    </Table>
  </template>
  <div v-else>La caja aun no posee movimientos</div>
</template>

<script>
import Table from "../../../components/Table.vue";
import TableHead from "../../../components/TableHead.vue";
import TableBody from "../../../components/TableBody.vue";
import TableRow from "../../../components/TableRow.vue";
import useCajas from "../composables/useCajas";
export default {
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
  },
  props: {
    movimientos: {
      type: Array
    }
  },
  setup() {
    const { caja } = useCajas();
    return { caja };
  },
};
</script>

<style></style>
