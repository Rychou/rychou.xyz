import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '@/components/Home'
import NewArticle from '@/components/backend/NewArticle'
import ArticleList from '@/components/ArticleList'
import Article from '@/components/Article'
import BackendHome from '@/components/backend/BackendHome'
import EditArticle from '@/components/backend/EditArticle'
import Login from '@/components/user/Login'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/',
        name: 'ArticleList',
        component: ArticleList
      },
      {
        path: '/article/:id',
        component: Article
      },
      {
        path: '/backend',
        name:'backend',
        component: BackendHome,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/backend/newArticle',
        name: 'newArticle',
        component: NewArticle,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/backend/editArticle/:id',
        component: EditArticle,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/user/login',
        component: Login
      }
    ]
  }, ]
})

router.beforeEach((to, from, next) => {
  console.log('token->%o',store.state.token)
  let token = store.state.token;
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/user/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }else{
    next();
  }
})

export default router