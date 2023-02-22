<template>
  <Modal size="sm" v-if="showModal" @close="$emit('on:close', 'newRecibo')">
    <template #header>
      <div class="flex items-center text-lg">Nuevo Recibo</div>
    </template>
    <template #body>
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            for="client"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cliente</label
          >
          <div class="flex">
            <v-select
              v-model="recibo.client"
              id="client"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="clients"
              label="label"
            ></v-select>
          </div>
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.client.$error"
          >
            <span class="font-medium">El cliente es requerido</span>
          </p>
        </div>
        <div v-if="recibo.client">
          <label
            for="saldo"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Saldo</label
          >
          <div class="flex">
            <button
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              $
            </button>
            <input
              type="number"
              id="saldo"
              class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{
                'text-gray-900': recibo.client.account.saldo === 0,
                'text-red-500': recibo.client.account.saldo < 0,
                'text-green-500': recibo.client.account.saldo > 0,
              }"
              :value="
                recibo.client.account.saldo > 0
                  ? recibo.client.account.saldo
                  : recibo.client.account.saldo * -1
              "
              disabled
              placeholder="Saldo"
            />
          </div>
        </div>
        <!-- Metodos de pago -->
        <div>
          <label
            for="subtotal"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Metodo de Pago</label
          >
          <div class="grid gap-6 md:grid-cols-1">
            <div
              class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700"
              v-for="paymentMethod in paymentMethods"
              :key="paymentMethod.id"
            >
              <input
                :id="paymentMethod.value"
                type="radio"
                :value="paymentMethod.value"
                v-model="recibo.paymentMethod"
                name="bordered-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                :for="paymentMethod.value"
                class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ paymentMethod.label }}</label
              >
            </div>
            <p
              class="text-sm text-red-600 dark:text-red-500"
              v-if="v$.paymentMethod.$error"
            >
              <span class="font-medium">El metodo de pago es requerido</span>
            </p>
          </div>
        </div>
        <div>
          <Input label="Monto" v-model.number="recibo.total" placeholder="0" />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.total.$error"
          >
            <span class="font-medium"
              >El monto es requerido y debe ser mayor a 0</span
            >
          </p>
        </div>
      </div>
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
          @click="createRecibo(false); $emit('on:close', 'newRecibo');"
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
// import NewReciboForm from "./NewReciboForm.vue";
import useRecibos from "../composables/useRecibos";
import useVentas from "@/modules/ventas/composables/useVentas";
import Input from '@/components/Input.vue';
import { paymentMethods } from "@/modules/ventas/utils/paymentMethods";
// import NewClientForm from "./NewClientForm.vue";
// import useClients from "../composables/useClients";
// import useVentas from "@/modules/ventas/composables/useVentas";

export default {
  components: { Modal, Input },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on:close"],
  setup() {
    // const { client, resetClient } = useClients();

    // const { createClientVenta } = useVentas();
    const { createRecibo, recibo, resetRecibo, v$ } = useRecibos();

    // resetClient()

    const { getClients, clients } = useVentas();

    resetRecibo();
    getClients();

    return {
      recibo,
      createRecibo,
      v$,
      resetRecibo,
      clients,
      paymentMethods: paymentMethods.filter(p => p.value !== 'Cuenta Corriente'),
    };
    // return {
    //   createClientVenta,
    //   client,
    // };
  },
};
</script>

<style></style>
