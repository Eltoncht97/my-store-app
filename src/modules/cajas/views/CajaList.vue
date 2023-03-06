<template>
  <Card>
    <CardHeader>
      <TitleText text="Cajas" />
    </CardHeader>
    <CardBody>
      <!-- <SearchInput @on:filter="filterCajas" /> -->
      <CajasTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
// import SearchInput from '@/components/SearchInput.vue'
import CajasTable from "../components/CajasTable.vue";
import useCajas from "../composables/useCajas";

export default {
  components: { Card, CardHeader, CardBody, CajasTable, TitleText },
  setup() {
    const { loadCajas } = useCajas();

    loadCajas();
  },
};
</script>
