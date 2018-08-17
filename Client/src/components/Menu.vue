<template>
    <el-menu
      :default-active="$route.path"
      class="menu"
      :router="true"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="Rychou" @click="$router.push('/')">
        <div class="avatar">
          <img src="/static/img/avatar.jpg" alt="">
        </div>
        <div v-if="!isCollapse">
          <span style="text-shadow:black 0.2em 0.2em 0.3em">Rychou</span><br>
          <span style="text-shadow:black 0.2em 0.2em 0.3em">准大三前端一枚</span>
        </div>
      </div>
      <el-menu-item index="/">
        <i class="iconfont icon-yemian"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="">
        <i class="iconfont icon-aixin"></i>
        <span slot="title">
          <a href="../../static/two_year/index.html">两周年</a>
        </span>
        </el-menu-item>
      <el-menu-item index="/backend">
        <i class="iconfont icon-iconfontguanlixitong"></i>
        <span slot="title">后台管理</span>
      </el-menu-item>
      <el-footer class="menu-footer">
        <span v-for="(item,index) in menuFooter" :key="index">
          <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
            <a :href="item.link">
              <i class="iconfont" :class="item.icon" style="color:#fff;cursor:pointer"></i>
            </a>
          </el-tooltip>
        </span>
      </el-footer>
      <button @click="collapse">折叠</button>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuFooter:[
        {title:'Github',link:"http://github.com/xxxsimons",icon:'icon-github'},
        {title:'思否',link:"https://segmentfault.com/u/xxxsimons",icon:'icon-sf'}
      ]
    };
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  watch: {
    isCollapse(newVal,old){
      let width = newVal?64:200
      this.$emit('test',width)
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  &:not(.el-menu--collapse){
    width: 200px;
  }
  position: fixed;
  border: none;
  height: 100vh;
  text-align: center;
  .Rychou {
    cursor: pointer;
    margin: 30px 0;
    color: #fff;
    .avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .avatar img {
      width: 60%;
      height: 60%;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }
  .menu-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap
  }
}

a {
  color: #fff;
}

.iconfont {
  font-size: 1.5em;
  margin: 0 5px;
}

</style>
