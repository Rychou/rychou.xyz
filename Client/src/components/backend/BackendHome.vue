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
            <router-link :to="{path:'/backend/editArticle/'+scope.row.id,params:{id:scope.row.id}}">
                <el-button
                type="text"
                size="small">
                编辑
                </el-button>
            </router-link>
            <el-button
                type="text"
                size="small"
                @click="deleteArticle(scope.row.id,scope.row.title)">
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
        this.getArticleList();
    },
    methods:{
        deleteArticle(id,title){
            this.$confirm('你确定要删除文章《'+title+'》？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                axios({
                    method:'post',
                    url:'http://120.79.88.123:8000/article/delete',
                    data:{id}
                }).then(res=>{
                    if(res.data.deleteState)
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        })
                    else 
                        this.$message({
                            type:'warn',
                            message:'删除失败！'
                        })
                    this.getArticleList()
                }).catch(err=>console.log(err)) 
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        getArticleList(){
            axios.get('http://120.79.88.123:8000/article/getArticleList')
            .then(response=>{
                this.ArticleList=[...response.data]
            }).catch(err=>{
                console.log(err)
            })
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
