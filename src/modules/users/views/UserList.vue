<template>
  <Card>
    <CardHeader>
      <TitleText text="Usuarios" />
      <router-link
        :to="{ name: 'user-create' }"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Nuevo Usuario
      </router-link>
    </CardHeader>
    <CardBody>
      <SearchInput @on:filter="filterUsers" />
      <UsersTable />
    </CardBody>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import CardHeader from "@/components/CardHeader.vue";
import CardBody from "@/components/CardBody.vue";
import TitleText from "@/components/TitleText.vue";
import SearchInput from "@/components/SearchInput.vue";
import UsersTable from "../components/UsersTable.vue";
import useUsers from "../composables/useUsers";

export default {
  components: { Card, CardHeader, CardBody, UsersTable, TitleText, SearchInput },
  setup() {
    const { loadUsers, filterUsers } = useUsers();

    loadUsers();

    return {
      filterUsers
    }
  },
};
</script>
