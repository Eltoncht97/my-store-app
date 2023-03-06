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
    $
    {{
      proveedor.account.saldo <= 0
        ? proveedor.account.saldo * -1
        : proveedor.account.saldo
    }}
  </td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{
        name: 'cuenta-proveedor-show',
        params: { id: proveedor.account.id },
      }"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <ViewIcon />
    </router-link>
  </td>
</template>

<script>
import ViewIcon from "@/components/icons/ViewIcon.vue";
export default {
  components: { ViewIcon },
  props: {
    proveedor: {
      type: Object,
      required: true,
    },
  },
};
</script>
