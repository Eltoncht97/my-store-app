<template>
  <Card v-if="venta">
    <CardHeader>
      <TitleText text="Nueva Venta" />
      <button
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        @click="openModal('newRecibo')"
      >
        Nuevo Pago
      </button>
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            for="client"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cliente</label
          >
          <div class="flex">
            <v-select
              v-model="venta.client"
              id="client"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="clients"
              label="label"
            ></v-select>
            <button
              type="button"
              class="inline-flex focus:outline-none items-center px-3 text-sm text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-md border border-l-0 border-gray-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              @click="openModal('newClient')"
            >
              +
            </button>
          </div>
          <NewClientModal
            :showModal="showNewClientModal"
            @on:close="closeModal"
          />
          <NewReciboModal
            :showModal="showNewReciboModal"
            @on:close="closeModal"
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.client.$error"
          >
            <span class="font-medium">El cliente es requerido</span>
          </p>
        </div>
        <div>
          <label
            for="date"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Fecha</label
          >
          <input
            type="date"
            v-model="venta.date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fecha"
            required
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.date.$error"
          >
            <span class="font-medium">La fecha es requerida</span>
          </p>
        </div>
        <div v-if="venta.client">
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
                'text-gray-900': venta.client.account.saldo === 0,
                'text-red-500': venta.client.account.saldo < 0,
                'text-green-500': venta.client.account.saldo > 0,
              }"
              :value="
                venta.client.account.saldo > 0
                  ? venta.client.account.saldo
                  : venta.client.account.saldo * -1
              "
              disabled
              placeholder="Saldo"
            />
          </div>
        </div>
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Producto</label
          >
          <v-select
            v-model="product"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
            :options="products"
            label="label"
          ></v-select>
        </div>
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-4">
        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cantidad</label
          >
          <input
            type="number"
            v-model="venta.quantityProduct"
            id="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
        <div>
          <label
            for="discountProduct"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Descuento u.</label
          >
          <div class="flex">
            <button
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              @click="togglePDiscountType"
            >
              {{ !isPDiscountPercentage ? "$" : "%" }}
            </button>
            <input
              class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              v-model="venta.discountProduct"
              placeholder="0"
              required
            />
          </div>
        </div>
        <div>
          <label
            for="subtotalProduct"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Subtotal</label
          >
          <input
            type="number"
            v-model="venta.subtotalProduct"
            id="subtotalProduct"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            disabled
          />
        </div>
        <div class="flex items-end justify-center">
          <button
            v-if="isEdit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            :disabled="!venta.quantityProduct && !venta.discountProduct"
            @click="updateProduct"
          >
            Actualizar
          </button>
          <button
            v-else
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            :disabled="!venta.quantityProduct && !venta.discountProduct"
            @click="addProduct"
          >
            Agregar
          </button>
        </div>
      </div>

      <!-- Listado de productos -->
      <template v-if="venta.products.length > 0">
        <hr class="my-3" />
        <ProductsTable
          :products="venta.products"
          @on:edit="editProduct"
          @on:delete="deleteProduct"
        />
        <hr class="my-3" />
      </template>

      <!-- totales finales -->
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            for="subtotal"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Subtotal</label
          >
          <input
            type="number"
            :value="venta.subtotal"
            id="subtotal"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
          />
          <p
            class="text-sm text-red-600 dark:text-red-500"
            v-if="v$.subtotal.$error"
          >
            <span class="font-medium"
              >El subtotal no puede ser menor o igual a 0</span
            >
          </p>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Descuento
          </label>
          <div class="flex">
            <button
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              @click="toggleDiscountType"
            >
              {{ !isDiscountPercentage ? "$" : "%" }}
            </button>
            <input
              @change="calcDiscount"
              class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              v-model="venta.discountValue"
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Total</label
          >
          <input
            type="number"
            :value="venta.total"
            disabled
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p
            class="text-sm text-red-600 dark:text-red-500"
            v-if="v$.total.$error"
          >
            <span class="font-medium"
              >El total no puede ser menor o igual a 0</span
            >
          </p>
        </div>
      </div>

      <!-- Metodos de pago -->
      <label
        for="subtotal"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Metodo de Pago</label
      >
      <div :class="`grid gap-6 mb-6 md:grid-cols-${paymentMethods.length}`">
        <div
          class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700"
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.id"
        >
          <input
            :id="paymentMethod.value"
            type="radio"
            :value="paymentMethod.value"
            v-model="venta.paymentMethod"
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

      <div class="py-2">
        <Button text="Guardar" @click="createVenta()" :loading="isLoading" />
        <Button
          className="danger"
          text="Cancelar"
          to="ventas-list"
          :loading="isLoading"
        />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { ref } from "vue";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import ProductsTable from "../components/ProductsTable.vue";
import useVentas from "../composables/useVentas";
import TitleText from "@/components/TitleText.vue";
import Button from "@/components/Button.vue";
import NewClientModal from "@/modules/clients/components/NewClientModal.vue";
import NewReciboModal from "@/modules/recibos/components/NewReciboModal.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    ProductsTable,
    TitleText,
    Button,
    NewClientModal,
    NewReciboModal,
  },
  setup() {
    const showNewClientModal = ref(false);

    const showNewReciboModal = ref(false);

    const openModal = (type) => {
      if (type === "newClient") showNewClientModal.value = true;
      if (type === "newRecibo") showNewReciboModal.value = true;
    };

    const closeModal = (type) => {
      if (type === "newClient") showNewClientModal.value = false;
      if (type === "newRecibo") showNewReciboModal.value = false;
    };

    const toggleModal = (type) => {
      if (type === "newClient")
        showNewClientModal.value = !showNewClientModal.value;
      if (type === "newRecibo")
        showNewReciboModal.value = !showNewReciboModal.value;
    };

    const {
      addProduct,
      clients,
      createVenta,
      getClients,
      getProducts,
      isEdit,
      product,
      products,
      resetVenta,
      updateProduct,
      venta,
      paymentMethods,
      editProduct,
      deleteProduct,
      v$,
      isLoading,
      isPDiscountPercentage,
      isDiscountPercentage,
      togglePDiscountType,
      toggleDiscountType,
      calcDiscount,
    } = useVentas();

    resetVenta();
    getClients();
    getProducts();

    return {
      clients,
      isDiscountPercentage,
      isEdit,
      isLoading,
      isPDiscountPercentage,
      paymentMethods,
      product,
      products,
      showNewClientModal,
      showNewReciboModal,
      v$,
      venta,

      addProduct,
      calcDiscount,
      createVenta,
      deleteProduct,
      editProduct,
      openNewClientModal: () => console.log("Modal de new client"),
      toggleDiscountType,
      togglePDiscountType,
      openModal,
      updateProduct,
      closeModal,
      toggleModal,
    };
  },
};
</script>
