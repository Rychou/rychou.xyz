<template>
  <div class="toc-container">
    <div class="toc-list">
      <div v-for="(item,index) in toc" :key="index">
        <a href="javascript:void(0)" @click="goAnchor(`#anchor-${index}`)" >
          {{item}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "article-toc",
  data() {
    return {
      toc: []
    };
  },
  mounted() {
    setTimeout(() => this.getToc(), 1000);
  },
  methods: {
    getToc() {
      let toc = document.querySelectorAll(".article-body h1");
      console.log(toc);
      toc.forEach((element,index) => {
        element.id = 'anchor-'+index
        this.toc.push(element.innerText);
      });
    },
    goAnchor(selector) {
      console.log(selector)
        let anchor = document.querySelector(selector)
        console.log(anchor)
        document.documentElement.scrollTop = anchor.offsetTop
    }
  }
};
</script>

<style scoped lang="scss">
.toc-container {
  width: 15vw;
  transition: all .5s;
  margin-left: 10px;
  .toc-list{
    position: fixed;
    width: 10vw;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0 0 5px;
    word-wrap: break-word;
    background-color: #fff;
    z-index: 999;
    a{
      color: rgb(4, 20, 24);
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
