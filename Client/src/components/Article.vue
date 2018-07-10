<template>
    <div>
        <h1>{{ formatDate(article.create_time) }}</h1>
        <div class="article">
        <h1>{{article.title}}</h1>
        <p v-html="compileMarkdown" v-highlight></p>
        <hr>
        <el-tag type="success">{{article.author}}</el-tag>
    </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import {formatDate} from '@/utils.js'
 
export default {
    data(){
        return{
            article:{}
        }
    },
    mounted(){
        console.log(this.$route.params.id)
        axios.get('http://120.79.88.123:8000/article/getArticleById?id='+this.$route.params.id)
            .then(response=>{
                this.article=response.data
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
    },
    components: {
        marked
    },
    methods: {
        formatDate
    },
    computed: {
        compileMarkdown:function(){
            return marked(this.article.content,{sanitize: true})
        }
    }
}
</script>

<style scoped>
    .article{
        background-color:#fff;
        border-radius: 3px;
        border: 1px solid #e1e1e1;
        padding: 24px;
        box-shadow: 1px;
    }
</style>
