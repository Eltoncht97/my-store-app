<template>
  <Modal :size="size" v-if="showModal" @close="$emit('on:close', 'newProduct')">
    <template #header>
      <div class="flex items-center text-lg">Agregar Producto</div>
    </template>
    <template #body>
      <ProductForm />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button
          type="button"
          @click="$emit('on:close', 'newProduct')"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="launchCreateProduct"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { Modal } from "flowbite-vue";
import ProductForm from "./ProductForm.vue";
import useProducts from "../composables/useProducts";
import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  components: { Modal, ProductForm },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "xs",
    },
  },
  emits: ["on:close"],
  setup(props, { emit }) {
    const { createProduct, resetProduct } = useProducts();
    const { getProducts } = useVentas();

    const launchCreateProduct = async () => {
      const resp = await createProduct({ redirect: false });
      if (!resp.ok) {
        return;
      }
      emit("on:close", "newProduct");
      getProducts();
    };

    resetProduct();

    return {
      launchCreateProduct,
    };
  },
};
</script>

<style></style>
