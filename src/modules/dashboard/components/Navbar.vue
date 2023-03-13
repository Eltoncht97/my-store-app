<template>
  <Navbar>
    <template #logo>
      <h2 class="text-lg"><strong>Pukis</strong></h2>
    </template>
    <template #right-side>
      <dropdown :text="username">
        <list-group>
          <list-group-item v-on:click="logout">
            <template #prefix>
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
            Cerrar Sesion
          </list-group-item>
        </list-group>
      </dropdown>
    </template>
  </Navbar>
</template>

<script>
import useAuth from "@/modules/auth/composables/useAuth";
import { Dropdown, ListGroup, ListGroupItem, Navbar } from "flowbite-vue";

export default {
  components: {
    Dropdown,
    ListGroup,
    ListGroupItem,
    Navbar,
  },
  setup() {
    const { username, logout } = useAuth();

    return {
      username,
      logout,
    };
  },
};
</script>
