<template>
  <Card>
    <CardHeader>
      <TitleText text="Crear Pago" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Proveedor</label
          >
          <div class="flex">
            <v-select
              v-model="pago.proveedor"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="proveedores"
              label="label"
            ></v-select>
          </div>
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.proveedor.$error"
          >
            <span class="font-medium">El proveedor es requerido</span>
          </p>
        </div>
        <div v-if="pago.proveedor">
          <label
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
              class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{
                'text-gray-900': pago.proveedor.account.saldo === 0,
                'text-red-500': pago.proveedor.account.saldo < 0,
                'text-green-500': pago.proveedor.account.saldo > 0,
              }"
              :value="
                pago.proveedor.account.saldo > 0
                  ? pago.proveedor.account.saldo
                  : pago.proveedor.account.saldo * -1
              "
              disabled
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
          <div class="grid gap-6 md:grid-cols-4">
            <div
              class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700"
              v-for="paymentMethod in paymentMethods"
              :key="paymentMethod.id"
            >
              <input
                :id="paymentMethod.value"
                type="radio"
                :value="paymentMethod.value"
                v-model="pago.paymentMethod"
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
          <Input label="Monto" v-model.number="pago.total" placeholder="0" />
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
      <div class="py-2">
        <Button text="Guardar" @click="createPago(pago)" />
        <Button className="danger" text="Cancelar" to="pagos-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import TitleText from "@/components/TitleText.vue";
import usePagos from "../composables/usePagos";
import useProveedores from "@/modules/proveedores/composables/useProveedores";
import { paymentMethods } from "@/modules/ventas/utils/paymentMethods";

export default {
  components: { Card, CardHeader, CardBody, Input, Button, TitleText },
  setup() {
    const { pago, createPago, resetPago, v$ } = usePagos();
    const { loadProveedores, proveedores } = useProveedores();

    resetPago();
    loadProveedores({ limited: false });

    return {
      proveedores,
      paymentMethods: paymentMethods.filter(
        (p) => p.value !== "Cuenta Corriente"
      ),
      pago,
      v$,

      loadProveedores,
      createPago,
    };
  },
};
</script>
