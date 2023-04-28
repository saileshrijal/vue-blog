import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/dashboard/post/PostView.vue'

const routes = [
  {
    path:'/',
    name: 'blogLayout',
    component: () => import('@/layouts/BlogLayout.vue'),
    children: [
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
        path: '/post/:slug',
        name: 'post',
        component: () => import('@/views/PostView.vue')
      },
      {
        path: '/category/:id',
        name: 'category',
        component: () => import('@/views/CategoryView.vue')
      }
    ]
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
        path: '/dashboard/post/create',
        name: 'dashboard-post-create',
        component: () => import('@/views/dashboard/post/CreatePost.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin', 'User']
        }
      },
      {
        path: '/dashboard/post/edit/:id',
        name: 'dashboard-post-edit',
        component: () => import('@/views/dashboard/post/EditPost.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin', 'User']
        }
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
      },
      {
        path:'/dashboard/category',
        name: 'dashboard-category',
        component: () => import('@/views/dashboard/category/CategoryView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path:'/dashboard/category/create',
        name: 'dashboard-category-create',
        component: () => import('@/views/dashboard/category/CreateCategory.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path:'/dashboard/category/edit/:id',
        name: 'dashboard-category-edit',
        component: () => import('@/views/dashboard/category/EditCategory.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
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
  //if loggedIn, skip login page
  if(to.path == '/login' && loggedIn){
    next('/dashboard');
  }
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
