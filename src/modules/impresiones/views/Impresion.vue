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
          <Button text="Volver" type="danger" />
          <Button text="Imprimir" @click="print" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImpresion from "../components/HeaderImpresion.vue";
import BodyImpresion from "../components/BodyImpresion.vue";
import Button from "@/components/Button.vue";
import FooterImpresion from "../components/FooterImpresion.vue";
import { Printd } from "printd";

export default {
  components: {
    HeaderImpresion,
    BodyImpresion,
    FooterImpresion,
    Button,
  },
  methods: {
    print() {
      const d = new Printd();

      const styles = [
        // 'http://localhost:8080/#/css/app.css',
        "https://cdn.tailwindcss.com",
        `
        div {
          background-color: red;
        }
        `
        // 'https://ranz-sistema.herokuapp.com/css/app.css',
        // 'https://ranz-sistema.herokuapp.com/css/pace.min.css'
      ];

      d.print(document.getElementById("invoice"), styles);
    },
  },
};
</script>

<style scoped>
.invoice-box {
  background-color: white;
  margin: auto;
  padding: 15px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}
</style>
