<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ user.fullName }}
  </th>
  <td class="py-4 px-6">{{ user.email }}</td>
  <td class="py-4 px-6">{{ user.roles }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'user-edit', params: { id: user.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <EditIcon />
    </router-link>
    <button
      @click="deleteUser(user.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useUsers from "../composables/useUsers";

export default {
  components: { EditIcon, DeleteIcon },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteUser } = useUsers();

    return {
      deleteUser,
    };
  },
};
</script>

<style></style>
