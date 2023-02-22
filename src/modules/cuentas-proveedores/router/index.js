export default {
  name: "cuentas-proveedores",
  component: () =>
    import(
      /* webpackChunkName: "Cuentas Proveedores layout" */ "@/modules/cuentas-proveedores/layouts/CuentasProveedoresLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "cuentas-proveedores-list",
      component: () =>
        import(
          /* webpackChunkName: "CuentasProveedoresList View" */ "@/modules/cuentas-proveedores/views/CuentasProveedoresList.vue"
        ),
    },
    {
      path: "/cuentas-proveedores/:id",
      name: "cuenta-proveedor-show",
      component: () =>
        import(
          /* webpackChunkName: "CuentaProveedorShow View" */ "@/modules/cuentas-proveedores/views/CuentaProveedorShow.vue"
        ),
    },
  ],
};
