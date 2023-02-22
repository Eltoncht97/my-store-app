export default {
  name: 'clients',
  component: () => import(/* webpackChunkName: "Clients layout" */ '@/modules/clients/layouts/ClientsLayout.vue'),
  children: [
    {
      path: '',
      name: 'clients-list',
      component: () => import(/* webpackChunkName: "ClientList View" */ '@/modules/clients/views/ClientList.vue'),
    },
    {
      path: '/clientes/crear',
      name: 'client-create',
      component: () => import(/* webpackChunkName: "ClientCreate view" */ '@/modules/clients/views/ClientCreate.vue'),
    },
    {
      path: '/clientes/:id/editar',
      name: 'client-edit',
      component: () => import(/* webpackChunkName: "ClientEdit view" */ '@/modules/clients/views/ClientEdit.vue'),
    }
  ]
}