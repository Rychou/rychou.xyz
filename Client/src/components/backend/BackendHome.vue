<template>
    <el-table
        class="table"
      :data="ArticleList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button
            type="text"
            size="small">
            编辑
            </el-button>
            <el-button
            type="text"
            size="small">
            删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
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
    methods:{
        deleteArticle(){
            
        }
    }
}
</script>

<style scoped>
    .table{
        border-radius: 5px;
        padding: 24px
    }
</style>
