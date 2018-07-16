<template>
    <div class="form-container">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input
                    placeholder="请输入标题"
                    v-model="form.title"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <mavon-editor style="height: 580px" v-model="form.content"></mavon-editor>
            </el-form-item> 
            <el-form-item label="添加标签" prop="tags">
                <add-tags @setTags="getTags" :tags="this.form.tags"></add-tags>
            </el-form-item> 
            <el-form-item>
                <el-button @click="submitForm('form')">修改</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import axios from 'axios'
import { mavonEditor } from 'mavon-editor'
import AddTags from './NewArticle/AddTags.vue'


export default {
    name:'edit-article',
    data(){
        return{
            form:{},
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
      mavonEditor,AddTags
    },
    created () {
        axios.get('http://120.79.88.123:8000/article/getArticleById?id='+this.$route.params.id)
            .then(response=>{
                this.form=response.data
                this.form.tags=this.form.tags.split(',')
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
    },
    methods: {
        submitForm(formName) {
          console.log(this.form)
          this.$refs[formName].validate((valid) => {
          if (valid) {
              axios({
                    method:'post',
                    url:'http://120.79.88.123:8000/article/updateArticle',
                    data:{
                        id:this.$route.params.id,
                        title:this.form.title,
                        content:this.form.content,
                        create_time:new Date(),
                        tags:this.form.tags.join(','),
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
        getTags(tags){
            console.log('tags'+tags)
            this.form.tags=[...tags]
            console.log(this.form.tags)
        }
    }
}
</script>

<style>

</style>
