import axios from 'axios'
import store from './store/index'
import router from './router'

//创建axios实例
var isDev = process.env.NODE_ENV == 'development' //判断开发环境
var instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080' : 'http://120.79.88.123:8080',
  timeout: 5000, //请求超过5秒即超时返回错误
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
});
//request拦截器
instance.interceptors.request.use(
  config => {
      console.log('req->')
    //判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
        console.log(store.state.token)
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({ //跳转到登录页面
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return Promise.reject(error.response);
  }
);

export default {
  //获取文章列表
  getArticleList() {
    return instance.get('/api/article/getArticleList')
  },
  // 根据文章id获取文章
  getArticleById(id) {
    return instance.get('/api/article/getArticleById?id='+id)
  },
  // 更新文章信息
  updateArticle(data){
    return instance.post('/api/backend/updateArticle',data)
  },
  newArticle(data){
    return instance.post('/api/backend/newArticle',data)
  },
  deleteArticle(data){
    return instance.post('/api/backend/deleteArticle',data)
  },
  //用户注册
  userRegister(data) {
    return instance.post('/api/user/register', data);
  },
  //用户登录
  userLogin(data) {
      console.log(data)
    return instance.post('/api/user/login', {userName:data.userName,password:data.password});
  },
  //获取用户
  getUser() {
    return instance.get('/api/user');
  },
  //删除用户
  delUser(data) {
    return instance.post('/api/delUser', data);
  }
}
