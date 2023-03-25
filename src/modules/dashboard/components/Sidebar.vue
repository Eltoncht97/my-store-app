<template>
  <sidebar-menu
    @update:collapsed="onToggleCollapse"
    :menu="menuSetup"
    :collapsed="true"
    :relative="true"
  >
    <template v-slot:header
      ><div class="flex items-center justify-center my-5 text-white">
        <router-link :to="{ name: 'venta-create' }" class="flex items-center">
          <img
            src="/pukis-icono.svg"
            :class="`h-6 ${!isCollapsed && 'mr-3'} sm:h-9 rounded-sm`"
            alt="Pukis Logo"
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
</template>

<script>
import { ref } from "vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { menu } from "@/utils/sideMenuRoutes";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  components: {
    SidebarMenu,
  },
  setup() {
    const isCollapsed = ref(true);
    const { userRoles } = useAuth();

    const menuSetup = menu.map((m) =>
      m.role && !userRoles.value.includes(m.role) ? { ...m, disabled: true } : m
    );
    return {
      menuSetup,
      isCollapsed,
      onToggleCollapse: () => {
        isCollapsed.value = !isCollapsed.value;
      },
    };
  },
};
</script>
