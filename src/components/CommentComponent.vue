<template>
        <div class='comment_card' v-loading="loading">
            <!-- <img :src="imageSrc()" class='event_card__image'> -->
            <p class="comment-content txt-white">
            {{commentTree.content}} 
           </p>  
             <span class="txt-small txt-emph">{{commentTree.owner.username}} &nbsp;</span> 
             <span class="txt-small">{{formatdate(commentTree.date)}}</span>
           <button class="btn reply-btn" @click="reply = !reply">↩️</button>
           <button v-if="commentTree.children.length > 0" class="btn reply-btn " @click="collapse = !collapse">{{collapse ? '🙉' : '🙈' }}</button>
         <CommentEditor v-if="reply"  @send="sendMessage" class="comment__editor"></CommentEditor>
        <div v-if="!collapse">
        <CommentComponent  v-for="comment of commentTree.children" v-bind:key="comment.id"
        @changes="emitChange()"
        :replyPath="replyPath"
         :commentTree="comment"
         class="subcomment">
        </CommentComponent>
        </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import {CommentTree} from '@/models';
import CommentEditor from '@/components/CommentEditor.vue'; 

import axios from 'axios';

@Component({
  components: {
    CommentEditor
  }
})
export default class CommentComponent extends Vue {
  @Prop({required: true}) private commentTree!: CommentTree;
  @Prop({required: true}) private replyPath!: string;

  loading = false;
  reply = false;
  collapse = false;

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

  sendMessage(message: string){
    this.reply = false;
    this.loading = true;
    axios.post(this.replyPath, {
      content: message,
      parent: this.commentTree.id,
    } ).then(
        result => {
          this.emitChange();
          this.loading = false;
        },
        error => {
          // @ts-ignore
          this.$message('Irgendwas hat nicht geklappt, versuche es später nochmal')
          this.loading = false;
          //TODO
        }
      );
  }


  // mounted(){
  //     console.log(this.commentTree)
  // }


  @Emit('changes')
  emitChange(){
    //
  }

  imageSrc(){
     
  }
}
</script>

<style scoped lang="stylus">
.comment_card
  // border-style: solid 
  // padding: 1rem
  padding-left: 1 rem
  padding-bottom: 1 rem
  margin 0
  // border-width 1px
  // border-radius: 16px;
  text-align: left
  z-index: 2
  // overflow: hidden
  // cursor: pointer

.comment-header
  display flex
  justify-content space-between

.comment__editor
  height: 200px
  width: calc(100% - 2rem)

.comment-content
  margin-bottom 0

.subcomment
  border-left 2px dotted

.reply-btn
  border-style: none
  flex-grow: 1

</style>
