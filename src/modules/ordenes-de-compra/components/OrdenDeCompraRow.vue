<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ ordenDeCompra.factura }}
  </th>
  <td class="py-4 px-6">{{ ordenDeCompra.proveedor.name }}</td>
  <td class="py-4 px-6">{{ $filters.formatDate(ordenDeCompra.date) }}</td>
  <td class="py-4 px-6">${{ ordenDeCompra.total }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'orden-de-compra-show', params: { id: ordenDeCompra.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <ViewIcon />
    </router-link>
    <button
      @click="deleteVenta(ordenDeCompra.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export default {
  components: { ViewIcon, DeleteIcon },
  props: {
    ordenDeCompra: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      deleteVenta: () => alert("En proceso..."),
    };
  },
};
</script>

<style></style>
