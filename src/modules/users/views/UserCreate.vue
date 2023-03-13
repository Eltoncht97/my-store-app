<template>
  <Card v-if="user">
    <CardHeader>
      <TitleText text="Crear Usuario" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <Input
          label="Nombre Completo"
          placeholder="Nombre completo..."
          v-model="userForm.fullName"
        />
        <Input
          label="Email"
          type="email"
          placeholder="email@prueba.com"
          v-model="userForm.email"
        />
        <Input
          label="Contraseña"
          type="password"
          v-model="userForm.password"
          placeholder="********"
        />
        <div>
          <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Role
          </h3>
          <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value="gerente"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="userForm.roles"
                />
                <label
                  for="vue-checkbox-list"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Gerente</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  value="venta"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="userForm.roles"
                />
                <label
                  for="react-checkbox-list"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Venta</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="angular-checkbox-list"
                  type="checkbox"
                  value="user"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="userForm.roles"
                />
                <label
                  for="angular-checkbox-list"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Usuario</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="py-2">
        <Button
          text="Guardar"
          @click="createUser(userForm)"
          :loading="isLoading"
        />
        <Button
          className="danger"
          text="Cancelar"
          to="users-list"
          :loading="isLoading"
        />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import { ref } from "vue";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import useUsers from "../composables/useUsers";

export default {
  components: { Card, CardHeader, CardBody, TitleText, Input, Button },
  setup() {
    const { user, createUser, resetUser, isLoading } = useUsers();

    const userForm = ref({
      fullName: "",
      email: "",
      password: "",
      roles: []
    });

    resetUser();

    return {
      user,
      isLoading,
      createUser,
      userForm,
    };
  },
};
</script>
