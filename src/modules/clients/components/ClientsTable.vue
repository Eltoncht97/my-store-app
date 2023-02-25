<template>
  <template v-if="clients.length == 0">
    <div>No hay clientes clientes cargados</div>
  </template>
  <template v-else>
    <Table>
      <TableHead>
        <th scope="col" class="py-3 px-6">Nombre</th>
        <th scope="col" class="py-3 px-6">Telefono</th>
        <th scope="col" class="py-3 px-6">Direccion</th>
        <th scope="col" class="py-3 px-6 text-center">Opciones</th>
      </TableHead>
      <TableBody>
        <TableRow v-for="client in clients" :key="client.id">
          <ClientRow :client="client" />
        </TableRow>
      </TableBody>
    </Table>
  </template>
</template>

<script>
import Table from "@/components/Table.vue";
import TableHead from "@/components/TableHead.vue";
import TableBody from "@/components/TableBody.vue";
import TableRow from "@/components/TableRow.vue";
import ClientRow from "./ClientRow.vue";
import useClients from "../composables/useClients";

export default {
  components: { ClientRow, Table, TableHead, TableBody, TableRow },
  setup() {
    const { clients } = useClients();

    return {
      clients,
    };
  },
};
</script>

<style></style>
