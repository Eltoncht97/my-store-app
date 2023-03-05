<template>
  <Modal size="xs" v-if="showModal" @close="$emit('on:close', 'newProveedor')">
    <template #header>
      <div class="flex items-center text-lg">Agregar Proveedor</div>
    </template>
    <template #body>
      <NewProveedorForm />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button type="button" @click="$emit('on:close', 'newProveedor')"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Cancelar
        </button>
        <button @click="createProveedor(false); $emit('on:close', 'newProveedor');" type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Guardar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { Modal } from "flowbite-vue";
import NewProveedorForm from "./NewProveedorForm.vue";
import useProveedores from "../composables/useProveedores";

export default {
  components: { NewProveedorForm, Modal },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on:close"],
  setup() {
    const { createProveedor, resetProveedor } = useProveedores();


    resetProveedor()

    return {
      createProveedor,
    };
  },
};
</script>

<style></style>
