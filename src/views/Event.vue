<template>
  <div class="event">
      <img class="event__image" :src="imageSrc()">
      <div class="event__content">
          <div class='event__time mt-16'><span class='large-icon'>🕑</span> 
            <div class='ml-16'>&nbsp;&nbsp;{{formatdate(event.starttime)}} <br>
                <div v-if="event.endtime !== null">
                    - {{formatdate(event.endtime)}}
                  </div> 
            </div>  
          </div>
          <h1 style="text-align: left">
              {{event.title}}
          </h1
          >
          <l-map
          v-if="event.location !== null"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        :center="event.location.coordinates"
        :zoom="15"
        style="height: 400px; width: 100%">
              <l-tile-layer url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"></l-tile-layer>
                  <l-marker :lat-lng="event.location.coordinates" ></l-marker>
        </l-map>

          <span v-html="this.event.description"></span>

          <h1>💬 Kommentare </h1>
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
      </div>
  </div>
</template>

<style lang="stylus">
.event__time
  float right 
  display flex


.event__content
   max-width: 50rem
   margin-left auto
   margin-right auto
   padding: 16px
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

  event: {
    image: null | string;
    location: null | {
      coordinates: number[]
    }
  } = {image: null, location: null};
  comments: CommentTree[] = [];

  loading = false;

  mapOptions = {
          zoomControl: true,
          attributionControl: false,
          zoomSnap: true
        };

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
        // @ts-ignore
        this.$message('Irgendwas hat nicht geklappt, versuche es später nochmal')
        this.loading = false;
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
      return '/placeholder.jpg'
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
       if(this.event.location !== null) {
         this.event.location!.coordinates! = this.event.location!.coordinates.reverse();
       }
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
