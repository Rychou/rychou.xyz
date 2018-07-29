<template>
  <div>
      <div v-for="(article,index) in ArticleList" :key="index" >
        <div class="card">
                <el-card :body-style="{ padding: '10px' }">
                  <div slot="header" class="clearfix">
                    <h1>
                      <router-link :to="{path:'/article/'+article.id,params:{id:article.id}}">{{article.title}}</router-link>
                    </h1>
                  </div>
                  <div style="padding: 14px;">
                    <div class="ql-container ql-snow" style="border:none">
                        <div class="ql-editor">
                            <div class="article-content" v-html="article.content">{{getContent(index)}}</div>
                        </div>
                    </div>
                    <router-link :to="{path:'/article/'+article.id,params:{id:article.id}}"><el-button class="readmore" type="info" round size="mini">Read More</el-button></router-link>
                    <hr>
                    <div class="bottom clearfix">
                      <el-tag size="mini">{{article.author}}</el-tag>
                      <el-tag  size="mini" type="info">{{ formatDate(article.create_time) }}</el-tag>
                    </div>
                  </div>
                </el-card>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "@/axios";
import marked from "marked";
import { formatDate,sortByCreateTime } from "../utils.js";
export default {
  data() {
    return {
      ArticleList: []
    };
  },
  methods: {
    getContent(index) {
      let content = this.ArticleList[index].content;
      let len = content.length;
      if (len > 100)//缩略显示的长度
        this.ArticleList[index].content = content.substr(content, 100) + "...";
    },
    formatDate
  },
  created() {
    axios
      .getArticleList()
      .then(response => {
        this.ArticleList = response.data.sort(sortByCreateTime);
        for (var i in this.ArticleList) {
          this.ArticleList[i].content = marked(this.ArticleList[i].content, {
            sanitize: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    marked
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 300px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card {
  margin-bottom: 10px;
  overflow: hidden;
}
.article-content {
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.readmore {
  background: #33a3dc;
  border: none;
  color: #fff;
}
.readmore:hover {
  background: #2c86b3;
}
</style>


