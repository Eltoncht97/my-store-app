export default {
  name: 'ventas',
  component: () => import(/* webpackChunkName: "Categories layout" */ '@/modules/ventas/layouts/VentasLayout.vue'),
  children: [
    {
      path: '',
      name: 'ventas-list',
      component: () => import(/* webpackChunkName: "VentasList View" */ '@/modules/ventas/views/VentaList.vue'),
    },
    {
      path: '/ventas/:id',
      name: 'venta-show',
      component: () => import(/* webpackChunkName: "VentaShow view" */ '@/modules/ventas/views/VentaShow.vue'),
    },
    {
      path: '/ventas/crear',
      name: 'venta-create',
      component: () => import(/* webpackChunkName: "VentaCreate view" */ '@/modules/ventas/views/VentaCreate.vue'),
    },
    // {
    //   url para pagina que muestre todos los productos de una categoria 
    //   path: '/catergorias/:id/productos',
    //   name: 'category-products',
    //   component: 
    // },
  ]
}