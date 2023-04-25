import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/dashboard/post/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path:'/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path:'/AccessDenied',
    name: 'AccessDenied',
    component: () => import('@/views/error/AccessDenied.vue')
  },
  {
    // not found page
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminLayout,
    redirect: '/dashboard/post',
    children: [
      {
        path: '/dashboard/user',
        name: 'dasbhoard-user',
        component: () => import('@/views/dashboard/user/UserView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: 'dashboard/user',
        name: 'dashboard-user',
        component: () => import('@/views/dashboard/user/UserView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: '/dashboard/user/create',
        name: 'dashboard-user-create',
        component: () => import('@/views/dashboard/user/CreateUser.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: '/dashboard/user/edit/:id',
        name: 'dashboard-user-edit',
        component: () => import('@/views/dashboard/user/EditUser.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: '/dashboard/user/ResetPassword/:id',
        name: 'dashboard-user-resetPassword',
        component: () => import('@/views/dashboard/user/ResetPassword.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: '/dashboard/post',
        name: 'dashboard-post',
        component: PostView,
        meta: {
          requiresAuth: true,
          roles: ['Admin', 'User']
        },
      },
      {
        path: '/dashboard/myProfile',
        name: 'myprofile',
        component: () => import('@/views/dashboard/MyProfile.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin', 'User']
        }
      },
      {
        path: '/dashboard/changePassword',
        name: 'changePassword',
        component: () => import('@/views/dashboard/ChangePassword.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin', 'User']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  const loggedIn = localStorage.getItem('token');
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!loggedIn){
      next('/login', {query: {to: to.path}});
    } else {
    const user = JSON.parse(localStorage.getItem('user'));
    if(to.matched.some(record => record.meta.roles && record.meta.roles.includes(user.role))) {
      next();
    }
     else{
      next('/AccessDenied');
     }
    }
  }else{
    next();
  }
})

export default router
