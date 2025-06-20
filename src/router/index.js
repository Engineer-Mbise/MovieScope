import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomeComponent.vue'
import PlayerComponent from '../components/PlayerComponent.vue'
import AboutUs from '../components/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/player/:id',
      name: 'player',
      component: PlayerComponent
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs
    }
  ]
})

export default router