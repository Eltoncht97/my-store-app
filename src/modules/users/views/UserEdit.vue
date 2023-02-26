<template>
  <Card v-if="user">
    <CardHeader>
      <TitleText text="Editar Usuario" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <Input label="Nombre" placeholder="Nombre completo..." v-model="user.fullName" />
        <Input
          label="Email"
          placeholder="email..."
          v-model="user.email"
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
                  value="admin"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="user.roles"
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
                  v-model="user.roles"
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
                  v-model="user.roles"
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
        <Button text="Guardar" @click="updateUser(user)" :loading="isLoading" />
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
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Button from "@/components/Button.vue";
import useUsers from "../composables/useUsers";
import Input from "@/components/Input.vue";
import TitleText from "@/components/TitleText.vue";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, Button, Input, TitleText },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { getUser, user, updateUser, isLoading } = useUsers();

    getUser(id);

    return {
      user,
      isLoading,
      updateUser,
    };
  },
};
</script>
