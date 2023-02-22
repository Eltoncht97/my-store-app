<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ venta.client.lastname }} {{ venta.client.name }}
  </th>
  <td class="py-4 px-6">{{ $filters.formatDate(venta.date) }}</td>
  <td class="py-4 px-6">{{ venta.paymentMethod }}</td>
  <td class="py-4 px-6">${{ venta.total }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'venta-show', params: { id: venta.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <ViewIcon />
    </router-link>
    <button
      @click="deleteVenta(venta.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useVentas from "../composables/useVentas";

export default {
  components: { ViewIcon, DeleteIcon },
  props: {
    venta: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteVenta } = useVentas();

    return {
      deleteVenta,
    };
  },
};
</script>

<style></style>
