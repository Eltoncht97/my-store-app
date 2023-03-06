<template>
  <Card>
    <CardHeader>
      <TitleText :text="title" />
    </CardHeader>
    <CardBody>
      <Loading v-if="!proveedor" />
      <ProveedorForm v-else />
      <div class="py-2">
        <Button
          v-if="routeName.includes('edit')"
          text="Guardar"
          @click="updateProveedor()"
          :loading="isLoadingButton"
        />
        <Button
          v-else
          text="Guardar"
          @click="createProveedor()"
          :loading="isLoadingButton"
        />
        <Button className="danger" text="Cancelar" to="proveedores-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardBody from "@/components/CardBody.vue";
import CardHeader from "@/components/CardHeader.vue";
import TitleText from "@/components/TitleText.vue";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import ProveedorForm from "../components/NewProveedorForm.vue";
import useProveedores from "../composables/useProveedores";
import useUI from "@/modules/dashboard/composables/useUI";
export default {
  components: {
    Card,
    CardBody,
    CardHeader,
    TitleText,
    Button,
    Loading,
    ProveedorForm,
  },
  setup() {
    const route = useRoute();

    const {
      proveedor,
      createProveedor,
      updateProveedor,
      loadProveedor,
      resetProveedor,
    } = useProveedores();
    const { isLoadingButton } = useUI();

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
      isLoadingButton,
      proveedor,
      routeName: route.name,
      title,
      createProveedor,
      updateProveedor,
    };
  },
};
</script>
