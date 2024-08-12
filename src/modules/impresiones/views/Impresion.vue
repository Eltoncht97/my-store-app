<template>
  <div class="container mx-auto">
    <div class="invoice-box" id="invoice">
      <HeaderImpresion />
      <BodyImpresion />
      <FooterImpresion />
    </div>
    <div class="my-4">
      <div class="col">
        <div class="button-group">
          <!-- <button @click="print" class="btn btn-primary">Imprimir</button> -->
          <!-- <Button text="Imprimir" @click="createVenta()" :loading="isLoading" /> -->

          <Button text="Imprimir" v-print="printObj" />
          <Button text="Volver" className="danger" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImpresion from "../components/HeaderImpresion.vue";
import BodyImpresion from "../components/BodyImpresion.vue";
import FooterImpresion from "../components/FooterImpresion.vue";
import Button from "@/components/Button.vue";
import print from "vue3-print-nb";
import { useRoute } from "vue-router";
import useImpresiones from "../composables/useImpresiones";

export default {
  components: {
    HeaderImpresion,
    BodyImpresion,
    FooterImpresion,
    Button,
  },
  directives: {
    print,
  },
  setup() {
    const route = useRoute();
    const { type, id } = route.params;
    const { loadDocument } = useImpresiones();

    loadDocument({ type, id });

    return {
      printObj: {
        id: "invoice",
        previewTitle: "print Title",
      },
    };
  },
};
</script>

<style scoped>
.invoice-box {
  background-color: white;
  /* margin: auto;
  padding: 15px; */
  width: 80mm;
  font-size: 12px;
  font-family: monospace, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}
</style>
