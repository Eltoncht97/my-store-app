<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Nombre</th>
      <th scope="col" class="py-3 px-6">Status</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="category in categories"
        :key="category.id"
      >
        <CategoryRow :category="category" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import Table from '@/components/Table.vue'
import TableHead from '@/components/TableHead.vue'
import TableBody from '@/components/TableBody.vue'
import TableRow from '@/components/TableRow.vue'
import CategoryRow from './CategoryRow.vue'
import useCategories from '../composables/useCategories'

export default {
  components: { CategoryRow, Table, TableHead, TableBody, TableRow },
  setup() {
    
    const { categories } = useCategories()

    return {
      categories
    }
  }
}
</script>

<style>

</style>