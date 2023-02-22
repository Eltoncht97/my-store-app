<template>
  <th
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {{ product.code }}
  </th>
  <td class="py-4 px-6">{{ product.name }}</td>
  <td class="py-4 px-6">{{ product.category.name }}</td>
  <td class="py-4 px-6">{{ product.stock }} u.</td>
  <td class="py-4 px-6">${{ product.costPrice }}</td>
  <td class="py-4 px-6">${{ product.utilities }}</td>
  <td class="py-4 px-6">${{ product.price }}</td>
  <td
    class="py-4 px-6"
    :class="{
      'text-green-400 dark:text-green-500': product.active,
      'text-red-400 dark:text-red-500': !product.active,
    }"
  >
    {{ product.active ? "Activo" : "Inactivo" }}
  </td>
  <td class="flex items-center py-4 px-4 space-x-3">
    <router-link
      :to="{ name: 'product-edit', params: { id: product.id } }"
      class="text-blue-600 dark:text-blue-500 hover:underline"
    >
      <EditIcon />
    </router-link>
    <button
      @click="deleteProduct(product.id)"
      class="text-red-600 dark:text-red-500 hover:underline"
    >
      <DeleteIcon />
    </button>
  </td>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import useProducts from "../composables/useProducts";

export default {
  components: { EditIcon, DeleteIcon },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { deleteProduct } = useProducts();

    return {
      deleteProduct,
    };
  },
};
</script>

<style></style>
