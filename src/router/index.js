import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/admin/post/PostView.vue'

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
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    redirect: '/admin/post',
    children: [
      {
        path: '/admin/user',
        name: 'admin-user',
        component: () => import('@/views/admin/user/UserView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        path: '/admin/post',
        name: 'admin-post',
        component: PostView,
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
      next('/login');
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
