<template>
  <Card>
    <CardHeader>
      <TitleText :text="title" />
    </CardHeader>
    <CardBody>
      <Loading v-if="!proveedor" />
      <NewProveedorForm v-else />
      <div class="py-2">
        <Button v-if="routeName.includes('edit')" text="Guardar" @click="updateProveedor()" />
        <Button v-else text="Guardar" @click="createProveedor()" />
        <Button className="danger" text="Cancelar" to="proveedores-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardBody from "@/components/CardBody.vue";
import CardHeader from "@/components/CardHeader.vue";
import TitleText from "@/components/TitleText.vue";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import useProveedores from "../composables/useProveedores";
import { computed } from "@vue/runtime-core";
import NewProveedorForm from "../components/NewProveedorForm.vue";
export default {
  components: { Card, CardBody, CardHeader, TitleText, Button, Loading, NewProveedorForm },
  setup() {
    const route = useRoute();
    const {
      createProveedor,
      updateProveedor,
      loadProveedor,
      resetProveedor,
      proveedor
    } = useProveedores();

    const title = computed(() => {
      if (route.name.includes("edit")) {
        return "Editar Proveedor";
      } else {
        return "Crear Proveedor";
      }
    });

    if (route.name.includes("edit")) {
      loadProveedor(route.params.id);
    } else {
      resetProveedor();
    }

    return {
      routeName: route.name,
      title,
      proveedor,
      createProveedor,
      updateProveedor,
    };
  },
};
</script>
