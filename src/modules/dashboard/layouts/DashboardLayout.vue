<template>
  <div class="h-screen flex uppercase">
    <Sidebar />
    <div class="w-full main_content">
      <Navbar />
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/modules/dashboard/components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style scoped>
.main_content {
  max-width: calc(100% - 68px);
}
</style>
