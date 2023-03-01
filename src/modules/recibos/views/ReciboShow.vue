<template>
  <Loading v-if="isLoading" />
  <Card v-else>
    <CardHeader>
      <TitleText
        :text="`Recibo ${recibo.voucher.code} - ${recibo.client.lastname} ${
          recibo.client.name
        } - ${$filters.formatDate(recibo.createdAt)}`"
      />
      <router-link
        :to="{ name: 'recibo-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Imprimir
      </router-link>
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cliente</label
          >
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          >
            {{ recibo.client.lastname }} {{ recibo.client.name }}
          </p>
        </div>

        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Voucher</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="recibo.voucher.code"
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
            {{ $filters.formatDate(recibo.createdAt) }}
          </p>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Metodo de Pago</label
          >
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="recibo.paymentMethod"
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
              :value="recibo.total"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button className="danger" text="Cancelar" to="recibos-list" />
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
import useRecibos from "../composables/useRecibos";
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
    const { loadRecibo, recibo } = useRecibos();
    const { isLoading } = useUI();

    loadRecibo(id);

    return {
      recibo,
      isLoading,
    };
  },
};
</script>
