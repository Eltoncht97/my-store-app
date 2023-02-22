<template>
  <div class="flex items-center justify-center p-2">
    <v-pagination
      v-model="page"
      :pages="pagesCount"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { ref } from '@vue/reactivity';
import useProducts from '../composables/useProducts';
export default {
  components: {
    VPagination,
  },
  setup() {
    const page = ref(1)

    const {loadProducts, pagesCount} = useProducts()

    return {
      page,
      pagesCount,
      updateHandler: () => loadProducts(page.value)
    };
  },
};
</script>

<style></style>
