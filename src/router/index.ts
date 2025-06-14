import { createRouter, createWebHistory } from 'vue-router'
import SimpleTestView from '../views/SimpleTestView.vue'
import ErrorTestView from '../views/ErrorTestView.vue'
import ShowVarsView from '../views/ShowVarsView.vue'
import DependentQueriesView from '../views/DependentQueriesView.vue'
import PaginatedQueryView from '../views/PaginatedQueryView.vue'
import InfiniteQueryView from '@/views/InfiniteQueryView.vue'
import MutationView from '@/views/MutationView.vue'

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
      component: ErrorTestView,
    },
    {
      path: '/showVars',
      name: 'showVars',
      component: ShowVarsView,
    },
    {
      path: '/dependentQueries',
      name: 'dependentQueries',
      component: DependentQueriesView,
    },
    {
      path: '/paginatedQuery',
      name: 'paginatedQuery',
      component: PaginatedQueryView,
    },
    {
      path: '/infiniteQuery',
      name: 'infiniteQuery',
      component: InfiniteQueryView,
    },
    {
      path: '/mutation',
      name: 'mutation',
      component: MutationView,
    },
  ],
})

export default router
