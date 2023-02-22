<template>
  <Card>
    <CardHeader>
      <TitleText text="Recibos" />
      <router-link
        :to="{ name: 'recibo-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nuevo Recibo
      </router-link>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterRecibos" />
      <RecibosTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from '@/components/Card.vue'
import CardHeader from '@/components/CardHeader.vue'
import CardBody from '@/components/CardBody.vue'
import TitleText from '@/components/TitleText.vue'
import useRecibos from '../composables/useRecibos'
import SearchInput from '@/components/SearchInput.vue'
import RecibosTable from '../components/RecibosTable.vue'

export default {
  components: { Card, CardHeader, CardBody, RecibosTable, TitleText, SearchInput },
  setup() {
    const { loadRecibos, filterRecibos } = useRecibos()
    
    loadRecibos()

    return {
      filterRecibos
    }
  },
}
</script>