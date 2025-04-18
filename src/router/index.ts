import { createRouter, createWebHistory } from 'vue-router'
import SimpleTestView from '../views/SimpleTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'simpleTest',
      component: SimpleTestView,
    },
    {
      path: '/errorTest',
      name: 'errorTest',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ErrorTestView.vue'),
    },
  ],
})

export default router
