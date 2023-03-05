<template>
  <Card v-if="category">
    <CardHeader>
      <TitleText text="Editar Categoria" />
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
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Estado</label
          >
          <div class="flex">
            <div class="flex items-center mr-4">
              <input
                id="inline-radio"
                v-model="category.active"
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
                v-model="category.active"
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
          @click="updateCategory(category)"
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
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import useCategories from "../composables/useCategories";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Card, CardHeader, CardBody, TitleText, Input, Button },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { loadCategory, category, updateCategory, isLoading, v$ } =
      useCategories();

      loadCategory(id);

    return {
      category,
      isLoading,
      v$,

      updateCategory,
    };
  },
};
</script>
