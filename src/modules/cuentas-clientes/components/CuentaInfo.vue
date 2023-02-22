<template>
  <div class="grid gap-6 mb-6 md:grid-cols-3">
    <div>
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Cliente</label
      >
      <p
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="date"
        id="first_name"
        readonly
      >
        {{ cuenta.client.lastname }} {{ cuenta.client.name }}
      </p>
    </div>
    <div>
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Saldo</label
      >
      <p
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="date"
        id="first_name"
        readonly
      >
        {{ cuenta.saldo }}
      </p>
    </div>
  </div>
</template>

<script>
import useCuentas from "../composables/useCuentas";
export default {
  setup() {
    const { cuenta } = useCuentas();

    return {
      cuenta,
    };
  },
};
</script>

<style></style>
