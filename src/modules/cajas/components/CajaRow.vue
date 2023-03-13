<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ caja.user.fullName }}
  </th>
  <td class="py-4 px-6">{{ $filters.formatDate(caja.createdAt) }}</td>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': caja.state === 'Abierta',
      'text-red-400 dark:text-red-500': caja.state === 'Cerrada',
    }"
  >
    {{ caja.state === "Abierta" ? "Abierta" : "Cerrada" }}
  </td>
  <td class="py-4 px-6">${{ caja.saldo }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'caja-show', params: { id: caja.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><ViewIcon
    /></router-link>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";

export default {
  components: { ViewIcon },
  props: {
    caja: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
