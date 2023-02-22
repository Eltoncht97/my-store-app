export default {
  name: "users",
  component: () =>
    import(
      /* webpackChunkName: "Users layout" */ "@/modules/users/layouts/UsersLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "users-list",
      component: () =>
        import(
          /* webpackChunkName: "UserList View" */ "@/modules/users/views/UserList.vue"
        ),
    },
    {
      path: "/usuarios/crear",
      name: "user-create",
      component: () =>
        import(
          /* webpackChunkName: "UserCreate view" */ "@/modules/users/views/UserCreate.vue"
        ),
    },
    {
      path: "/usuarios/:id/editar",
      name: "user-edit",
      component: () =>
        import(
          /* webpackChunkName: "UserEdit view" */ "@/modules/users/views/UserEdit.vue"
        ),
    },
  ],
};
