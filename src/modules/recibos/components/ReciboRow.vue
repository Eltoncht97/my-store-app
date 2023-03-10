<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ recibo.voucher.code }}
  </th>
  <td class="py-4 px-6">
    {{ $filters.formatDate(recibo.createdAt) }}
  </td>
  <td class="py-4 px-6">
    {{ recibo.client.lastname }} {{ recibo.client.name }}
  </td>
  <td class="py-4 px-6">{{ recibo.paymentMethod }}</td>
  <td class="py-4 px-6">${{ recibo.total }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'recibo-show', params: { id: recibo.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><ViewIcon
    /></router-link>
    <router-link
      :to="{ name: 'impresion-create', params: { type: 'recibos', id: recibo.id } }"
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
    recibo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
