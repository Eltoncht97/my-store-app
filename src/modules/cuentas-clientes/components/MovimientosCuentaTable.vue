<template>
  <template v-if="cuenta.movimientos.length > 0">
    <Table class="h-80">
      <TableHead>
        <th scope="col" class="py-3 px-6">Fecha</th>
        <th scope="col" class="py-3 px-6">Descripcion</th>
        <th scope="col" class="py-3 px-6 text-right">Monto</th>
      </TableHead>
      <TableBody>
        <TableRow v-for="(movement, index) in cuenta.movimientos" :key="index">
          <th
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ $filters.formatDate(movement.createdAt) }}
          </th>
          <td
            scope="row"
            class="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
          >
            {{ movement.description }}
          </td>
          <td
            class="py-4 px-6 font-medium text-right"
            :class="{
              'text-green-400 dark:text-green-500': movement.monto > 0,
              'text-red-400 dark:text-red-500': movement.monto < 0,
            }"
          >
            $ {{ movement.monto > 0 ? movement.monto : movement.monto }}
          </td>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-end">
      <p
        class="py-4 pl-6 font-medium whitespace-nowrap dark:text-white text-right"
      >
        TOTAL:
      </p>
      <p class="py-4 px-6 font-medium text-right">${{ totalMovimientos }}</p>
    </div>
  </template>
  <div v-else>La caja aun no posee movimientos</div>
</template>

<script>
import Table from "../../../components/Table.vue";
import TableHead from "../../../components/TableHead.vue";
import TableBody from "../../../components/TableBody.vue";
import TableRow from "../../../components/TableRow.vue";
import useCuentas from "../composables/useCuentas";
export default {
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
  },

  setup() {
    const { cuenta, totalMovimientos } = useCuentas();
    return { cuenta, totalMovimientos };
  },
};
</script>

<style></style>
