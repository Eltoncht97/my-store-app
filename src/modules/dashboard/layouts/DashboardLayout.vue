<template>
  <div class="h-screen flex">
    <div :class="`md:block w-1/6 h-full bg-gray-900 ${open ? 'block' : 'hidden'}`">
      <div class="flex items-center justify-center mt-5 text-white">
        <router-link :to="{ name: 'venta-create' }" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span
            :class="`md:block self-center text-xl font-semibold whitespace-nowrap dark:text-white ${
              open ? 'block' : 'hidden'
            }`"
            >Pukis</span
          >
        </router-link>
      </div>
      <nav class="mt-12">
        <ul class="text-white">
          <li v-for="(item, index) in routes" :key="index" class="mb-4">
            <router-link
              :to="{name: item.route}"
              class="block px-6 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white rounded-full"
              @click="toggleSidebar"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="w-full md:w-5/6 p-4">
      <button class="md:hidden" @click="toggleSidebar">
        <svg class="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
          <path
            v-if="open"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
          />
          <path
            v-else
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
          />
        </svg>
      </button>
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import routes from "@/utils/routes";
export default {
  setup() {
    const open = ref(false);

    const items = [
      { id: 1, label: "Dashboard", route: "/" },
      {
        id: 2,
        label: "Clientes",
        route: "/clientes",
        roles: ["user", "admin"],
      },
      {
        id: 3,
        label: "Cuentas Clientes",
        route: "/cuentas-clientes",
        roles: ["user", "admin"],
      },
    ];

    const toggleSidebar = () => {
      open.value = !open.value;
    };

    return {
      items,
      open,
      toggleSidebar,
      routes,
    };
  },
};
</script>

<style>
/* @media (max-width: 768px) {
  .md:block {
    display: none;
  }
  .md:hidden {
    display: block;
  }
} */
</style>
