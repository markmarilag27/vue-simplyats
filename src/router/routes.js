import jobs from './jobs'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "applicant" */ '@/views/Applicant.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import(/* webpackChunkName: "job" */ '@/views/Job/index.vue'),
    meta: { requiresAuth: true },
    children: jobs
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: { requiresAuth: false }
  }
]
