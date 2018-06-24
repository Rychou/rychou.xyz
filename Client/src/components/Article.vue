<template>
    <div>
        <h1>{{article.create_time}}</h1>
        <div class="article">
        <h1>{{article.title}}</h1>
        <div class="ql-container ql-snow" style="border:none">
            <div class="ql-editor">
                <div v-html="article.content"></div>
            </div>
        </div>
        <hr>
        <el-tag type="success">{{article.author}}</el-tag>
    </div>
    </div>
    
</template>

<script>
import axios from 'axios'

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
    }
}
</script>

<style scoped>
    .article{
        background-color:#fff;
        border-radius: 3px;
        border: 1px solid #e1e1e1;
        padding: 12px;
        box-shadow: 1px;
    }
</style>
