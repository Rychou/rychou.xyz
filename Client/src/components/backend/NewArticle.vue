<template>
    <div class="form-container">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input
                    placeholder="请输入标题"
                    v-model="form.title"
                    :autofocus="true"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <mavon-editor 
                    style="height: 580px" 
                    v-model="form.content"
                    :boxShadow="false"
                    ></mavon-editor>
            </el-form-item> 
            <el-form-item label="添加标签" prop="tags">
                <add-tags @setTags="getTags" :tags="this.form.tags"></add-tags>
            </el-form-item> 
            <el-form-item>
                <el-button @click="submitForm('form')">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Editor from './Editor.vue'
import AddTags from './NewArticle/AddTags.vue'
import axios from 'axios'
import { mavonEditor } from 'mavon-editor'

export default {
    data() {
       return {
            form:{
                title:'',
                content: '',
                tags:[]
            },
            rules:{
                title:[
                    {required:true,message:'请输入标题',trigger: 'change'},
                ],
                content:[
                    {required:true,message:'请输入内容'}
                ],
                tags:[
                    {required:true,message:'请输入标签',trigger: 'blur'}
                ]
            }
       }
     },
    components: {
      editor:Editor,AddTags,mavonEditor
   },
    methods: {
        submitForm(formName) {
          console.log(this.form.tags)
          this.$refs[formName].validate((valid) => {
          if (valid) {
              axios({
                    method:'post',
                    url:'http://120.79.88.123:8000/newArticle',
                    data:{
                        title:this.form.title,
                        content:this.form.content,
                        create_time:new Date(),
                        tags:this.form.tags.join(','),
                        author:'rychou'
                    }
                }).then(response=>{
                    if (response.data.insertState){
                        this.$message({
                            message:'发布成功',
                            type:'success'
                        })
                        this.$router.push('/')
                    }else this.$message({
                            message:'发布成功',
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

<style scoped>
    .content-border{
        border: none;
        background: red
    }
    .form-container{
        background-color: #fff;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 1px 1px 5px #888888;
    }
</style>
