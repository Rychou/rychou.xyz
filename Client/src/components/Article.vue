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
            <div class="article-body" v-html="compileMarkdown" v-highlight></div>
        </div>
    </div>
    
</template>

<script>
import axios from "@/axios";
import marked from "marked";
import { formatDate } from "@/utils.js";
import "highlight.js/styles/vs2015.css";
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

var gitalk = new Gitalk({
  clientID: 'e2bd0f9b2722aec0c6ad',
  clientSecret: '326f591db410fc7db445b26f31bec3af25a6259d',
  repo: 'GitHub repo',
  owner: 'GitHub repo owner',
  admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
  id: location.pathname,      // Ensure uniqueness and length less than 50
  distractionFreeMode: false  // Facebook-like distraction free mode
})
export default {
  data() {
    return {
      article: {},
      compileMarkdown: ""
    };
  },
  computed: {
    tags() {
      return typeof this.article.tags === "undefined"
        ? []
        : this.article.tags.split(",");
    }
  },
  beforeCreate() {
    console.log(this.$route.params.id);
    axios
      .getArticleById(this.$route.params.id)
      .then(response => {
        console.log(response);

        this.article = response.data;
        this.compileMarkdown = marked(this.article.content, { sanitize: true });
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    marked
  },
  methods: {
    formatDate
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
  pre{
    code{
      padding: 16px;
    }
  }
  .article-body {
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
</style>
