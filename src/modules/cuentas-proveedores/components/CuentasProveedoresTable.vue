<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Nombre</th>
      <th scope="col" class="py-3 px-6">Direccion</th>
      <th scope="col" class="py-3 px-6">Telefono</th>
      <th scope="col" class="py-3 px-6">Saldo</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="proveedor in proveedores" :key="proveedor.id">
        <CuentaRow :proveedor="proveedor" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import CuentaRow from "./CuentaRow.vue";
import Table from "@/components/Table.vue";
import TableHead from "@/components/TableHead.vue";
import TableBody from "@/components/TableBody.vue";
import TableRow from "@/components/TableRow.vue";
import useProveedores from "@/modules/proveedores/composables/useProveedores";

export default {
  components: { CuentaRow, Table, TableHead, TableBody, TableRow },
  setup() {
    const { proveedores } = useProveedores();

    return {
      proveedores,
    };
  },
};
</script>
