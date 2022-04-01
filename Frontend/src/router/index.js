import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddClient from '@/views/AddClientView.vue'
import ListClient from '@/views/ListClientsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addclient',
      name: 'Add Client',
      component: AddClient
    },
    {
      path: '/listclients',
      name: 'List Clients',
      component: ListClient
    }
  ]
})

export default router
