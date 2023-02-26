<template>
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

<script>
import Input from "@/components/Input.vue";
import useRecibos from "../composables/useRecibos";
import { paymentMethods } from "@/modules/ventas/utils/paymentMethods";
import useVentas from '@/modules/ventas/composables/useVentas';

export default {
  components: { Input },
  setup() {
    const { recibo, createRecibo, resetRecibo, v$ } = useRecibos();
    const { getClients, clients } = useVentas();

    resetRecibo();
    getClients();

    return {
      clients,
      paymentMethods: paymentMethods.filter(p => p.value !== 'Cuenta Corriente'),
      recibo,
      v$,

      getClients,
      createRecibo,
    };
  },
};
</script>