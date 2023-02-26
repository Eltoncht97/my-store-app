<template>
  <Card v-if="product">
    <CardHeader>
      <TitleText text="Editar Producto" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <Input label="Codigo de Busqueda" v-model="product.code" />
        <Input label="Nombre" v-model="product.name" />
        <div>
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Categoria</label
          >
          <select
            id="category"
            v-model="product.category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Selecciona una categoria</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <Input label="Stock Minimo" v-model.number="product.stockMin" />
        <Input label="Stock" v-model.number="product.stock" />
        <Input label="Costo sin IVA" v-model.number="product.costWithoutIva" />
        <Input label="Descuento %" v-model.number="product.discountPercentage" @change="calcDiscount" />
        <Input label="Descuento" v-model.number="product.discount" @change="calcDiscountPercentage" />
        <div>
          <label
            for="iva"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Tipo de IVA</label
          >
          <select
            id="iva"
            v-model="product.ivaType"
            @change="calcIva"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Selecciona una categoria</option>
            <option value="IVA 0">Iva 0%</option>
            <option value="IVA 10.5">Iva 10.5%</option>
            <option value="IVA 21">Iva 21%</option>
            <option value="IVA 27.5">Iva 27.5%</option>
          </select>
        </div>
        <Input label="IVA" v-model.number="product.iva" />
        <Input label="Costo Total" v-model.number="product.costPrice" />
        <Input label="Ganancias %" v-model.number="product.utilitiesPercentage" @change="calcUtilities" />
        <Input label="Ganancias" v-model.number="product.utilities" @change="calcUtilitiesPercentage" />
        <Input label="Precio de Venta" v-model.number="product.price" disabled />
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Estado</label
          >
          <div class="flex">
            <div class="flex items-center mr-4">
              <input
                id="inline-radio"
                v-model="product.active"
                type="radio"
                :value="true"
                name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inline-radio"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Activo</label
              >
            </div>
            <div class="flex items-center mr-4">
              <input
                id="inline-2-radio"
                v-model="product.active"
                type="radio"
                :value="false"
                name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inline-2-radio"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Inactivo</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="py-2">
        <Button
          text="Guardar"
          @click="updateProduct(product)"
          :loading="isLoading"
        />
        <Button
          className="danger"
          text="Cancelar"
          to="products-list"
          :loading="isLoading"
        />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import useProducts from "../composables/useProducts";
import useCategories from "@/modules/categories/composables/useCategories";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, TitleText, Input, Button },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { getProduct, product, updateProduct, isLoading, calcDiscount, calcUtilities, calcDiscountPercentage, calcUtilitiesPercentage, calcIva } = useProducts();
    const { loadCategories, categories } = useCategories()

    loadCategories();
    getProduct(id);

    return {
      product,
      categories,
      isLoading,
      calcDiscountPercentage,
      calcUtilitiesPercentage,
      calcIva,

      updateProduct,
      calcDiscount, calcUtilities
    };
  },
};
</script>
