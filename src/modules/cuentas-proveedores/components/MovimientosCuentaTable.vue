<template>
  <template v-if="cuenta.movimientos.length > 0">
    <Table class="h-80">
      <TableHead>
        <th scope="col" class="py-3 px-6">Fecha</th>
        <th scope="col" class="py-3 px-6">Descripcion</th>
        <th scope="col" class="py-3 px-6 text-right">Monto</th>
        <th scope="col" class="w-10 py-3 px-6 text-center">Link</th>
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
            ${{ movement.monto > 0 ? movement.monto : movement.monto * -1 }}
          </td>
          <td
            class="w-20 py-4 px-6 flex justify-center items-center font-medium text-right"
          >
            <router-link
              :to="{
                name: movement.description.toLowerCase().includes('pago')
                  ? 'pago-show'
                  : 'orden-de-compra-show',
                params: { id: movement.operationId },
              }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              ><ViewIcon
            /></router-link>
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
      <p
        class="py-4 px-6 font-medium text-right"
        :class="{
          'text-green-400 dark:text-green-500': totalMovimientos > 0,
          'text-red-400 dark:text-red-500': totalMovimientos < 0,
        }"
      >
        ${{ totalMovimientos }}
      </p>
    </div>
  </template>
  <div v-else>La cuenta aun no posee movimientos</div>
</template>

<script>
import Table from "../../../components/Table.vue";
import TableHead from "../../../components/TableHead.vue";
import TableBody from "../../../components/TableBody.vue";
import TableRow from "../../../components/TableRow.vue";
import useCuentasProveedores from "../composables/useCuentasProveedores";
import ViewIcon from "@/components/icons/ViewIcon.vue";
export default {
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    ViewIcon,
  },

  setup() {
    const { cuenta, totalMovimientos } = useCuentasProveedores();
    return { cuenta, totalMovimientos };
  },
};
</script>

<style></style>
