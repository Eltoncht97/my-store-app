<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ client.lastname }} {{ client.name }}
  </th>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': client.account.saldo > 0,
      'text-red-400 dark:text-red-500': client.account.saldo < 0,
    }"
  >
    $
    {{
      client.account.saldo <= 0
        ? client.account.saldo * -1
        : client.account.saldo
    }}
  </td>
  <td class="py-4 px-6">{{ client.phone }}</td>
  <td class="flex justify-center items-center py-4 px-6 space-x-3">
    <router-link
      :to="{ name: 'cuenta-show', params: { id: client.account.id } }"
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
    client: {
      type: Object,
      required: true,
    },
  },
};
</script>
