<template>
  <Card v-if="venta">
    <CardHeader>
      <TitleText
        :text="`Venta ${venta.client.lastname} ${
          venta.client.name
        } - ${$filters.formatDate(venta.date)}`"
      />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cliente</label
          >
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="first_name"
            readonly
          >
            {{ venta.client.lastname }} {{ venta.client.name }}
          </p>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Fecha</label
          >
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="first_name"
            readonly
          >
            {{ $filters.formatDate(venta.date) }}
          </p>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Voucher</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="string"
            value="000001"
            id="first_name"
            readonly
          />
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Subtotal</label
          >
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              $.
            </span>
            <input
              class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="string"
              :value="venta.subtotal"
              id="first_name"
              readonly
            />
          </div>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Descuento</label
          >
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              $.
            </span>
            <input
              class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="string"
              :value="venta.discount"
              id="first_name"
              readonly
            />
          </div>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Total</label
          >
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              $.
            </span>
            <input
              class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              :value="venta.total"
              id="first_name"
              readonly
            />
          </div>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Metodo de Pago</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="string"
            :value="venta.paymentMethod"
            id="first_name"
            readonly
          />
        </div>
      </div>
      <ProductsTable :products="venta.products" :hiddenOptions="true" />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import { useRoute } from "vue-router";
import useVentas from "../composables/useVentas";
import ProductsTable from "../components/ProductsTable";
import TitleText from "@/components/TitleText.vue";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, ProductsTable, TitleText },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { getVenta, ventaShow: venta, updateVenta } = useVentas();

    getVenta(id);

    return {
      venta,

      updateVenta,
    };
  },
};
</script>
