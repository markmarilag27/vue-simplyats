export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "applicant" */ '../views/Applicant.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]
