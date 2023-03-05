<template>
  <div class="flex items-center justify-center p-2">
    <v-pagination
      v-model="pagination.currentPage"
      :pages="pagination.totalPages"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import useUI from "@/modules/dashboard/composables/useUI";

export default {
  components: {
    VPagination,
  },
  emits: ["on:updatePage"],
  setup(props, { emit }) {
    const { pagination } = useUI();
    return {
      pagination,
      updateHandler: () => emit("on:updatePage"),
    };
  },
};
</script>

<style></style>
