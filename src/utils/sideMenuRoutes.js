export const menu = [
  {
    title: 'Categorias',
    icon: 'fa-solid fa-boxes-stacked',
    href: '/categorias',
  },
  {
    title: 'Productos',
    icon: 'fa-solid fa-box',
    href: '/productos',
  },
  {
    title: 'Ventas',
    icon: 'fa-solid fa-cart-shopping',
    href: '/ventas',
  },
  {
    title: 'Recibos',
    icon: 'fa-solid fa-receipt',
    href: '/recibos',
  },
  {
    title: 'Clientes',
    icon: 'fa-solid fa-user',
    href: '/clientes',
  },
  {
    title: 'Proveedores',
    icon: 'fa-solid fa-user-tie',
    href: '/proveedores',
  },
  {
    title: 'Ordenes de compra',
    icon: 'fa-solid fa-store',
    href: '/ordenes-de-compra',
  },
  {
    title: 'Usuarios',
    icon: 'fa-solid fa-users',
    href: '/usuarios',
  },
  {
    title: 'Cuentas',
    icon: 'fa-solid fa-wallet',
    child: [
      {
        href: '/cuentas-clientes',
        title: 'Cuentas Corrientes',
      },
      {
        href: '/cuentas-proveedores',
        title: 'Cuentas Proveedores',
      },
    ]
  },
  {
    title: 'Cajas',
    icon: 'fa fa-vault',
    href: '/cajas',
  },
  {
    title: 'Informes',
    icon: 'fa-solid fa-chart-simple',
    child: [
      {
        href: '/cajas/informe',
        title: 'Informe de cajas',
      },
    ]
  },

]