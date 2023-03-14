<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-3 text-center">Cantidad</th>
          <th scope="col" class="py-3 px-1">Producto</th>
          <th scope="col" class="py-3 px-3 text-center">Costo u.</th>
          <th scope="col" class="py-3 px-3 text-center">Subtotal</th>
          <th scope="col" class="py-3 px-3 text-center">Descuento</th>
          <th scope="col" class="py-3 px-3 text-center">Impuestos</th>
          <th scope="col" class="py-3 px-3 text-center">Total</th>
          <th scope="col" class="py-3 px-3 text-center" v-if="!hiddenOptions">
            Opciones
          </th>
        </tr>
      </thead>
      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <td class="py-4 px-3 text-center">{{ product.quantity }}u.</td>
          <th
            scope="row"
            class="py-3 w-2/12 px-1 font-medium text-gray-900 dark:text-white"
          >
            {{ product.name || product.product.name }}
          </th>
          <td class="py-4 px-3 text-center">
            ${{ product.price || product.product.costPrice }}
          </td>
          <td class="py-4 px-3 text-center">${{ product.subtotal }}</td>
          <td class="py-4 px-3 text-center">${{ product.discount }}</td>
          <td class="py-4 px-3 text-center">${{ product.impuestos }}</td>
          <td class="py-4 px-3 text-center">${{ product.total }}</td>
          <td class="py-4 px-3 text-center" v-if="!hiddenOptions">
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
        <TableRow v-if="!hiddenTotal">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="py-3 px-3 text-right"><strong>TOTAL:</strong></td>
          <td class="py-3 px-3 text-center">
            <strong>${{ totalProducts }}</strong>
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
import { computed } from "vue";

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
    hiddenTotal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { isEdit } = useVentas();
    const totalProducts = computed(() =>
      props.products.map((p) => p.total).reduce((a, b) => a + b, 0)
    );

    return {
      isEdit,
      totalProducts,
    };
  },
  components: { TableBody, TableRow, EditIcon, DeleteIcon },
};
</script>
