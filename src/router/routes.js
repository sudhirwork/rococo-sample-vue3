const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SigninPage.vue') },
      {
        name: 'signup',
        path: '/signup',
        component: () => import('pages/SignupPage.vue'),
      },
      {
        name: 'signin',
        path: '/signin',
        component: () => import('pages/SigninPage.vue'),
      },
      {
        name: 'forget-password',
        path: '/forget-password',
        component: () => import('pages/ForgetPasswordPage.vue'),
      },
      {
        name: 'forget-password',
        path: '/forget-password',
        component: () => import('pages/ForgetPasswordPage.vue'),
      },
      {
        name: 'reset-password',
        path: '/reset-password',
        component: () => import('src/pages/ResetpasswordPage.vue'),
      },
      {
        name: 'dashboard',
        meta: { requiresAuth: true },
        path: '/dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
