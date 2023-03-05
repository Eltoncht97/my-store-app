<template>
  <Card>
    <CardHeader>
      <TitleText text="Crear Categoria" />
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <template v-else>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Input label="Nombre" v-model="category.name" />
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
            :loading="isLoadingButton"
          />
          <Button className="danger" text="Cancelar" to="categories-list" />
        </div>
      </template>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import Loading from "@/components/Loading.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import useCategories from "../composables/useCategories";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: { Card, CardHeader, CardBody, Input, Button, TitleText, Loading },
  setup() {
    const { category, createCategory, resetCategory, v$ } = useCategories();
    const { isLoading, isLoadingButton } = useUI();

    resetCategory();

    return {
      category,
      isLoading,
      isLoadingButton,
      v$,
      createCategory,
    };
  },
};
</script>
