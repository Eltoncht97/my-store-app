<template>
  <div class="h-screen flex uppercase">
    <sidebar-menu
      @update:collapsed="onToggleCollapse"
      :menu="menu"
      :collapsed="true"
      :relative="true"
    >
      <template v-slot:header
        ><div class="flex items-center justify-center my-5 text-white">
          <router-link :to="{ name: 'venta-create' }" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              :class="`h-6 ${!isCollapsed && 'mr-3'} sm:h-9`"
              alt="Flowbite Logo"
            />
            <span
              :class="`md:block self-center text-xl font-semibold whitespace-nowrap dark:text-white`"
              v-if="!isCollapsed"
              >Pukiss</span
            >
          </router-link>
        </div></template
      >
    </sidebar-menu>
    <div class="w-full main_content">
      <Navbar />
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { menu } from "@/utils/sideMenuRoutes";
import { SidebarMenu } from "vue-sidebar-menu";
import Navbar from '@/modules/dashboard/components/Navbar.vue'
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  components: {
    SidebarMenu,
    Navbar
  },
  setup() {
    const isCollapsed = ref(true);
    return {
      menu,
      isCollapsed,
      onToggleCollapse: () => {
        console.log(`se hace toggle`);
        isCollapsed.value = !isCollapsed.value;
      },
    };
  },
  // setup() {
  //   const open = ref(false);

  //   const items = [
  //     { id: 1, label: "Dashboard", route: "/" },
  //     {
  //       id: 2,
  //       label: "Clientes",
  //       route: "/clientes",
  //       roles: ["user", "admin"],
  //     },
  //     {
  //       id: 3,
  //       label: "Cuentas Clientes",
  //       route: "/cuentas-clientes",
  //       roles: ["user", "admin"],
  //     },
  //   ];

  //   const toggleSidebar = () => {
  //     open.value = !open.value;
  //   };

  //   return {
  //     items,
  //     open,
  //     toggleSidebar,
  //     routes,
  //   };
  // },
};
</script>

<style scoped>
.main_content {
  max-width: calc(100% - 68px);
}
</style>
