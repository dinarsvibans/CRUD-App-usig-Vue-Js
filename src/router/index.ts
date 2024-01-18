import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkersView from '../views/Workers/WorkersView.vue'
import CreateWorker from '../views/Workers/CreateWorker.vue'
import WorkerProfile from '../views/Workers/WorkersProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/workers',
      name: 'workers',
      component: WorkersView
    },
    {
      path: '/workers/create',
      name: 'workersCreate',
      component: CreateWorker
    },
    {
      path: '/workers/:id',
      name: 'workersProfile',
      component: WorkerProfile,
    }
  ]
})

export default router
