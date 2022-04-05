import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddClient from '@/views/AddClientView.vue'
import ListClient from '@/views/ListClientsView.vue'
import AddInstructor from '@/views/AddInstructorView.vue'
import ListInstructor from '@/views/ListInstructorsView.vue'

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
    },
    {
      path: '/addinstructor',
      name: 'Add Instructor',
      component: AddInstructor
    },
    {
      path: '/listinstructors',
      name: 'List Instuctors',
      component: ListInstructor
    }
  ]
})

export default router