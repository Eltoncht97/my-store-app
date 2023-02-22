<template>
  <Card v-if="client">
    <CardHeader>
      <TitleText text="Crear Cliente" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Input label="Nombre" v-model="client.name" placeholder="Nombre..." />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.name.$error"
          >
            <span class="font-medium">El nombre es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Apellido"
            v-model="client.lastname"
            placeholder="Apellido..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.lastname.$error"
          >
            <span class="font-medium">El apellido es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Telefono"
            v-model="client.phone"
            placeholder="Telefono..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.phone.$error"
          >
            <span class="font-medium">El teléfono es requerido</span>
          </p>
        </div>
        <div>
          <Input
            label="Direccion"
            v-model="client.address"
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
          text="Guardar"
          @click="createClient(client)"
          :loading="isLoading"
        />
        <Button
          className="danger"
          text="Cancelar"
          to="clients-list"
          :loading="isLoading"
        />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import useClients from "../composables/useClients";
import TitleText from "@/components/TitleText.vue";

export default {
  components: { Card, CardHeader, CardBody, Input, Button, TitleText },
  setup() {
    const { client, createClient, resetClient, isLoading, v$ } = useClients();

    resetClient();

    return {
      client,
      createClient,
      isLoading,
      v$,
    };
  },
};
</script>
