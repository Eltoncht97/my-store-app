export default {
  name: 'cajas',
  component: () => import(/* webpackChunkName: "Cajas layout" */ '@/modules/cajas/layouts/CajasLayout.vue'),
  children: [
    {
      path: '',
      name: 'cajas-list',
      component: () => import(/* webpackChunkName: "CajasList View" */ '@/modules/cajas/views/CajaList.vue'),
    },
    {
      path: '/cajas/:id',
      name: 'caja-show',
      component: () => import(/* webpackChunkName: "CajasShow View" */ '@/modules/cajas/views/CajaShow.vue'),
    },
    {
      path: '/cajas/informe',
      name: 'caja-informe',
      component: () => import(/* webpackChunkName: "CajasShow View" */ '@/modules/cajas/views/CajaInforme.vue'),
    },
  ]
}