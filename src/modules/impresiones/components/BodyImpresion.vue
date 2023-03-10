<template>
  <div class="invoice-body">
    <div class="px-2 py-3">
      <!-- tabla de detalle de pago -->
      <div class="relative">
        <ReciboFormat v-if="type == 'recibos' && document" />
        <VentaFormat v-if="type == 'ventas' && document" />
      </div>
      <!-- tabla de productos si tiene una venta relacionada -->
    </div>
  </div>
</template>

<script>

import { useRoute } from "vue-router";
import useImpresiones from "../composables/useImpresiones";
import ReciboFormat from "./ReciboFormat.vue";
import VentaFormat from "./VentaFormat.vue";
export default {
  setup() {
    const route = useRoute();
    const type = route.params.type;
    const { document } = useImpresiones();
    return {
      type,
      document,
    };
  },
  components: { ReciboFormat, VentaFormat },
};
</script>

<style scoped>
.invoice-body {
  border-bottom: 3px solid #ffb600;
}
</style>
