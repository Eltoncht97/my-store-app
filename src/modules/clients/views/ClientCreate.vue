<template>
  <Card v-if="client">
    <CardHeader>
      <TitleText text="Crear Cliente" />
    </CardHeader>
    <CardBody>
      <ClientForm cols="2" />
      <div class="py-2">
        <Button
          text="Guardar"
          @click="createClient()"
          :loading="isLoadingButton"
        />
        <Button className="danger" text="Cancelar" to="clients-list" />
      </div>
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import Button from "@/components/Button.vue";
import TitleText from "@/components/TitleText.vue";
import ClientForm from "../components/ClientForm.vue";
import useUI from "@/modules/dashboard/composables/useUI";
import useClients from "../composables/useClients";

export default {
  components: {
    Button,
    Card,
    CardBody,
    CardHeader,
    ClientForm,
    TitleText,
  },
  setup() {
    const { isLoadingButton } = useUI();
    const { client, createClient, resetClient, v$ } = useClients();

    resetClient();

    return {
      client,
      isLoadingButton,
      v$,
      createClient,
    };
  },
};
</script>
