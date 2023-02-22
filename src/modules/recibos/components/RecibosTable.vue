<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Fecha</th>
      <th scope="col" class="py-3 px-6">Cliente</th>
      <th scope="col" class="py-3 px-6">Metodo de Pago</th>
      <th scope="col" class="py-3 px-6">Total</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="recibo in recibos"
        :key="recibo.id"
      >
        <ReciboRow :recibo="recibo" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import Table from '@/components/Table.vue'
import TableHead from '@/components/TableHead.vue'
import TableBody from '@/components/TableBody.vue'
import TableRow from '@/components/TableRow.vue'
import ReciboRow from './ReciboRow.vue'
import useRecibos from '../composables/useRecibos'

export default {
  components: { ReciboRow, Table, TableHead, TableBody, TableRow },
  setup() {
    
    const { recibos } = useRecibos()

    return {
      recibos
    }
  }
}
</script>

<style>

</style>