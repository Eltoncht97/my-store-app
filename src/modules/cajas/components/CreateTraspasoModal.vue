<template>
  <Modal size="md" v-if="showModal" @close="$emit('on:close', 'newTraspaso')">
    <template #header>
      <div class="flex items-center text-lg">Nuevo Traspaso</div>
    </template>
    <template #body>
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Caja Emisor</label
          >
          <div class="flex">
            <v-select
              v-model="traspaso.emisor"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="cajasAbiertas"
              label="label"
            ></v-select>
          </div>
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.emisor.$error"
          >
            <span class="font-medium">La caja emisor es requerida</span>
          </p>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Caja Receptor</label
          >
          <div class="flex">
            <v-select
              v-model="traspaso.receptor"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
              :options="cajasAbiertas"
              label="label"
            ></v-select>
          </div>
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.receptor.$error"
          >
            <span class="font-medium">La caja receptor es requerida</span>
          </p>
        </div>
        <div>
          <Input
            label="Monto"
            placeholder="0"
            v-model="traspaso.total"
            type="number"
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.total.$error"
          >
            <span class="font-medium"
              >El monto es requerido y debe ser mayor a 0</span
            >
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button
          type="button"
          @click="$emit('on:close', 'newTraspaso')"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="launchCreateTraspaso"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Input from "@/components/Input.vue";
import { Modal } from "flowbite-vue";
import { onBeforeUpdate } from "vue";
import useCajas from "../composables/useCajas";

export default {
  components: { Modal, Input },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on:close"],
  setup(props, { emit }) {
    const { cajasAbiertas, traspaso, v$, createTraspaso, resetTraspaso } =
      useCajas();

    const launchCreateTraspaso = async () => {
      const resp = await createTraspaso();

      if (!resp.ok) return;

      emit("on:close", "newTraspaso");
    };

    onBeforeUpdate(() => {
      resetTraspaso();
    });

    return { cajasAbiertas, traspaso, v$, launchCreateTraspaso };
  },
};
</script>
