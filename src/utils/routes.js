const routes = [
  {
    label: "Clientes",
    route: "clients-list",
    icon: "fa-users",
    roles: ["admin", "venta"],
  },
  {
    label: "C. Corrientes",
    route: "cuentas-list",
    icon: "fa-vault",
  },
  {
    label: "Categorias",
    route: "categories-list",
    icon: "fa-palette",
  },
  {
    label: "Productos",
    route: "products-list",
    icon: "fa-rocket",
  },
  {
    label: "Ventas",
    route: "ventas-list",
    icon: "fa-cart-shopping",
  },
  {
    label: "Usuarios",
    route: "users-list",
    icon: "fa-cart-shopping",
    roles: ["admin"],
  },
  {
    label: "Cajas",
    route: "cajas-list",
    icon: "fa-vault",
  },
  {
    label: "Informe de Cajas",
    route: "caja-informe",
    icon: "fa-vault",
  },
  {
    label: "Recibos",
    route: "recibos-list",
    icon: "fa-vault",
  },
  {
    label: "Proveedores",
    route: "proveedores-list",
    icon: "fa-vault",
  },
  {
    label: "C. Proveedores",
    route: "cuentas-proveedores-list",
    icon: "fa-vault",
  },
  {
    label: "Ordenes de Compra",
    route: "ordenes-de-compra-list",
    icon: "fa-vault",
  },
];

export default routes;
