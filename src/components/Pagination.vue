<template>
  <div class="flex items-center justify-center p-2">
    <v-pagination
      v-model="page"
      :pages="pageCount"
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
import useClients from '@/modules/clients/composables/useClients';
export default {
  components: {
    VPagination,
  },
  setup() {
    const page = ref(1)
    // const pageCount = ref(10)

    const {loadClients, pageCount} = useClients()

    return {
      page,
      pageCount,
      updateHandler: () => loadClients(page.value)
    };
  },
};
</script>

<style></style>
