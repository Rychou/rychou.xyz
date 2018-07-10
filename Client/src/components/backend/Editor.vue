<template>
    <div id="editor">
            <mavon-editor style="height: 100%" v-model="content" @input="setContent"></mavon-editor>
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
            content:this.content
        }
    },
    methods: {
        setContent:function(){
            console.log(this.content)
            this.$emit('transferContent',this.content)
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
