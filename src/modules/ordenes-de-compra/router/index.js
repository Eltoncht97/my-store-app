export default {
  name: 'ordenes-de-compra',
  component: () => import(/* webpackChunkName: "Ordenes de Compra layout" */ '@/modules/ordenes-de-compra/layouts/OrdenesDeCompraLayout.vue'),
  children: [
    {
      path: '',
      name: 'ordenes-de-compra-list',
      component: () => import(/* webpackChunkName: "Ordenes de Compra List" */ '@/modules/ordenes-de-compra/views/OrdenesDeCompraList.vue'),
    },
    {
      path: '/ordenes-de-compra/nuevo',
      name: 'ordenes-de-compra-create',
      component: () => import(/* webpackChunkName: "Ordenes de Compra Create" */ '@/modules/ordenes-de-compra/views/OrdenesDeCompraCreate.vue'),
    },
    {
      path: '/ordenes-de-compra/:id',
      name: 'orden-de-compra-show',
      component: () => import(/* webpackChunkName: "Ordenes de Compra Show" */ '@/modules/ordenes-de-compra/views/OrdenDeCompraShow.vue'),
    }
  ]
}