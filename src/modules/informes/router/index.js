export default {
  name: 'informes',
  component: () => import(/* webpackChunkName: "Informes layout" */ '@/modules/informes/layouts/InformesLayout.vue'),
  children: [
    {
      path: '/informes/caja',
      name: 'informe-caja',
      component: () => import(/* webpackChunkName: "Informe Caja View" */ '@/modules/cajas/views/CajaInforme.vue'),
    },
    {
      path: '/informes/ventas',
      name: 'informe-ventas',
      component: () => import(/* webpackChunkName: "Informe Ventas View" */ '@/modules/informes/views/InformeVentas.vue'),
    },
    {
      path: '/informes/compras',
      name: 'informe-compras',
      component: () => import(/* webpackChunkName: "Informe Caja View" */ '@/modules/cajas/views/CajaInforme.vue'),
    },
  ]
}