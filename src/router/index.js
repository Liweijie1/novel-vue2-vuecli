import Vue from 'vue'
import VueRouter from 'vue-router'
import BookShelfView from '../views/BookShelfView.vue'
import BookCityView from '../views/BookCity/BookCity.vue'
import FemaleChannelView from '../views/BookCity/FemaleChannelView.vue'
import MaleChannelView from '../views/BookCity/MaleChannelView.vue'
import BenefitView from '../views/BenefitView.vue'
import BookDetail from '../views/BookDetail.vue'
import MyView from '../views/MyView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect :'/book-shelf'
  },
  {
    path:"/book-city",
    redirect :'/male-channel'
  },
  {
    path: '/book-shelf',
    component: BookShelfView
  },
  {
    path: '/book-city',
    component: BookCityView,
    children:[
      { path: '/female-channel', component : FemaleChannelView},
      { path: '/male-channel', component : MaleChannelView},
    ]
  },
  {
    path: '/benefit',
    component: BenefitView
  },
  {
    path: '/my',
    component: MyView
  },
  {
    path: '/book-detail',
    component: BookDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
