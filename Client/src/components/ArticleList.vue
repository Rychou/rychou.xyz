<template>
<div>
  <el-card>
    <div slot="header">
      <span>
        文章
      </span>
    </div>
    <div>
      <div >
          <el-row>
            <el-col :span="6" v-for="(article,index) in ArticleList" :key="index" :offset="1" style="margin-top:16px">
              <el-card :body-style="{ padding: '0px' ,height:'400px'}">
                <img class="image" src="https://s1.ax1x.com/2018/06/13/COgWHH.jpg" alt="">
                <div style="padding: 14px;">
                  <router-link :to="{path:'/article/'+article.id,params:{id:article.id}}">{{article.title}}</router-link>
                  <div class="bottom clearfix">
                    <time class="time">{{ article.create_time }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
    return {
      ArticleList:[]
          }
  },
  mounted(){
    axios.get('http://120.79.88.123:8000/article/getArticleList')
            .then(response=>{
                this.ArticleList=[...response.data]
                console.log(this.ArticleList)
            }).catch(err=>{
                console.log(err)
        })
  },
}
</script>

<style>
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
      clear: both
  }
</style>


