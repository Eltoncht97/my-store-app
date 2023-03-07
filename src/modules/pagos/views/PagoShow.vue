<template>
  <Loading v-if="isLoading" />
  <Card v-else>
    <CardHeader>
      <TitleText
        :text="`Pago ${pago.voucher.code} - ${
          pago.proveedor.name
        } - ${$filters.formatDate(pago.createdAt)}`"
      />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Proveedor</label
          >
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          >
            {{ pago.proveedor.name }}
          </p>
        </div>

        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Voucher</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="pago.voucher.code"
            readonly
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Fecha</label
          >
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          >
            {{ $filters.formatDate(pago.createdAt) }}
          </p>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Metodo de Pago</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="pago.paymentMethod"
            readonly
          />
        </div>
        <div>
          <label
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
              :value="pago.total"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button className="danger" text="Cancelar" to="pagos-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Button from "@/components/Button.vue";
import { useRoute } from "vue-router";
import TitleText from "@/components/TitleText.vue";
import usePagos from "../composables/usePagos";
import Loading from "@/components/Loading.vue";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, TitleText, Loading, Button },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { loadPago, pago } = usePagos();
    const { isLoading } = useUI();

    loadPago(id);

    return {
      pago,
      isLoading,
    };
  },
};
</script>
