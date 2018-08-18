<template>
  <div class="directories-container">
    <div class="directories-list">
      <h2>目录</h2>
      <div :class="{'highlight-title':item.isActive}" v-for="(item,index) in directories" :key="index" style="padding: 5px 12px;">
        <a href="javascript:void(0)" @click="goAnchor(index)" >
          {{item.title}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-directories",
  props: {
    ArticleDirectories:{
      type:Array,
      default:[],
      require:true
    }
  },
  data() {
    return {
      // directories: this.ArticleDirectories
    };
  },
  computed: {
    directories(){
      return this.ArticleDirectories
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goAnchor(index) {
      document.documentElement.scrollTop = this.directories[index].offsetTop;
    },
    handleScroll(e) {
      let scrollTop = document.documentElement.scrollTop
      this.directories.forEach((element,index)=>{
        if((scrollTop+50)>=element.offsetTop){
          for(let i=0;i<index;i++){
            this.directories[i].isActive = false
          }
          element.isActive = true;
        }else{
          element.isActive = false;
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
.directories-container {
  width: 15vw;
  transition: all 0.5s;
  margin-left: 10px;
  .highlight-title {
    border-left: 3px solid rgb(15, 105, 223);
    background-color: rgb(243, 243, 243);
    z-index: -1;
    a{
      color: rgb(15, 105, 223)
    }
  }
  .directories-list {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    word-wrap: break-word;
    background-color: #fff;
    border-left: 1px solid rgb(236, 236, 236);
    z-index: 999;
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
