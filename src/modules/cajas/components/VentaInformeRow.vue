<template>
  <th class="py-4 px-6">{{ $filters.formatDate(venta.createdAt) }}</th>
  <td
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ venta.client.lastname }} {{ venta.client.name }}
  </td>
  <td class="py-4 px-6">{{ venta.paymentMethod }}</td>
  <td class="py-4 px-6">${{ venta.total }}</td>
  <td class="py-4 px-6">Venta</td>
  <td class="flex items-center justify-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'venta-show', params: { id: venta.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><ViewIcon
    /></router-link>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";

export default {
  props: {
    venta: {
      type: Object,
      required: true,
    },
  },
  components: { ViewIcon },
  setup() {},
};
</script>
