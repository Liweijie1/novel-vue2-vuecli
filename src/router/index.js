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
import ClassificationView from '../views/Classification/ClassificationView.vue'
import FemaleClassification from '../views/Classification/FemaleClassification.vue'
import MaleClassification from '../views/Classification/MaleClassification.vue'
import SearchView from '../views/SearchView.vue'
import BookListView from '../views/BookListView.vue'
import ReadHistory from '../views/ReadHistory.vue'

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
    redirect: '/male-chart',
  },
  {
    path: "/classification",
    redirect: '/male-classification',
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
  {
    path: '/classification',
    component: ClassificationView,
    children: [
      {
        path: '/female-classification', component: FemaleClassification,
      },
      {
        path: '/male-classification', component: MaleClassification,
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
    path: '/search',
    component: SearchView
  },
  {
    path: '/book-list',
    component: BookListView
  },
  {
    path: '/read-history',
    component: ReadHistory
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
