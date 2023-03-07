export default {
  name: "pagos",
  component: () =>
    import(
      /* webpackChunkName: "Pagos layout" */ "@/modules/pagos/layouts/PagosLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "pagos-list",
      component: () =>
        import(
          /* webpackChunkName: "Pagos list" */ "@/modules/pagos/views/PagoList.vue"
        ),
    },
    {
      path: "/pagos/:id",
      name: "pago-show",
      component: () =>
        import(
          /* webpackChunkName: "Pago Show" */ "@/modules/pagos/views/PagoShow.vue"
        ),
    },
    {
      path: "/pagos/crear",
      name: "pago-create",
      component: () =>
        import(
          /* webpackChunkName: "Pago Create" */ "@/modules/pagos/views/PagoCreate.vue"
        ),
    },
  ],
};
