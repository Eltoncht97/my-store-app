<template>
  <Card v-if="client">
    <CardHeader>
      <TitleText text="Editar Cliente" />
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <template v-else>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Input
              label="Nombre"
              v-model="client.name"
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
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Estado</label
            >
            <div class="flex">
              <div class="flex items-center mr-4">
                <input
                  id="inline-radio"
                  v-model="client.active"
                  type="radio"
                  :value="true"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Activo</label
                >
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  v-model="client.active"
                  type="radio"
                  :value="false"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-2-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Inactivo</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="py-2">
          <Button
            text="Guardar"
            @click="updateClient(client)"
            :loading="isLoading"
          />
          <Button
            className="danger"
            text="Cancelar"
            to="clients-list"
            :loading="isLoading"
          />
        </div>
      </template>
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Input from "@/components/Input.vue";
import TitleText from "@/components/TitleText.vue";
import useClients from "../composables/useClients";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
    CardHeader,
    CardBody,
    Input,
    TitleText,
    Button,
    Loading,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { getClient, client, updateClient, v$ } = useClients();
    const { isLoading } = useUI();

    getClient(id);

    return {
      client,
      isLoading,
      updateClient,
      v$,
    };
  },
};
</script>
