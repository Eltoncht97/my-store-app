<template>
  <div class="grid gap-6 mb-6 md:grid-cols-1">
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
</template>

<script>
import Input from "@/components/Input.vue";
import useClients from "../composables/useClients";

export default {
  components: {
    Input,
  },
  setup() {
    const { client, resetClient, v$ } = useClients();

    resetClient();

    return {
      client,
      v$,
    };
  },
};
</script>
