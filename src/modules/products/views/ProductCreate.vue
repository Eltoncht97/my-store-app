<template>
  <Card v-if="product">
    <CardHeader>
      <TitleText text="Nuevo Producto" />
    </CardHeader>
    <CardBody>
      <ProductForm />
      <div class="py-2">
        <Button
          text="Guardar"
          @click="createProduct()"
          :loading="isLoadingButton"
        />
        <Button className="danger" text="Cancelar" to="products-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import useProducts from "../composables/useProducts";
import TitleText from "@/components/TitleText.vue";
import Button from "@/components/Button.vue";
import ProductForm from "../components/ProductForm.vue";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: { Card, CardHeader, CardBody, TitleText, Button, ProductForm },
  setup() {
    const { product, createProduct, resetProduct } = useProducts();
    const { isLoadingButton } = useUI();

    resetProduct();

    return {
      product,
      isLoadingButton,
      createProduct,
    };
  },
};
</script>
