<template>
  <div class="flex-1">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">
        Pukis
      </h2>

      <p class="mt-3 text-gray-500 dark:text-gray-300">
        Iniciar sesión con tu cuenta
      </p>
    </div>

    <div class="mt-8">
      <form @submit.prevent="onSubmit">
        <div>
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >Email</label
          >
          <input
            type="email"
            v-model="userForm.email"
            placeholder="example@example.com"
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div class="mt-6">
          <label class="text-sm text-gray-600 dark:text-gray-200"
            >Contraseña</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Tu Contraseña"
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            v-model="userForm.password"
          />
        </div>

        <div class="mt-6">
          <button
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";

import Swal from "sweetalert2";

export default {
  setup() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const userForm = ref({
      email: "elton@admin.com",
      password: "Abc123",
    });

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value);

        if (!ok) {
          return Swal.fire("Error", message, "error");
        }

        router.push({ name: "venta-create" });
      },
    };
  },
};
</script>
