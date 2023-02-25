<template>
  <Card>
    <CardHeader>
      <TitleText :text="title" />
    </CardHeader>
    <CardBody>
      <Loading v-if="!proveedor" />
      <div class="grid gap-6 mb-6 md:grid-cols-2" v-else>
        <div>
          <Input
            label="Nombre"
            v-model="proveedor.name"
            placeholder="Nombre..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.name.$error"
          >
            <span class="font-medium">El nombre es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="CUIT"
            v-model="proveedor.cuit"
            placeholder="xx-xxxxxxxx-x"
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.cuit.$error"
          >
            <span class="font-medium">El CUIT es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Teléfono"
            v-model="proveedor.phone"
            placeholder="Teléfono..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.phone.$error"
          >
            <span class="font-medium">El telefono es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Direccion"
            v-model="proveedor.address"
            placeholder="Direccion..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.address.$error"
          >
            <span class="font-medium">La dirección es requerida</span>
          </p>
        </div>
      </div>
      <div class="py-2">
        <Button
          v-if="routeName.includes('edit')"
          text="Guardar"
          @click="updateProveedor()"
        />
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
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import useProveedores from "../composables/useProveedores";
import { computed } from "@vue/runtime-core";
export default {
  components: { Card, CardBody, CardHeader, TitleText, Input, Button, Loading },
  setup() {
    const route = useRoute();
    const {
      resetProveedor,
      proveedor,
      createProveedor,
      v$,
      loadProveedor,
      updateProveedor,
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
      v$,
      createProveedor,
      updateProveedor,
    };
  },
};
</script>
