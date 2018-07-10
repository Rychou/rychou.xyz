import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewArticle from '@/components/backend/NewArticle'
import ArticleList from '@/components/ArticleList'
import Article from '@/components/Article'
import BackendHome from '@/components/backend/BackendHome'
import EditArticle from '@/components/backend/EditArticle'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/',
          name:'ArticleList',
          component:ArticleList
        },
        {
          path: '/article/:id',
          component: Article
        },
        {
          path:'/backend',
          component:BackendHome
        },
        {
          path:'/backend/newArticle',
          name:'newArticle',
          component: NewArticle
        },
        {
          path:'/backend/editArticle/:id',
          component: EditArticle
        },
      ]
    },
  ]
})
