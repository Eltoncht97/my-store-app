<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ client.lastname }} {{ client.name }}
  </th>
  <td class="py-4 px-6">{{ client.phone }}</td>
  <td class="py-4 px-6">{{ client.address }}</td>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': client.active,
      'text-red-400 dark:text-red-500': !client.active,
    }"
  >
    {{ client.active ? "Activo" : "Inactivo" }}
  </td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'client-edit', params: { id: client.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <EditIcon />
    </router-link>
    <button
      v-if="client.active"
      @click="deleteClient(client.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useClients from "../composables/useClients";

export default {
  components: { EditIcon, DeleteIcon },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteClient } = useClients();

    return {
      deleteClient,
    };
  },
};
</script>

<style></style>
