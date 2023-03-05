<template>
  <Table>
    <TableHead>
      <th scope="col" class="py-3 px-6">Codigo</th>
      <th scope="col" class="py-3 px-6">Nombre</th>
      <th scope="col" class="py-3 px-6">Categoria</th>
      <th scope="col" class="py-3 px-6">Stock</th>
      <th scope="col" class="py-3 px-6">Costo</th>
      <th scope="col" class="py-3 px-6">Ganancia</th>
      <th scope="col" class="py-3 px-6">Precio</th>
      <th scope="col" class="py-3 px-6 text-center">Opciones</th>
    </TableHead>
    <TableBody>
      <TableRow v-for="product in products" :key="product.id">
        <ProductRow :product="product" />
      </TableRow>
    </TableBody>
  </Table>
</template>

<script>
import Table from "@/components/Table.vue";
import TableHead from "@/components/TableHead.vue";
import TableBody from "@/components/TableBody.vue";
import TableRow from "@/components/TableRow.vue";
import ProductRow from "./ProductRow.vue";
import useProducts from "../composables/useProducts";

export default {
  components: { ProductRow, TableRow, TableBody, TableHead, Table },
  setup() {
    const { products } = useProducts();

    return {
      products,
    };
  },
};
</script>

<style></style>
