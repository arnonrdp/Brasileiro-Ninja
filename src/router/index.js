import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/bancos',
      name: 'bancos',
      component: () => import('../views/BancosView.vue')
    },
    {
      path: '/cep',
      name: 'cep',
      component: () => import('../views/CEPView.vue')
    }
  ]
})

export default router
