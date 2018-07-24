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
import axios from 'axios'
import marked from 'marked'
import {formatDate} from '@/utils.js'
import 'highlight.js/styles/vs2015.css'
 
export default {
    data(){
        return{
            article:{},
            compileMarkdown:''
        }
    },
    computed: {
        tags(){
            return typeof this.article.tags==='undefined'?[]:this.article.tags.split(',')
        }
    },
    beforeCreate () {
        console.log(this.$route.params.id)
        axios.get('http://120.79.88.123:8000/article/getArticleById?id='+this.$route.params.id)
            .then(response=>{
                this.article=response.data
                this.compileMarkdown=marked(this.article.content,{sanitize: true})
            }).catch(err=>{
                console.log(err)
            })
    },
    components: {
        marked
    },
    methods: {
        formatDate
    }
}
</script>

<style lang="scss">
  $color:#33a3dc;
    .article{
        background-color:#fff;
        border-radius: 3px;
        border: 1px solid #e1e1e1;
        padding: 24px;
        box-shadow: 1px;
        .article-description{
            color: gray
        }
        code{
            padding: 16px;
        }
        .article-body{
            img{
                width: 100%;
            }
            a{color: $color}
            table
            {
                border-collapse:collapse;
            }
            th{background-color: $color;}
            td{background-color: #eeeeee;padding: 0 12px;}
            table,th,td{
                border: 1px solid gray;
                    
            }
        }
    }
</style>
