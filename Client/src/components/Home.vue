<template>
    <el-container class="container">
            <el-aside :width="`${asideWidth}px`" class="aside" ><my-menu v-on:test="getAsideWidth"></my-menu></el-aside>
            <el-container class="main">
              <el-main style="transition:all .5s">
                <router-view style="width:80vw"></router-view>
              </el-main>
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
  },
  data(){
    return{
      asideWidth:200
    }
  },
  methods: {
    getAsideWidth(e){
      this.asideWidth=e;
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    display: flex;
    .aside{
      height: 100vh;
    }
    .main{
      transition: all .5s
    }
  }
  .el-container  .el-main {
    color: #333;
    padding: 30px;
    overflow: visible;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

</style>
