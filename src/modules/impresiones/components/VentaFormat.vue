<template>
  <h5 class="my-3 text-center"><strong>Factura Venta {{ document.voucher.code }}</strong></h5>
  <p>Fecha: 19/02/2024 12:12:12</p>

  <!-- <ProductsTable :products="document.products" :hiddenOptions="true" /> -->
  <h5 class="text-center">Datos del cliente</h5>
  <div class="mb-5">
    <p class="col text-left no-decorate">
      Cliente: {{ document.client.name }} {{ document.client.lastname }}<br />
      Dni: {{ document.client.dni }}<br />
      Direccion: {{ document.client.address || 'Na.' }}<br />
      Telefono: {{ document.client.phone }}<br />
    </p>
  </div>

  <p>Productos:</p>
  <div v-for="(product) in document.products" :key="product.id" class="flex justify-between">
    <p>{{ product.product.name }}({{ product.quantity }})</p>
    <p>{{ product.total.toFixed(2) }}</p>
  </div>
  <div class="flex justify-between">
    <p>Total</p>
    <p>{{ document.total.toFixed(2) }}</p>
  </div>
  <hr>
  <h5 class="text-center">
    Representacion impresa de la factura electronica
  </h5>

</template>
<script>
// import ProductsTable from "@/modules/ventas/components/ProductsTable.vue";
import useImpresiones from "../composables/useImpresiones";
export default {
  // components: { ProductsTable },
  setup() {
    const { document } = useImpresiones();
    console.log(document)
    return {
      document,
    };
  },
};
</script>
<style lang=""></style>
