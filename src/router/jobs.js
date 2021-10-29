export default [
  {
    path: 'create',
    name: 'jobs.create',
    component: () => import(/* webpackChunkName: "job-create" */ '@/views/Job/CreateJob.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: ':uuid',
    name: 'jobs.edit',
    component: () => import(/* webpackChunkName: "job-edit" */ '@/views/Job/EditJob.vue'),
    meta: { requiresAuth: true }
  }
]
