<template>
  <Card>
    <CardHeader>
      <TitleText text="Categorias" />
      <router-link
        :to="{ name: 'category-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nueva Categoria
      </router-link>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterCategories" />
      <CategoriesTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from '@/components/Card.vue'
import CardHeader from '@/components/CardHeader.vue'
import CardBody from '@/components/CardBody.vue'
import TitleText from '@/components/TitleText.vue'
import SearchInput from '@/components/SearchInput.vue'
import CategoriesTable from '../components/CategoriesTable.vue'
import useCategories from '../composables/useCategories'

export default {
  components: { Card, CardHeader, CardBody, CategoriesTable, TitleText, SearchInput },
  setup() {
    const { loadCategories, filterCategories } = useCategories()
    
    loadCategories()

    return {
      filterCategories
    }
  },
}
</script>