<template>
  <Table class="overflow-x-auto overflow-y-auto relative">
      <TableHead>
          <th scope="col" class="py-3 px-6">Nombre</th>
          <th scope="col" class="py-3 px-6">Email</th>
          <th scope="col" class="py-3 px-6">Roles</th>
          <th scope="col" class="py-3 px-6">Status</th>
          <th scope="col" class="py-3 px-6 text-center">Opciones</th>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="user in users"
          :key="user.id"
        >
          <UserRow :user="user" />
        </TableRow>
      </TableBody>
  </Table>
</template>

<script>
import UserRow from './UserRow.vue'
import useUsers from '../composables/useUsers'
import TableRow from '@/components/TableRow.vue'
import TableBody from '@/components/TableBody.vue'
import TableHead from '@/components/TableHead.vue'
import Table from '@/components/Table.vue'

export default {
  components: { UserRow, TableRow, TableBody, TableHead, Table },
  setup() {
    
    const { users } = useUsers()

    return {
      users
    }
  }
}
</script>

<style>

</style>