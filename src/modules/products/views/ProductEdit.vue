<template>
  <Card v-if="product">
    <CardHeader>
      <TitleText text="Editar Producto" />
    </CardHeader>
    <CardBody>
      <ProductForm />
      <div class="py-2">
        <Button
          text="Guardar"
          @click="updateProduct()"
          :loading="isLoadingButton"
        />
        <Button className="danger" text="Cancelar" to="products-list" />
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
import Button from "@/components/Button.vue";
import ProductForm from "../components/ProductForm.vue";
import useProducts from "../composables/useProducts";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, TitleText, Button, ProductForm },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { product, loadProduct, updateProduct } = useProducts();
    const { isLoadingButton } = useUI();

    loadProduct(id);

    return {
      product,
      isLoadingButton,
      updateProduct,
    };
  },
};
</script>
