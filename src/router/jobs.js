export default [
  {
    path: 'create',
    name: 'jobs.create',
    component: () => import(/* webpackChunkName: "job-create" */ '@/views/Job/CreateJob.vue'),
    meta: { requiresAuth: true }
  }
]
