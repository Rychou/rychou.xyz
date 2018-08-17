<template>
    <div>
        <div class="article">
            <h1>{{article.title}}</h1>
            <div class="article-description">
                <el-tag size="small" v-for="(tag,index) in tags" :key="index" style="margin-right:3px">{{tag}}</el-tag>
                <span class="author" style="margin:0 10px;color:#2c86b3">{{article.author}}</span>
                <span class="post-time">
                    <i class="el-icon-date"></i>
                    {{formatDate(article.create_time)}}
                </span>
            </div>
            <hr>
            <br>
            <div class="article-body" >
              <div class="article-content" v-html="compileMarkdown" v-highlight></div>
              <article-toc class="article-toc" :toc="toc"></article-toc>
            </div>
        </div>
        <div id="gitalk-container"></div> 
    </div>
    
</template>

<script>
import axios from "@/axios";
import marked from "marked";
import { formatDate } from "@/utils.js";
import "highlight.js/styles/vs2015.css";
import ArticleToc from "./ArticleToc";

export default {
  data() {
    return {
      article: {},
      compileMarkdown: "",
      gitalk: new Gitalk({
        clientID: "e2bd0f9b2722aec0c6ad",
        clientSecret: "53835a03c25dd0886da48d665df21258f2b30177",
        repo: "xxxsimons.github.io",
        owner: "xxxsimons",
        admin: ["xxxsimons"],
        id: window.location.hash, // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      }),
      toc:[]
    };
  },
  computed: {
    tags() {
      return typeof this.article.tags === "undefined"
        ? []
        : this.article.tags.split(",");
    }
  },
  mounted() {
    axios
      .getArticleById(this.$route.params.id)
      .then(response => {
        this.article = response.data;
        document.title = response.data.title;
        this.gitalk.title = response.data.title;
        this.gitalk.render("gitalk-container");
      })
      .then(()=>{
        //解析markdown
        this.compileMarkdown = marked(this.article.content, { sanitize: true });
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    marked,
    ArticleToc
  },
  methods: {
    formatDate,
  }
};
</script>

<style lang="scss">
$color: #33a3dc;
.article {
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #e1e1e1;
  padding: 24px;
  box-shadow: 1px;
  .article-description {
    color: gray;
  }
  pre {
    code {
      padding: 16px;
    }
  }
  .article-body {
    display: flex;
    justify-content: space-between;
    .article-content {
      width: 60vw;
      img {
        width: 20%;
      }
      a {
        color: $color;
      }
      table {
        border-collapse: collapse;
      }
      th {
        background-color: $color;
      }
      td {
        background-color: #eeeeee;
        padding: 0 12px;
      }
      table,
      th,
      td {
        border: 1px solid gray;
      }
    }
  }
}
</style>
