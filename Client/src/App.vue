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

<style lang="scss">
  $color:#33a3dc;
  *{
    font-family: ' -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft Yahei",sans-serif';
  }
  h1{
    font-size: 24px;
  }
  html,body,#app{
    margin: 0;
    height: 100%;
  }
  a{ 
    color: #000;
    text-decoration:none; 
  }
  blockquote{
    margin: 0;
    padding: 12px 40px ;
    border-radius: 5px;
    background: rgb(231, 231, 231);
    border-left:10px solid rgb(172, 172, 172);
    font-size: 14px;
    color: gray
  }
  code{
    padding: 16px;
    border-radius: 5px;
  }
  
</style>
