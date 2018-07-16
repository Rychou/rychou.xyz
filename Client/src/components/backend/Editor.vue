<template>
    <div id="editor">
            <mavon-editor style="height: 100%" v-model="editorContent" @input="setContent"></mavon-editor>
        </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor'
export default {
    name: 'editor',
    components: {
        mavonEditor
    },
    props:['content'],
    data () {
        return {
        }
    },
    computed: {
      editorContent:{
          get:function(){
              return this.content
          },
          set:function(){
              
          }
      }  
    },
    methods: {
        setContent:function(){
            console.log(this.editorContent)
            this.$emit('transferContent',this.editorContent)
        }
    }
}
</script>

<style>
#editor {
        margin: auto;
        height: 580px;
    }
</style>
