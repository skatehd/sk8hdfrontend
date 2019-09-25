<template>
        <div class='spot-details mt-2 ml-1 mr-2 ml-2 ' v-loading="loading">
            <h1>{{name}}</h1>

              <div class="objects_header">
                <h3> Was es so gibt: </h3> 
                <button v-if="isLoggedIn()" class='btn-dash ml-2 p-05 btn-add' @click="showObjectDialog = true"> + Hinzufügen</button>
              </div>
              <div v-if="skateobjects.length>0">
                <ul>
                  <li v-for="skateobject in skateobjects" v-bind:key="skateobject">
                    {{skateobject.name}}
                  </li>
                </ul>
              </div>
              <p v-else>
                Noch keine Eintraege 
                Falls du weisst was es an dem Spot gibt (Rails, Ramps, etc.), dann {{isLoggedIn() ? '' : 'melde dich an und fuege etwas hinzu.'}}
                <a v-if="isLoggedIn()" @click="showObjectDialog = true">fuege es hinzu</a>
              </p>
              <div class="objects_header">
                <h3>Bilder:</h3>
                <button v-if="isLoggedIn()" class='btn-dash ml-2 p-05 btn-add' @click="showFileDialog = true"> + Hinzufügen</button>
              </div>
              <div class='img-grid' v-if="images.length > 0">
                <img class="spot__image" v-for="image in images" v-img:name :src="image.image" v-bind:key="image.image">
              </div>

              <p v-else>
                Noch keine Bilder vorhanden. 
              </p>

              <h3>Kommentare:</h3>

                  <div v-if="comments.length === 0">
                      Bisher noch keine Kommentare
                  </div>
                  <CommentComponent 
                    v-for="comment of comments" v-bind:key="comment.id" 
                    :commentTree="comment" 
                    :replyPath='replyPath'
                    @changes="loadDetails()"
                    class="event__comments">
                  </CommentComponent>
                  <div v-if="isLoggedIn()" class="event__comment-editor">
                      <CommentEditor  @send="sendMessage" v-loading='loading'></CommentEditor>
                  </div>
                  <LoginOrRegister v-else top="Du musst dich" bottom="um einen Kommentar zu schreiben"></LoginOrRegister>

          <el-dialog 
          v-loading="loading"
          :title="`Objekt zu ${name} hinzufuegen`"
          :visible.sync="showObjectDialog">
            <div class="mb-1" v-for="skateobject in skateobjects" v-bind:key="skateobject">
                  {{skateobject.name}}
            </div>
            <input class="txt-input" type="text" v-model="objectEdit" maxLength="128">
            <button class="btn ml-1" @click="addObject">+</button>
            <br>
            <button class="btn mt-2 fill-width" @click="showObjectDialog=false">Fertig</button>
          </el-dialog>

          <el-dialog
          v-loading="loading"
          :title="`Objekt zu ${name} hinzufuegen`"
          :visible.sync="showFileDialog"
          :before-close="closeImageDialog">
              <Vue2Dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></Vue2Dropzone>
            <br>
            <button class="btn mt-2 fill-width" @click="closeImageDialog">Fertig</button>
          </el-dialog>

          </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import {CommentTree} from '@/models';
import CommentEditor from '@/components/CommentEditor.vue'; 
import CommentComponent from './CommentComponent.vue';
import LoginOrRegister from './LoginOrRegister.vue';
import Vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import axios from 'axios';
import apiUrl from '../apiUrl';
import { buildCommentTree } from '../comment_util';

@Component({
  components: {
    CommentEditor,
    CommentComponent,
    LoginOrRegister, 
    Vue2Dropzone
  }
})
export default class ThreadView extends Vue {
  @Prop({required: true}) private id!: number;

  loading = false;
  collapse = true;
  loaded = false;
  comments: CommentTree[] = [];
  images = [];
  skateobjects = [];
  loadingComments = false;
  name = ''
  activeName = 'first'
  showObjectDialog = false;
  showFileDialog = false;
  objectEdit = '';

  dropzoneOptions = {
          url: `${apiUrl}/map/${this.id}/images/`,
          thumbnailWidth: 150,
          maxFilesize: 3,
          headers: { "Authorization": "Token " + this.$store.getters.token },
          paramName: 'image',
          acceptedFiles: 'image/*',
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

    @Watch('id')
    onIdChange(id: number){
      this.loadDetails();
    }

    addObject(){ 
      console.log('ADd object')
      console.log(this.objectEdit)
      if(this.objectEdit === '') {
        // TODO: show error
        return;
      }
      this.loading = true;
      axios.post(`${apiUrl}/map/${this.id}/object/`, {name: this.objectEdit }).then(
          response => {
            this.objectEdit = '';
            this.loadDetails()
          },
          error => {}
      )      
    }

    loadDetails() {
      axios.get(`${apiUrl}/map/${this.id}/`).then(
          response => {
            this.comments = buildCommentTree(response.data.comments);
            this.name = response.data.name;
            this.images = response.data.images;
            this.skateobjects = response.data.skateobjects
              console.log(response)
            this.loading = false;
            this.loaded = true;
          },
          error => {}
      )
    }
    
    closeImageDialog(){
      this.showFileDialog = false;
      this.loadImages();
    }

    loadImages() {
      axios.get(`${apiUrl}/map/${this.id}/images/`).then(
          response => {
            this.images = response.data.results;
              console.log(response)
            this.loading = false;
            this.loaded = true;
          },
          error => {}
      )
    }

  loadComments() {
      axios.get(`${apiUrl}/map/${this.id}/comments/`).then(
          response => {
            this.comments = buildCommentTree(response.data);
              console.log(response)
            this.loading = false;
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
  display: flex
  height: 200px
  overflow-x scroll
  overflow-y hidden

.spot__image
  width 200px
  height 200px
  object-fit cover

.btn-add
  height 2rem

.objects_header
  display: flex  
  align-items center

.spot-details
  padding-bottom 4rem
  border 4px dashed 
  text-align: left 
  padding-left: 1rem
  padding-right: 1rem
  margin-bottom: 1rem
</style>
