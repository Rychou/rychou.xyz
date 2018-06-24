<template>
    <el-container>
            <el-container>
              <el-header><my-menu></my-menu></el-header>
              <el-main><router-view></router-view></el-main>
              <el-footer>Footer</el-footer>
            </el-container>
    </el-container>
</template>

<script>
import MyMenu from './Menu.vue'
import ArticleList from './ArticleList.vue'
export default {
  components:{
    MyMenu,
    ArticleList
  }
}
</script>

<style scoped>
  .el-header,.el-main,.el-footer{
    padding:0 200px;
  }
  .el-container{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-container  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding-top: 30px;
    padding-bottom: 30px;
    overflow: visible;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
