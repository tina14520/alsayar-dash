import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'trips',
        component: () => import('@/views/Trips.vue')
      },
      {
        path: 'drivers',
        component: () => import('@/views/Drivers.vue')
      },
      {
        path: 'passengers',
        component: () => import('@/views/Passengers.vue')
      },
      {
        path: 'reports',
        component: () => import('@/views/Reports.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      },
      {
      path: 'account',
      component: () => import('@/views/Account.vue')
    },
    {
      path: 'country',
      component: () => import('@/views/Country.vue')
    },
    {
      path: 'triptype',
      component: () => import('@/views/TripType.vue')
    },
    {
      path: 'voucher',
      component: () => import('@/views/Voucher.vue')
    },
    {
      path: 'payment',
      component: () => import('@/views/Payment.vue')
    }
    ]
  },
  {
    path: '/dashboard/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/dashboard/signup',
    name: 'Sign Up',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/dashboard/forgot-password',
    name: 'Forgot Password',
    component: () => import('@/views/ForgotPassword.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
