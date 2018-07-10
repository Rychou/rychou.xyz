<template>
    <div class="form-container">
        <el-form ref="form" :model="article" label-width="80px" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input
                    placeholder="请输入标题"
                    v-model="article.title"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <editor @transferContent='getContent' :content="article.content"></editor>
            </el-form-item> 
            <el-form-item>
                <el-button @click="submitForm('form')">修改</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import Editor from './Editor.vue'
import axios from 'axios'

export default {
    name:'edit-article',
    data(){
        return{
            article:{},
            rules:{
                title:[
                    {required:true,message:'请输入标题',trigger: 'change'},
                ],
                content:[
                    {required:true,message:'请输入内容'}
                ]
            }
        }
    },
    components: {
      Editor  
    },
    mounted(){
        axios.get('http://120.79.88.123:8000/article/getArticleById?id='+this.$route.params.id)
            .then(response=>{
                this.article=response.data
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
    },
    methods: {
        submitForm(formName) {
          console.log(this.article)
          this.$refs[formName].validate((valid) => {
          if (valid) {
              axios({
                    method:'post',
                    url:'http://120.79.88.123:8000/article/updateArticle',
                    data:{
                        id:this.$route.params.id,
                        title:this.article.title,
                        content:this.article.content,
                        create_time:new Date(),
                        tags:'',
                        author:'rychou'
                    }
                }).then(response=>{
                    if (response.data.updateState){
                        this.$message({
                            message:'修改成功！',
                            type:'success'
                        })
                        this.$router.push('/backend')
                    }else this.$message({
                            message:'修改失败！',
                            type:'warning'
                        })
                }).catch(err=>{
                    console.log(err)
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        },
        getContent(msg){
            console.log('msg:'+msg)
            this.article.content=msg
            console.log('this.content:'+this.form.content)
        }
    }
}
</script>

<style>

</style>
