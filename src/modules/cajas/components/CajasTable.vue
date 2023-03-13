<template>
  <template v-if="cajas.length == 0">
    <div>No hay cajas cargadas aun...</div>
  </template>
  <Table v-else>
    <TableHead>
      <th scope="col" class="py-3 px-6">Usuario</th>
      <th scope="col" class="py-3 px-6">Fecha de Creación</th>
      <th scope="col" class="py-3 px-6">Estado</th>
      <th scope="col" class="py-3 px-6">Total</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="caja in cajas"
        :key="caja.id"
      >
        <CajaRow :caja="caja" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import Table from '@/components/Table.vue'
import TableHead from '@/components/TableHead.vue'
import TableBody from '@/components/TableBody.vue'
import TableRow from '@/components/TableRow.vue'
import CajaRow from './CajaRow.vue'
import useCajas from '../composables/useCajas'

export default {
  components: { CajaRow, Table, TableHead, TableBody, TableRow },
  setup() {
    
    const { cajas } = useCajas()

    return {
      cajas
    }
  }
}
</script>

<style>

</style>