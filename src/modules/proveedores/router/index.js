export default {
  name: "proveedores",
  component: () =>
    import(
      /* webpackChunkName: "Proveedores layout" */ "@/modules/proveedores/layouts/ProveedoresLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "proveedores-list",
      component: () =>
        import(
          /* webpackChunkName: "Proveedores list" */ "@/modules/proveedores/views/ProveedoresList.vue"
        ),
    },
    {
      path: "/proveedores/nuevo",
      name: "proveedores-create",
      component: () =>
        import(
          /* webpackChunkName: "Proveedores create" */ "@/modules/proveedores/views/ProveedoresCreate.vue"
        ),
    },
    {
      path: "/proveedores/:id/editar",
      name: "proveedores-edit",
      component: () =>
        import(
          /* webpackChunkName: "Proveedores create" */ "@/modules/proveedores/views/ProveedoresCreate.vue"
        ),
    },
  ],
};
