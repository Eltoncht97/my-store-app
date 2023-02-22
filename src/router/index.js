import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'
import { createRouter, createWebHashHistory } from 'vue-router'

import authRouter from '../modules/auth/router'
import dashboardRouter from '../modules/dashboard/router'

const routes = [
  {
    path: '/',
    beforeEnter: [isAuthenticatedGuard],
    ...dashboardRouter,
  },
  {
    path: '/auth',
    ...authRouter,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
