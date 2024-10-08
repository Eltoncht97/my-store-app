export default {
  name: 'module',
  component: () => import(/* webpackChunkName: "Impresiones layout" */ '@/modules/impresiones/layouts/ImpresionesLayout.vue'),
  children: [
    {
      path: ':type/:id',
      name: 'impresion-create',
      component: () => import(/* webpackChunkName: "Impresion view" */ '@/modules/impresiones/views/Impresion.vue'),
    }
  ]
}