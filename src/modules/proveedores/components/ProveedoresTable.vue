<template>
  <template v-if="proveedores.length == 0">
    <div>No hay proveedores cargados aun...</div>
  </template>
  <template v-else>
    <Table>
      <TableHead>
        <th scope="col" class="py-3 px-6">Nombre</th>
        <th scope="col" class="py-3 px-6">Direccion</th>
        <th scope="col" class="py-3 px-6">Telefono</th>
        <!-- <th scope="col" class="py-3 px-6">Saldo</th> -->
        <th scope="col" class="py-3 px-6 text-center">Opciones</th>
      </TableHead>
      <TableBody>
        <TableRow v-for="proveedor in proveedores" :key="proveedor.id">
          <ProveedorRow :proveedor="proveedor" />
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
import ProveedorRow from "./ProveedorRow.vue";
import useProveedores from "../composables/useProveedores";

export default {
  components: { ProveedorRow, Table, TableHead, TableBody, TableRow },
  setup() {
    const { proveedores } = useProveedores();

    return {
      proveedores,
    };
  },
};
</script>
