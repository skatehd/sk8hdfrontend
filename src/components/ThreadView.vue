<template>
        <div class='thread_wrapper' v-loading="loading">
             <div class="mt-1">
                 <span class="txt-small txt-emph">{{thread.owner.username}} &nbsp;</span> 
                 <span class="txt-small">{{formatdate(thread.date)}}</span>
             </div>
            <h1 class="mt-1 mb-0">{{thread.title}}</h1>
            <p class="txt-white">{{thread.content}}</p> 
            <!-- '🙉' : '🙈' -->
        <div v-if="!collapse">
            <div v-if="commentsLoaded && comments.length === 0">
                Bisher noch keine Kommentare
            </div>

            <CommentComponent 
            v-for="comment of comments" v-bind:key="comment.id" 
            :commentTree="comment" 
            :replyPath='replyPath'
            @changes="loadComments()"
            class="event__comments">
            </CommentComponent>
            <div v-if="isLoggedIn()" class="event__comment-editor">
                <CommentEditor  @send="sendMessage" v-loading='loading'></CommentEditor>
            </div>
            <LoginOrRegister v-else top="Du musst dich" bottom="um einen Kommentar zu schreiben"></LoginOrRegister>
        </div>
            <button class="emoji-medium btn-dash txt-center fill-width mb-1" @click="collapse = !collapse">{{collapse ? '+' : '-' }}</button>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import {CommentTree} from '@/models';
import CommentEditor from '@/components/CommentEditor.vue'; 
import CommentComponent from './CommentComponent.vue';
import LoginOrRegister from './LoginOrRegister.vue';

import axios from 'axios';
import apiUrl from '../apiUrl';
import { buildCommentTree } from '../comment_util';

@Component({
  components: {
    CommentEditor,
    CommentComponent,
    LoginOrRegister, 
  }
})
export default class ThreadView extends Vue {
  @Prop({required: true}) private thread!: {id: number, title: string, content: string, date: string};

  loading = false;
  collapse = true;
  commentsLoaded = false;
  comments: CommentTree[] = [];
  loadingComments = false;

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

    @Watch('collapse')
    onOpenThread(closed: boolean){
        if(!closed && !this.commentsLoaded){
            this.loadComments();
            this.loadingComments = false;
        }
    }

    loadComments(){
        this.loadingComments = true;
        axios.get(`${apiUrl}/board/${this.thread.id}/comments/`)
        .then(response => {
            this.comments = buildCommentTree(response.data);
            this.loadingComments = false; 
            this.commentsLoaded = true;
        }, error => {
            //TODO
            this.loadingComments = false;
            console.log(error)
        })
    }

  get replyPath() {
      return `${apiUrl}/board/${this.thread.id}/comments/`;
  } 

  sendMessage(message: string){
    this.loading = true;
    axios.post(this.replyPath, {
      content: message,
    } ).then(
        result => {
          this.loadComments();
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


 

  

  imageSrc(){
     
  }
}
</script>

<style scoped lang="stylus">

.thread_wrapper 
    border 1px dashed 
    text-align: left 
    padding-left: 1rem
    padding-right: 1rem
    margin-bottom: 1rem
</style>
