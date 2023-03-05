<template>
  <Card v-if="category">
    <CardHeader>
      <TitleText text="Crear Categoria" />
    </CardHeader>
    <CardBody>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Input
            label="Nombre"
            v-model="category.name"
            placeholder="Category..."
          />
          <p
            class="mt-2 text-sm text-red-600 dark:text-red-500"
            v-if="v$.name.$error"
          >
            <span class="font-medium">El nombre es requerido</span>
          </p>
        </div>
      </div>
      <div class="py-2">
        <Button
          text="Guardar"
          @click="createCategory()"
          :loading="isLoading"
        />
        <Button
          className="danger"
          text="Cancelar"
          to="categories-list"
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
import useCategories from "../composables/useCategories";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import TitleText from "@/components/TitleText.vue";

export default {
  components: { Card, CardHeader, CardBody, Input, Button, TitleText },
  setup() {
    const { category, createCategory, resetCategory, isLoading, v$ } =
      useCategories();

    resetCategory();

    return {
      category,
      isLoading,
      createCategory,
      v$,
    };
  },
};
</script>
