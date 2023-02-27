<template>
  <Card>
    <CardHeader>
      <TitleText text="Crear Orden de compra" />
    </CardHeader>
    <CardBody>
      <!-- Datos de la factura -->
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            for="provedor"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Proveedor</label
          >
          <div class="flex">
            <v-select
              id="provedor"
              v-model="ingreso.proveedor"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="proveedores"
              label="label"
            ></v-select>
            <!-- <button
              type="button"
              class="inline-flex focus:outline-none items-center px-3 text-sm text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-md border border-l-0 border-gray-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              +
            </button> -->
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="false">
            <span class="font-medium">El proveedor es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Factura"
            v-model="ingreso.factura"
            placeholder="N° de Factura"
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Fecha</label
          >
          <input
            type="date"
            v-model="ingreso.date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fecha"
            required
          />
        </div>
      </div>
      <!-- Productos de la factura -->
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Producto</label
          >
          <v-select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
            :options="
              products.map((product) => ({
                ...product,
                label: `${product.code} - ${product.name} - ${product.category.name} - $.${product.costWithoutIva}`,
              }))
            "
            label="label"
            v-model="product"
          ></v-select>
        </div>
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-3" v-if="product">
        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Precio</label
          >
          <input
            type="number"
            id="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            v-model="product.costWithoutIva"
          />
        </div>
        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cantidad</label
          >
          <input
            type="number"
            id="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            v-model="productToAdd.cantidad"
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
              placeholder="0"
              required
              v-model="productToAdd.descuentoValue"
            />
          </div>
        </div>
        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Subtotal</label
          >
          <input
            type="number"
            id="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            v-model="productToAdd.subtotal"
          />
        </div>
        <div>
          <label
            for="iva"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Tipo de IVA</label
          >
          <select
            id="iva"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="product.ivaType"
          >
            <option value="IVA 0">IVA 0%</option>
            <option value="IVA 10.5">IVA 10.5%</option>
            <option value="IVA 21">IVA 21%</option>
            <option value="IVA 27.5">IVA 27.5%</option>
          </select>
        </div>
        <div class="flex items-end justify-center">
          <button
            v-if="isEdit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            :disabled="!productToAdd.cantidad && !productToAdd.descuentoValue"
            @click="updateProduct"
          >
            Actualizar
          </button>
          <button
            v-else
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            :disabled="!productToAdd.cantidad && !productToAdd.descuentoValue"
            @click="addProduct"
          >
            Agregar
          </button>
          <!-- el calculo se hara en base al precio de costo final del producto? ????  -->
        </div>
      </div>
      <!-- Listado de productos -->
      <template v-if="ingreso.products.length > 0">
        <hr class="my-3" />
        <ProductsTable
          :products="ingreso.products"
          @on:edit="editProduct"
          @on:delete="deleteProduct"
        />
        <hr class="my-3" />
      </template>
      <hr />
      <!-- Totales finales de la factura -->
      <div class="grid gap-6 mt-3 mb-6 md:grid-cols-3">
        <div>
          <Input
            label="Subtotal"
            v-model.number="ingreso.subtotal"
            placeholder="0"
          />
        </div>
        <div>
          <Input
            label="Descuento"
            v-model.number="ingreso.discount"
            placeholder="0"
          />
        </div>
        <div>
          <Input label="Total" v-model.number="ingreso.total" placeholder="0" />
        </div>
      </div>
      <div class="py-2">
        <Button text="Guardar" @click="createIngreso" />
        <Button
          className="danger"
          text="Cancelar"
          to="ordenes-de-compra-list"
        />
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
import useVentas from "@/modules/ventas/composables/useVentas";
import useProveedores from "@/modules/proveedores/composables/useProveedores";
import useOrdenesDeCompra from "../composables/useOrdenesDeCompra";
import ProductsTable from "@/modules/ordenes-de-compra/components/ProductsTable.vue";

export default {
  components: {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    TitleText,
    ProductsTable,
  },
  setup() {
    const { getProducts, products } = useVentas();
    const { proveedores, loadProveedores } = useProveedores();
    const {
      ingreso,
      product,
      isPDiscountPercentage,
      togglePDiscountType,
      addProduct,
      editProduct,
      deleteProduct,
      isEdit,
      updateProduct,
      createIngreso,
      productToAdd,
    } = useOrdenesDeCompra();

    getProducts();
    loadProveedores();

    return {
      ingreso,
      products,
      product,
      proveedores,
      togglePDiscountType,
      isPDiscountPercentage,
      addProduct,
      editProduct,
      deleteProduct,
      updateProduct,
      isEdit,
      createIngreso,
      productToAdd,
    };
  },
};
</script>
