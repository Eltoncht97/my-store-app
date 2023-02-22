<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Nombre</th>
      <th scope="col" class="py-3 px-6">Saldo</th>
      <th scope="col" class="py-3 px-6">Telefono</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="client in clients"
        :key="client.id"
      >
        <CuentaRow :client="client" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import CuentaRow from './CuentaRow.vue'
import useClients from '@/modules/clients/composables/useClients'
import Table from '@/components/Table.vue'
import TableHead from '@/components/TableHead.vue'
import TableBody from '@/components/TableBody.vue'
import TableRow from '@/components/TableRow.vue'

export default {
  components: { CuentaRow, Table, TableHead, TableBody, TableRow },
  setup() {
    
    const { clients } = useClients()

    return {
      clients
    }
  }
}
</script>