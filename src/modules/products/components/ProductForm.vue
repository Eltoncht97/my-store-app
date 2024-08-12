<template>
  <div class="grid gap-6 mb-6 md:grid-cols-2" v-if="product">
    <div>
      <Input label="Codigo de Busqueda" v-model="product.code" />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.code.$error"
      >
        <span class="font-medium">El codigo de busqueda es requerido</span>
      </p>
    </div>
    <div>
      <Input label="Nombre" v-model.trim="product.name" />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.name.$error"
      >
        <span class="font-medium">El nombre es requerido</span>
      </p>
    </div>
    <div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Categoria</label
      >
      <select
        v-model="product.categoryId"
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
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.categoryId.$error"
      >
        <span class="font-medium">La categoria es requerida</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Stock Minimo"
        v-model.number="product.stockMin"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.stockMin.$error"
      >
        <span class="font-medium">El Stock Minimo es requerido</span>
      </p>
    </div>
    <div>
      <Input type="number" label="Stock" v-model.number="product.stock" />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.stock.$error"
      >
        <span class="font-medium">El Stock es requerido</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Costo sin IVA"
        v-model.number="product.costWithoutIva"
        @change="recalcValues"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.costWithoutIva.$error"
      >
        <span class="font-medium">El Costo sin IVA es requerido</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Descuento %"
        @change="calcDiscount"
        v-model.number="product.discountPercentage"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.discountPercentage.$error"
      >
        <span class="font-medium">El Descuento % es requerido</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Descuento"
        v-model.number="product.discount"
        @change="calcDiscountPercentage"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.discount.$error"
      >
        <span class="font-medium">El descuento es requerido</span>
      </p>
    </div>
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
        <option value="">Seleccionar tipo de iva</option>
        <option value="IVA 0">Iva 0%</option>
        <option value="IVA 10.5">Iva 10.5%</option>
        <option value="IVA 21">Iva 21%</option>
        <option value="IVA 27.5">Iva 27.5%</option>
      </select>
    </div>
    <div>
      <Input type="number" label="IVA" v-model.number="product.iva" />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.iva.$error"
      >
        <span class="font-medium">El calculo del IVA es requerido</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Costo Total"
        v-model.number="product.costPrice"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.costPrice.$error"
      >
        <span class="font-medium">El precio de Costo es requerido</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Ganancias %"
        v-model.number="product.utilitiesPercentage"
        @change="calcUtilities"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.utilitiesPercentage.$error"
      >
        <span class="font-medium">Las Ganancias % son requeridas</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Ganancias"
        v-model.number="product.utilities"
        @change="calcUtilitiesPercentage"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.utilities.$error"
      >
        <span class="font-medium">La ganancia es requerida</span>
      </p>
    </div>
    <div>
      <Input
        type="number"
        label="Precio de Venta"
        v-model.number="product.price"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="v$.price.$error"
      >
        <span class="font-medium"
          >El precio de venta es requerido y no puede ser menor o igual a
          0</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import useProducts from "../composables/useProducts";
import useCategories from "@/modules/categories/composables/useCategories";

export default {
  components: { Input },
  setup() {
    const {
      product,
      v$,
      calcDiscount,
      calcUtilities,
      calcDiscountPercentage,
      calcUtilitiesPercentage,
      calcIva,
      recalcValues,
    } = useProducts();

    const { categories } = useCategories();
    console.log({product})
    // console.log({categories})

    // loadCategories({ limited: false });

    return {
      product,
      categories,
      v$,
      calcUtilities,
      calcDiscount,
      calcDiscountPercentage,
      calcIva,
      calcUtilitiesPercentage,
      recalcValues,
    };
  },
};
</script>
