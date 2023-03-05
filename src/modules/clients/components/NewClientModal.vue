<template>
  <Modal size="xs" v-if="showModal" @close="$emit('on:close', 'newClient')">
    <template #header>
      <div class="flex items-center text-lg">Agregar Cliente</div>
    </template>
    <template #body>
      <ClientForm />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button
          type="button"
          @click="$emit('on:close', 'newClient')"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="
            createClientVenta(client);
            $emit('on:close', 'newClient');
          "
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
import ClientForm from "./ClientForm.vue";
import useClients from "../composables/useClients";
import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  components: { ClientForm, Modal },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on:close"],
  setup() {
    const { client, resetClient } = useClients();
    const { createClientVenta } = useVentas();

    resetClient();

    return {
      client,
      createClientVenta,
    };
  },
};
</script>

<style></style>
