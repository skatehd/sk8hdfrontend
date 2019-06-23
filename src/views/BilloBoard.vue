<template>
  <div class='billoboard header-margin' v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.8)">
      <h1>Billo-Board</h1>
        <button class="btn" @click="dialogVisible = !dialogVisible">Einen neuen Thread erstellen 🥪</button>
        <br>
        <input type="text" class="txt-input mt-16" placeholder="🔎" v-model='search'>
    <h2 >Threads:</h2>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" class="ml-2rem mr-2rem" v-loading="searching"  element-loading-background="rgba(0, 0, 0, 0.8)">
    <ThreadView v-for="thread in threads" :thread="thread" v-bind:key="thread.id"></ThreadView>
    </div>
    <el-dialog   
    class='dialog'

    title="Einen neuen Thread erstellen"
    :visible.sync="dialogVisible">
        <p>
            Titel:
        </p> 
        <input class="board__edit_title txt-input fill-width mr-2rem" type="text" v-model="title">
        <p>
            Text: 
        </p>
        <textarea class="txt-input fill-width mr-2rem" v-model="content"></textarea>
        <br>
        <button class="btn mt-16" @click="createThread()">Thread Erstellen</button>

    </el-dialog>
  </div>
</template>

<style lang="stylus">
.board__edit_title: 
    width: 100%
    background-color: #000000
    color: #fff


</style>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import apiUrl from '../apiUrl';
import axios from 'axios';
import ThreadView from '@/components/ThreadView.vue';
import {debounce} from 'lodash';

@Component({
  components: {
      ThreadView
  }
})
export default class BilloBoard extends Vue {

    loading = true;
    searching = false;

    threads: {id: number, title: string, content: string }[] = []

    dialogVisible = false;

    title = '';
    content = '';
    search = '';

    nextApiCall: string | null = null;

    @Watch('search')
    onSearchChange(query: string){
        this.searching = true
        this.debouncedSearch(query);
    }

    debouncedSearch = debounce(this.doSearch, 500)

    doSearch(s: string) {
         axios.get(`${apiUrl}/board/?q=${s}`)
            .then(
                result => {
                    this.searching = false;
                    this.threads = result.data.results
                    this.nextApiCall = result.data.next
                } 
            )
    }

    createThread(){
        this.loading = true;
        axios.post(`${apiUrl}/board/`, {title: this.title, content: this.content})
        .then(response => 
            {
                // @ts-ignore
                this.$message('Thread erstellt');
                this.dialogVisible = false;
                this.title = '';
                this.content = '';
                this.loading = false;
                this.loadThreads();
            },
        error => {
            // @ts-ignore
            this.$message('Irgendwas hat nicht geklappt, versuch spaeter nochmal')    
        })
    }

    loadMore(){
        if(this.nextApiCall === null) {
            return
        } 
        this.loading = true;
         axios.get(this.nextApiCall)
            .then(
                result => {
                    this.loading = false;
                    this.threads.push(...result.data.results)
                    this.nextApiCall = result.data.next
                    console.log(this.threads)
                } 
            )
    }

    loadThreads(){
         axios.get(`${apiUrl}/board/`)
            .then(
                result => {
                    this.loading = false;
                    this.threads = result.data.results
                    this.nextApiCall = result.data.next
                } 
            )
    }

    created(){
       this.loadThreads();
    }
}
</script>
