import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

import AppPublic from '../AppPublic.vue'
import AdminLogin from '../components/admin/AdminLogin.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'public',
    component: AppPublic
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'adminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Navigation Guard
let isAuthReady = false
router.beforeEach(async (to, from) => {
  if (!isAuthReady) {
    await new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        isAuthReady = true
        unsubscribe()
        resolve()
      })
    })
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    return { name: 'adminLogin' }
  } else if (to.name === 'adminLogin' && currentUser) {
    return { name: 'adminDashboard' }
  }
  
  return true // Explicitly return true to allow navigation
})

export default router
