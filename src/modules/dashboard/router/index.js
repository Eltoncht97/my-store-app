import clientsRouter from "@/modules/clients/router";
import productsRouter from "@/modules/products/router";
import categoriesRouter from "@/modules/categories/router";
import usersRouter from "@/modules/users/router";
import ventasRouter from "@/modules/ventas/router";
import cajasRouter from "@/modules/cajas/router";
import cuentasClientesRouter from "@/modules/cuentas-clientes/router";
import impresionesRouter from "@/modules/impresiones/router";
import recibosRouter from "@/modules/recibos/router";
import ordenesDeCompraRouter from "@/modules/ordenes-de-compra/router";
import proveedoresRouter from "@/modules/proveedores/router";
import cuentasProveedoresRouter from "@/modules/cuentas-proveedores/router";
import pagosRouter from "@/modules/pagos/router";

export default {
  name: "dashboard",
  component: () =>
    import(
      /* webpackChunkName: "Dashboard layout" */ "@/modules/dashboard/layouts/DashboardLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "home",
      component: () =>
        import(
          /* webpackChunkName: "Dashboard View" */ "@/modules/dashboard/views/DashboardView.vue"
        ),
    },
    {
      path: "/clientes/",
      ...clientsRouter,
    },
    {
      path: "/productos/",
      ...productsRouter,
    },
    {
      path: "/categorias/",
      ...categoriesRouter,
    },
    {
      path: "/usuarios/",
      ...usersRouter,
    },
    {
      path: "/ventas/",
      ...ventasRouter,
    },
    {
      path: "/cajas/",
      ...cajasRouter,
    },
    {
      path: "/cuentas-clientes/",
      ...cuentasClientesRouter,
    },
    {
      path: "/impresiones/",
      ...impresionesRouter,
    },
    {
      path: "/recibos/",
      ...recibosRouter,
    },
    {
      path: "/pagos/",
      ...pagosRouter,
    },
    {
      path: "/ordenes-de-compra/",
      ...ordenesDeCompraRouter,
    },
    {
      path: "/proveedores/",
      ...proveedoresRouter,
    },
    {
      path: "/cuentas-proveedores/",
      ...cuentasProveedoresRouter,
    },
  ],
};
