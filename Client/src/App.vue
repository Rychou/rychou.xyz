<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'App'
}
</script>

<style>
  *{
    font-family: ' -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft Yahei",sans-serif';
  }
  html,body,#app{
    margin: 0;
    height: 100%;
  }
  a{ 
  text-decoration:none; 
  color:#333; 
  }
  blockquote{
    margin: 0;
    padding: 12px 40px ;
    border-radius: 5px;
    background: rgb(231, 231, 231);
    border-left:10px solid rgb(172, 172, 172);
    font-size: 14px;
  }
  code{
    padding: 10px;
    border-radius: 5px;
  }
  
</style>
