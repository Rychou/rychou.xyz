<template>
    <el-container>
            <el-aside width="200px" class="aside"><my-menu></my-menu></el-aside>
            <el-container>
              <el-main><router-view style="width:80vw"></router-view></el-main>
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
  .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-container  .el-main {
    color: #333;
    padding: 30px;
    margin-left: 200px;
    overflow: visible;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .aside{
    position: fixed;
    height: 100vh;
  }
</style>
