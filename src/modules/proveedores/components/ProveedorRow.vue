<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ proveedor.name }}
  </th>
  <td class="py-4 px-6">{{ proveedor.address }}</td>
  <td class="py-4 px-6">{{ proveedor.phone }}</td>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': proveedor.account.saldo > 0,
      'text-red-400 dark:text-red-500': proveedor.account.saldo < 0,
    }"
  >
    ${{
      proveedor.account.saldo > 0
        ? proveedor.account.saldo
        : proveedor.account.saldo * -1
    }}
  </td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'proveedores-edit', params: { id: proveedor.id } }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <EditIcon />
    </router-link>
    <button
      @click="deleteProveedor(proveedor.id)"
      class="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useProveedores from "../composables/useProveedores";

export default {
  components: { EditIcon, DeleteIcon },
  props: {
    proveedor: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteProveedor } = useProveedores();

    return {
      deleteProveedor,
    };
  },
};
</script>
