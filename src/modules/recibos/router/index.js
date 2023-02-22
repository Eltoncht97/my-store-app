export default {
  name: "recibos",
  component: () =>
    import(
      /* webpackChunkName: "Recibos layout" */ "@/modules/recibos/layouts/RecibosLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "recibos-list",
      component: () =>
        import(
          /* webpackChunkName: "Recibos list" */ "@/modules/recibos/views/ReciboList.vue"
        ),
    },
    {
      path: "/recibos/crear",
      name: "recibo-create",
      component: () =>
        import(
          /* webpackChunkName: "Recibo Create" */ "@/modules/recibos/views/ReciboCreate.vue"
        ),
    },
  ],
};
