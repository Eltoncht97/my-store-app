<template>
  <Card>
    <CardHeader>
      <TitleText text="Ventas" />
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterVentas" />
      <VentasTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from '@/components/Card.vue'
import CardHeader from '@/components/CardHeader.vue'
import CardBody from '@/components/CardBody.vue'
import TitleText from "@/components/TitleText.vue";
import VentasTable from '../components/VentasTable.vue'
import useVentas from '../composables/useVentas'
import SearchInput from '@/components/SearchInput.vue';

export default {
  components: { Card, CardHeader, CardBody, VentasTable, TitleText, SearchInput },
  setup() {
    const { loadVentas, filterVentas } = useVentas()
    
    loadVentas()

    return {
      filterVentas
    }
  },
}
</script>