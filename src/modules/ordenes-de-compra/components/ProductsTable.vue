<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">Cantidad</th>
          <th scope="col" class="py-3 px-6">Producto</th>
          <th scope="col" class="py-3 px-6">Costo u.</th>
          <th scope="col" class="py-3 px-6">Subtotal</th>
          <th scope="col" class="py-3 px-6">Descuento</th>
          <th scope="col" class="py-3 px-6">Impuestos</th>
          <th scope="col" class="py-3 px-6">Total</th>
          <th scope="col" class="py-3 px-6 text-center" v-if="!hiddenOptions">
            Opciones
          </th>
        </tr>
      </thead>
      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <td class="py-4 px-6 text-center">{{ product.quantity }}u.</td>
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ product.name || product.product.name }}
          </th>
          <td class="py-4 px-6">
            ${{ product.price || product.product.costPrice }}
          </td>
          <td class="py-4 px-6">${{ product.subtotal }}</td>
          <td class="py-4 px-6">${{ product.discount }}</td>
          <td class="py-4 px-6">${{ product.impuestos }}</td>
          <td class="py-4 px-6">${{ product.total }}</td>
          <td class="py-4 px-6 text-right" v-if="!hiddenOptions">
            <button
              v-if="!isEdit"
              @click="$emit('on:edit', product.id)"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
            >
              <EditIcon />
            </button>
            <button
              v-if="!isEdit"
              @click="$emit('on:delete', product.id)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              <DeleteIcon />
            </button>
          </td>
        </TableRow>
      </TableBody>
    </table>
  </div>
</template>

<script>
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import TableBody from "@/components/TableBody.vue";
import TableRow from "@/components/TableRow.vue";
import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    hiddenOptions: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isEdit } = useVentas();
    return {
      isEdit,
    };
  },
  components: { TableBody, TableRow, EditIcon, DeleteIcon },
};
</script>
