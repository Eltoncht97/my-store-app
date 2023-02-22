<template>
  <Card v-if="user">
    <CardHeader>
      <TitleText text="Editar Usuario" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <Input label="Nombre" placeholder="Nombre..." v-model="user.name" />
        <Input
          label="Username"
          placeholder="Username..."
          v-model="user.username"
        />
        <Input
          label="Email"
          type="email"
          placeholder="email@prueba.com"
          v-model="user.email"
        />
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Estado</label
          >
          <div class="flex">
            <div class="flex items-center mr-4">
              <input
                id="inline-radio"
                v-model="user.active"
                type="radio"
                value="true"
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
                v-model="user.active"
                type="radio"
                value="false"
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
