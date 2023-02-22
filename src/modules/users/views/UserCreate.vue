<template>
  <Card v-if="user">
    <CardHeader>
      <TitleText text="Crear Usuario" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <Input label="Nombre Completo" placeholder="Nombre completo..." v-model="userForm.fullName" />
        <Input
          label="Email"
          type="email"
          placeholder="email@prueba.com"
          v-model="userForm.email"
        />
        <Input label="Contraseña" type="password" v-model="userForm.password" placeholder="********" />
      </div>
      <div class="py-2">
        <Button text="Guardar" @click="createUser(userForm)" :loading="isLoading" />
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
import { ref } from 'vue';
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
    });

    resetUser();

    return {
      user,
      isLoading,
      createUser,
      userForm
    };
  },
};
</script>
