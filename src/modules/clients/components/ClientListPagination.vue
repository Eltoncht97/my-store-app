<template>
  <div class="flex items-center justify-center p-2">
    <v-pagination
      v-model="currentPage"
      :pages="totalPages"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import useClients from "@/modules/clients/composables/useClients";

export default {
  components: {
    VPagination,
  },
  setup() {
    const { loadClients, totalPages, currentPage } = useClients();

    return {
      totalPages,
      currentPage,
      updateHandler: () => loadClients(currentPage.value),
    };
  },
};
</script>

<style></style>
