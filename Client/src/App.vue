<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body,#app{
    margin: 0;
    height: 100%;
  }
  a{ 
  text-decoration:none; 
  color:#333; 
  } 
</style>
