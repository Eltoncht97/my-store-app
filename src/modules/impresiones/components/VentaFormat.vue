<template>
  <h5 class="my-3"><strong>Venta V-{{ document.voucher.code }}</strong></h5>

  <ProductsTable :products="document.products" :hiddenOptions="true" />
</template>
<script>
import ProductsTable from "@/modules/ventas/components/ProductsTable.vue";
import useImpresiones from "../composables/useImpresiones";
export default {
  components: { ProductsTable },
  setup() {
    const { document } = useImpresiones();
    return {
      document,
    };
  },
};
</script>
<style lang=""></style>
