import Vue from 'vue'
import VueRouter from 'vue-router'
import BookShelfView from '../views/BookShelfView.vue'
import BookCityView from '../views/BookCityView.vue'
import BenefitView from '../views/BenefitView.vue'
import MyView from '../views/MyView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/book-shelf',
    component: BookShelfView
  },
  {
    path: '/book-city',
    component: BookCityView
  },
  {
    path: '/benefit',
    component: BenefitView
  },
  {
    path: '/my',
    component: MyView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
