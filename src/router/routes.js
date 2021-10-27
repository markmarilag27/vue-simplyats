export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "applicant" */ '@/views/Applicant.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: { requiresAuth: false }
  }
]
