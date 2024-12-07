import Vue from 'vue'
import VueRouter from 'vue-router'
import BookShelfView from '../views/BookShelfView.vue'
import BookCityView from '../views/BookCity/BookCity.vue'
import FemaleChannelView from '../views/BookCity/FemaleChannelView.vue'
import MaleChannelView from '../views/BookCity/MaleChannelView.vue'
import BenefitView from '../views/BenefitView.vue'
import BookDetail from '../views/BookDetail.vue'
import MyView from '../views/MyView.vue'
import NovelContentView from '../views/NovelContentView.vue'
import ContentsView from '../views/ContentsView.vue'
import LoginView from '../views/LoginView.vue'
import ChartsView from '../views/Charts/ChartView.vue'
import FemaleChart from '../views/Charts/FemaleChart.vue'
import MaleChart from '../views/Charts/MaleChart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/book-shelf',
    meta: { showNav: true }
  },
  {
    path: "/book-city",
    redirect: '/male-channel',
    meta: { showNav: true }
  },
  {
    path: "/chart",
    redirect: '/female-chart',
  },
  {
    path: '/book-shelf',
    component: BookShelfView,
    meta: { showNav: true }
  },
  {
    path: '/book-city',
    component: BookCityView,
    meta: { showNav: true },
    children: [
      {
        path: '/female-channel', component: FemaleChannelView,
        meta: { showNav: true }
      },
      {
        path: '/male-channel', component: MaleChannelView,
        meta: { showNav: true }
      },
    ],
  },
  {
    path: '/benefit',
    component: BenefitView,
    meta: { showNav: true }
  },
  {
    path: '/my',
    component: MyView,
    meta: { showNav: true }
  },
  {
    path: '/book-detail',
    component: BookDetail
  },
  {
    path: '/novel-content',
    component: NovelContentView
  },
  {
    path: '/novel-contents',
    component: ContentsView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/chart',
    component: ChartsView,
    children: [
      {
        path: '/female-chart', component: FemaleChart,
      },
      {
        path: '/male-chart', component: MaleChart,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
