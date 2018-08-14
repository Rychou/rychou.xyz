<template>
    <el-menu
      :default-active="$route.path"
      mode="vertical"
      class="menu"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="Rychou" @click="$router.push('/')">
        <div class="avatar">
          <img src="/static/img/avatar.jpg" alt="">
        </div>
        <div>
          <span style="text-shadow:black 0.2em 0.2em 0.3em">Rychou</span>
        </div>
      </div>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/backend">后台管理</el-menu-item>
      <el-footer>
        <a href="http://github.com/xxxsimons">
          <i class="iconfont icon-github" style="color:#fff;fons-size:1.5em;cursor:pointer"></i>
        </a>
      </el-footer>
    </el-menu>
</template>

<script>
export default {
}
</script>

<style>
.menu{
  height: 100vh;
  text-align: center;
}
.Rychou{
  cursor: pointer;
  margin: 30px 0;
  color: #fff;
}
.avatar{
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.avatar img{
  width: 100px;
  height: 100px;
  border: 2px solid #fff;
  border-radius: 50%;
}
</style>
