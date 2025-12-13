import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchResults from '../views/SearchResults.vue'
import AccommodationDetail from '../views/AccommodationDetail.vue'
import BookingConfirmation from '../views/BookingConfirmation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'TravelBook - Find Your Perfect Getaway'
    }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    meta: {
      title: 'Search Results - TravelBook'
    }
  },
  {
    path: '/accommodation/:id',
    name: 'AccommodationDetail',
    component: AccommodationDetail,
    props: true,
    meta: {
      title: 'Accommodation Details - TravelBook'
    }
  },
  {
    path: '/booking/:id',
    name: 'BookingConfirmation',
    component: BookingConfirmation,
    props: true,
    meta: {
      title: 'Booking Confirmation - TravelBook'
    }
  },
  // Optional: Add a 404 page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - TravelBook'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'TravelBook - Booking Platform'
  next()
})

export default router