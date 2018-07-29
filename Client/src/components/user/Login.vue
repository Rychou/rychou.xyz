<template>
    <el-form :model="user" :rules="loginRules" ref="user">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="pramary" @click="submit('user')">登陆</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import axios from "@/axios";
export default {
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [{ required: true, message: "用户名不能为空！" }],
        password: [{ required: true, message: "密码不能为空！" }]
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.user)
          axios.userLogin(this.user)
            .then(({data}) => {
              if (data.code === 1) {
                this.$store.dispatch('UserLogin',data.token)
                this.$message({ message: "登陆成功！", type: "success" });
                this.$router.push("/backend");
              } else {
                this.$message.error("用户名或密码错误！");
              }
            })
            .catch(err => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
