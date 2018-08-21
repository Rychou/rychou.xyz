<template>
  <div>
    <div class="article">
      <h1>{{article.title}}</h1>
      <div class="article-description">
        <el-tag size="small"
                v-for="(tag,index) in tags"
                :key="index"
                style="margin-right:3px">{{tag}}</el-tag>
        <span class="author"
              style="margin:0 10px;color:#2c86b3">{{article.author}}</span>
        <span class="post-time">
          <i class="el-icon-date"></i>
          {{formatDate(article.create_time)}}
        </span>
        <span class="views">
          <i class="iconfont icon-views"></i>
          {{article.views}}
        </span>
      </div>
      <hr>
      <br>
      <div class="article-body">
        <div class="article-content">
          <div v-html="compileMarkdown"
               v-highlight></div>
          <div class="last-next">
            <div class="last"
                 v-if="article.lastArticle.title">
              <router-link :to="'/article/'+article.lastArticle.id">
                <i class="iconfont icon-left"></i>
                上一篇：{{article.lastArticle.title}}
              </router-link>
            </div>
            <div class="next"
                 v-if="article.nextArticle.title">
              <router-link :to="'/article/'+article.nextArticle.id">
                下一篇：{{article.nextArticle.title}}
                <i class="iconfont icon-right"></i>
              </router-link>
            </div>
          </div>
        </div>
        <article-directories :ArticleDirectories="directories"
                             class="article-directories"></article-directories>
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
import ArticleDirectories from "./ArticleDirectories";

export default {
  name: "article",
  components: {
    marked,
    ArticleDirectories
  },
  data () {
    return {
      article: {
        lastArticle: {},
        nextArticle: {}
      },
      directories: [],
      compileMarkdown: "",
      gitalk: new Gitalk({
        clientID: "e2bd0f9b2722aec0c6ad",
        clientSecret: "53835a03c25dd0886da48d665df21258f2b30177",
        repo: "xxxsimons.github.io",
        owner: "xxxsimons",
        admin: ["xxxsimons"],
        id: window.location.hash, // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      })
    };
  },
  computed: {
    tags () {
      return Object.prototype.toString.call(this.article.tags) === "[object Undefined]"
        ? []
        : this.article.tags.split(",");
    }
  },
  created () {
    this.initlizeData(this.$route.params.id);
  },
  beforeRouteUpdate (to, from, next) {
    this.initlizeData(to.params.id);
    next();
  },
  methods: {
    formatDate,
    initlizeData (id) {
      const data = {
        article: {
          lastArticle: {},
          nextArticle: {}
        },
        directories: [],
        compileMarkdown: "",
        gitalk: new Gitalk({
          clientID: "e2bd0f9b2722aec0c6ad",
          clientSecret: "53835a03c25dd0886da48d665df21258f2b30177",
          repo: "xxxsimons.github.io",
          owner: "xxxsimons",
          admin: ["xxxsimons"],
          id: window.location.hash, // Ensure uniqueness and length less than 50
          distractionFreeMode: false // Facebook-like distraction free mode
        })
      };
      axios
        .getArticleById(id)
        .then(response => {
          // 跳转后要将上一页和下一页数据重新初始化
          Object.assign(this, data);
          // 更新article
          Object.assign(this.article, response.data);
          // 更新目录
          setTimeout(() => this.getDirectories(), 100);
          // 设置标题
          document.title = response.data.title;
        })
        .then(() => {
          //解析markdown
          this.compileMarkdown = marked(this.article.content, {
            sanitize: true
          });
          document.documentElement.scrollTop = 0;
        })
        .then(() => {
          //  确保组件复用后，更新id和title，重新渲染gitalk
          document.getElementById('gitalk-container').innerHTML = ""// 清空gitalk，为了重新渲染
          this.gitalk.options.id = window.location.hash;
          this.gitalk.render("gitalk-container");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDirectories () {
      this.directories = [];
      let directories = document.querySelectorAll(".article-content h1");
      directories.forEach((element, index) => {
        element.id = "anchor-" + index;
        this.directories.push({
          title: element.innerText,
          offsetTop: element.offsetTop,
          isActive: false
        });
      });
    }
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
      .last-next {
        margin-top: 24px;
        .last {
          float: left;
        }
        .next {
          float: right;
        }
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
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
