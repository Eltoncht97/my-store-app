export default {
  name: 'cuentas',
  component: () => import(/* webpackChunkName: "Cuentas Clientes layout" */ '@/modules/cuentas-clientes/layouts/CuentasClientesLayout.vue'),
  children: [
    {
      path: '',
      name: 'cuentas-list',
      component: () => import(/* webpackChunkName: "CuentasClientesList View" */ '@/modules/cuentas-clientes/views/CuentaClienteList.vue'),
    },
    {
      path: '/cuentas-clientes/:id',
      name: 'cuenta-show',
      component: () => import(/* webpackChunkName: "CuentaClienteShow View" */ '@/modules/cuentas-clientes/views/CuentaClienteShow.vue'),
    }
  ]
}