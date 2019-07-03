<template>
        <div class='spot-details mt-2 ml-1 mr-2 ml-2 ' v-loading="loading">
            <h1>{{name}}</h1>

              <div class='img-grid'>
                <img class="spot__image" v-for="image in images" v-img:name :src="image.image" >
              </div>

                  <div v-if="comments.length === 0">
                      Bisher noch keine Kommentare
                  </div>
                  <CommentComponent 
                    v-for="comment of comments" v-bind:key="comment.id" 
                    :commentTree="comment" 
                    :replyPath='replyPath'
                    class="event__comments">
                  </CommentComponent>
                  <div v-if="isLoggedIn()" class="event__comment-editor">
                      <CommentEditor  @send="sendMessage" v-loading='loading'></CommentEditor>
                  </div>
                  <LoginOrRegister v-else top="Du musst dich" bottom="um einen Kommentar zu schreiben"></LoginOrRegister>

          </div>
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
  @Prop({required: true}) private id!: number;

  loading = false;
  collapse = true;
  loaded = false;
  comments: CommentTree[] = [];
  images = [];
  loadingComments = false;
  name = ''
  activeName = 'first'

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

    @Watch('id')
    onIdChange(id: number){
      this.loadDetails();
    }

    loadDetails() {
      axios.get(`${apiUrl}/map/${this.id}/`).then(
          response => {
            this.comments = buildCommentTree(response.data.comments);
            this.name = response.data.name;
            this.images = response.data.images;
              console.log(response)
            this.loaded = true;
          },
          error => {}
      )
    }



  get replyPath() {
      return `${apiUrl}/map/${this.id}/comments/`;
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

  mounted(){
    this.loadDetails();
  }

}
</script>

<style scoped lang="stylus">

.img-grid
  display grid
  grid-template-columns repeat(auto-fit, 300px)
  grid-gap: 1rem
  grid-auto-rows: auto;
  grid-auto-flow: row dense;

.spot__image
  width 300px
  

.spot-details
  padding-bottom 4rem
  border 4px dashed 
  text-align: left 
  padding-left: 1rem
  padding-right: 1rem
  margin-bottom: 1rem
</style>
