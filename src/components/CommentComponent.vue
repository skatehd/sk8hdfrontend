<template>
        <div class='comment_card' >
            <!-- <img :src="imageSrc()" class='event_card__image'> -->
             {{commentTree.owner.username}} {{formatdate(commentTree.date)}}
            <p>
            {{commentTree.content}} 
           </p>  
        <CommentComponent v-for="comment of commentTree.children" v-bind:key="comment.id"
        :replyPath="replyPath"
         :commentTree="comment">

        </CommentComponent>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {CommentTree} from '@/models';

@Component
export default class CommentComponent extends Vue {
  @Prop({required: true}) private commentTree!: CommentTree;
  @Prop({required: true}) private replyPath!: string;

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

  mounted(){
      console.log(this.commentTree)
  }


  imageSrc(){
     
  }
}
</script>

<style scoped lang="stylus">
.comment_card
  border-style: solid 
  padding: 1rem
  margin: 2 rem
  margin-right 0
  margin-bottom 0
  border-width 1px
  border-radius: 16px;
  text-align: left
  z-index: 2
  overflow: hidden
  cursor: pointer

.event_card__content
    padding: 2rem

.event__time
  float: right

.event_card:hover 
  box-shadow 3px 3px 3px 3px #ccc

.event_card__image
  width: 100%
  height: 200px
  object-fit: cover;


</style>
