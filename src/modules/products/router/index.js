export default {
  name: 'products',
  component: () => import(/* webpackChunkName: "Products layout" */ '@/modules/products/layouts/ProductsLayout.vue'),
  children: [
    {
      path: '',
      name: 'products-list',
      component: () => import(/* webpackChunkName: "ProductList View" */ '@/modules/products/views/ProductList.vue'),
    },
    {
      path: '/productos/crear',
      name: 'product-create',
      component: () => import(/* webpackChunkName: "ProductCreate view" */ '@/modules/products/views/ProductCreate.vue'),
    },
    {
      path: '/productos/:id/editar',
      name: 'product-edit',
      component: () => import(/* webpackChunkName: "ProductEdit view" */ '@/modules/products/views/ProductEdit.vue'),
    }
  ]
}