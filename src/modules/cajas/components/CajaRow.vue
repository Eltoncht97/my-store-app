<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ caja.user.fullName }}
  </th>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': !caja.deleted,
      'text-red-400 dark:text-red-500': caja.deleted,
    }"
  >
    {{ !caja.deleted ? "Activo" : "Eliminado" }}
  </td>
  <td class="py-4 px-6">${{ caja.saldo }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'caja-show', params: { id: caja.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      ><ViewIcon
    /></router-link>
    <button
      v-if="!caja.deleted"
      @click="deleteCaja(caja.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useCajas from "../composables/useCajas";

export default {
  components: { ViewIcon, DeleteIcon },
  props: {
    caja: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteCaja } = useCajas();

    return {
      deleteCaja,
    };
  },
};
</script>

<style></style>
