<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ pago.voucher.code }}
  </th>
  <td class="py-4 px-6">
    {{ $filters.formatDate(pago.createdAt) }}
  </td>
  <td class="py-4 px-6">
    {{ pago.proveedor.name }}
  </td>
  <td class="py-4 px-6">{{ pago.paymentMethod }}</td>
  <td class="py-4 px-6">${{ pago.total }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'pago-show', params: { id: pago.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><ViewIcon
    /></router-link>
    <router-link
      :to="{ name: 'pago-show', params: { id: pago.id } }"
      class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
      ><i class="fa-solid fa-print"></i
    ></router-link>
    <button class="font-medium text-red-600 dark:text-red-500 hover:underline">
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ViewIcon from "@/components/icons/ViewIcon.vue";

export default {
  components: { DeleteIcon, ViewIcon },
  props: {
    pago: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
