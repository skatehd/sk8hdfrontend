<template>
  <div class="event">
      <img class="event__image" :src="imageSrc()">
      <div class="event__content">
          <h1 style="text-align: left">
              {{event.title}}
          </h1
          ><div class='event__time'><span class='large-icon'>🕑</span> {{formatdate(event.starttime)}} <br>
               <div v-if="event.endtime !== null">
                   - {{formatdate(event.endtime)}}
                </div> 
              </div>

          <span v-html="this.event.description"></span>

          <h1>💬 Kommentare </h1>
      <CommentComponent 
      v-for="comment of comments" v-bind:key="comment.id" 
      :commentTree="comment" 
      :replyPath='replyPath'
      class="event__comments">
      </CommentComponent>
      <div class="event__comment-editor">
      <CommentEditor @send="sendMessage" :loading='loading'></CommentEditor>
      </div>
      </div>
  </div>
</template>

<style lang="stylus">
.event 
    margin-top: 4rem
 
.event__content
   max-width: 50rem
   margin-left auto
   margin-right auto
   text-align left 
  
.event__comment-editor
  margin: 32px


.event__image
    width: 100%
    height: 400px
    object-fit: cover;   

.large-icon 
    font-size: 2rem

</style>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import CommentComponent from "@/components/CommentComponent.vue"; // @ is an alias to /src
import axios from 'axios';
import apiUrl from '@/apiUrl';
import { buildCommentTree } from '@/comment_util';
import { CommentTree } from '../models';
import CommentEditor from '@/components/CommentEditor.vue'; 

@Component({
  components: {
    EventCard,
    CommentEditor,
    CommentComponent
  }
})
export default class Home extends Vue {

    @Prop({required: true})
    id!: number;

  event = {image: null};
  comments: CommentTree[] = [];

  loading = false;

get replyPath() {
  return `${apiUrl}/event/${this.id}/comments/`
}

sendMessage(message: string){
  this.loading = true;
  axios.post(`${apiUrl}/event/${this.id}/comments/`, {
    content: message,
  } ).then(
      result => {
        this.loadComments();
      },
      error => {
        //TODO
      }
    );
}

formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

    imageSrc(){
      if(this.event.image !== null){
          return this.event.image;
      }
      return 'placeholder.jpg'
  }

  loadComments() {
      axios.get(`${apiUrl}/event/${this.id}/comments/`).then(
      result => {
       this.comments = buildCommentTree(result.data);
       this.loading = false;
             },
      error => {
        this.loading = false;
        console.log('Error loading comments')
        console.log(error)
      }
    );
  }

  created(){
    axios.get(`${apiUrl}/event/${this.id}/`).then(
      result => {
       this.event = result.data
             },
      error => {
        console.log('Error loading event')
        console.log(error)
        //TODO
      }
    );
    this.loadComments();
  }
}
</script>
