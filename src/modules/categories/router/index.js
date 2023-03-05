export default {
  name: 'categories',
  component: () => import(/* webpackChunkName: "Categories layout" */ '@/modules/categories/layouts/CategoriesLayout.vue'),
  children: [
    {
      path: '',
      name: 'categories-list',
      component: () => import(/* webpackChunkName: "CategoryList View" */ '@/modules/categories/views/CategoryList.vue'),
    },
    {
      path: '/categorias/crear',
      name: 'category-create',
      component: () => import(/* webpackChunkName: "CategoryCreate view" */ '@/modules/categories/views/CategoryCreate.vue'),
    },
    {
      path: '/categorias/:id/editar',
      name: 'category-edit',
      component: () => import(/* webpackChunkName: "CategoryEdit view" */ '@/modules/categories/views/CategoryEdit.vue'),
    },
  ]
}