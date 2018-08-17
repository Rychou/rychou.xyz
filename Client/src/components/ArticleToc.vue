<template>
  <div class="toc-container">
    <a-anchor>
      <a-anchor-link :href="`#toc${index}`" v-for="(item,index) in toc" :key="index" :title="item" />
    </a-anchor>
  </div>
</template>

<script>
import { Anchor } from 'ant-design-vue'
console.log(Anchor)
export default {
  name: "article-toc",
  components: {
    'AAnchor':Anchor,
    'AAnchorLink':Anchor.Link
  },
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
        element.id = 'toc'+index
        this.toc.push(element.innerText);
      });
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
    a{
      color: rgb(240, 116, 15);
      &:hover{
        color: red;
        text-decoration: underline;
      }
    }
  }
}
</style>
