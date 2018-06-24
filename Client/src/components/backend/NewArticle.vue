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
                <vue-editor v-model="form.content"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('form')">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
    data() {
       return {
            form:{
                title:'',
                content: ''  
            },
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
      VueEditor
   },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios({
                    method:'post',
                    url:'http://120.79.88.123:8000/newArticle',
                    data:{
                        title:this.form.title,
                        content:this.form.content,
                        create_time:new Date(),
                        tags:'',
                        author:'rychou'
                    }
                }).then(response=>{
                    if (response.data.insertState){
                        alert('发布成功!');
                    }else alert('发布失败!');
                }).catch(err=>{
                    console.log(err)
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
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
