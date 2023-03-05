<template>
  <Card v-if="client">
    <CardHeader>
      <TitleText text="Editar Cliente" />
    </CardHeader>
    <CardBody>
      <Loading v-if="isLoading" />
      <template v-else>
        <ClientForm cols="2" />
        <div class="py-2">
          <Button
            text="Guardar"
            @click="updateClient()"
            :loading="isLoadingButton"
          />
          <Button className="danger" text="Cancelar" to="clients-list" />
        </div>
      </template>
    </CardBody>
  </Card>
</template>

<script>
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import ClientForm from "../components/ClientForm.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useClients from "../composables/useClients";

export default {
  params: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
    CardHeader,
    CardBody,
    TitleText,
    Button,
    Loading,
    ClientForm,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { loadClient, client, updateClient, v$ } = useClients();
    const { isLoading, isLoadingButton } = useUI();

    loadClient(id);

    return {
      client,
      isLoading,
      isLoadingButton,
      v$,
      updateClient,
    };
  },
};
</script>
