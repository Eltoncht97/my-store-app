<template>
  <Modal size="sm" v-if="showModal" @close="$emit('on:close', 'newRecibo')">
    <template #header>
      <div class="flex items-center text-lg">Nuevo Recibo</div>
    </template>
    <template #body>
      <NewReciboForm />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button
          type="button"
          @click="$emit('on:close', 'newRecibo')"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="
            createRecibo(false);
            $emit('on:close', 'newRecibo');
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
import { paymentMethods } from "@/modules/ventas/utils/paymentMethods";
import NewReciboForm from "./NewReciboForm.vue";
import useRecibos from "../composables/useRecibos";
import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  components: { Modal, NewReciboForm },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on:close"],
  setup() {
    const { createRecibo, recibo, resetRecibo, v$ } = useRecibos();
    const { getClients, clients } = useVentas();

    resetRecibo();
    getClients({ limited: false });

    return {
      recibo,
      clients,
      paymentMethods: paymentMethods.filter(
        (p) => p.value !== "Cuenta Corriente"
      ),
      v$,
      createRecibo,
      resetRecibo,
    };
  },
};
</script>

<style></style>
