export default {
  name: 'module',
  component: () => import(/* webpackChunkName: "Module layout" */ '@/modules/module/layouts/ModuleLayout.vue'),
  children: [
  ]
}