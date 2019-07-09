<template>
  <div class='shredmap header-margin'>
      <h1>🗺️ Shred Map </h1>
      <button class='btn-dash mb-1' @click="dialogVisible = true"> 🛹 Spot hinzufügen</button>
        <l-map
        :center="center"
        :zoom="14"
        class="main-map">
              <l-tile-layer url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"         attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
></l-tile-layer>
              <l-marker v-for="spot in spots" @click="spotClicked(spot)" :lat-lng="spot.location" v-bind:key="spot.id">
                  <l-popup>
                    {{spot.name}}     
                  </l-popup>
              </l-marker>
        </l-map>

        <SpotDetails v-if="selectedId !== null" :id="selectedId"></SpotDetails>
        <div v-else>
            <h3>
                Waehle einen Spot aus um Details anzuzeigen
            </h3>
        </div>

        <el-dialog   
            class='dialog'
            title="Einen neuen Spot eintragen"
            :visible.sync="dialogVisible">
            <p>
                Name:
            </p> 
            <input class="board__edit_title txt-input fill-width mr-2rem" type="text" v-model="title">
            <br>
            <br>
            Location:
             <l-map
                class="mt-1"
                @click='onMapCLick'
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                :center="selectedPoint === null ? center : selectedPoint"
                :zoom="14"
                style="height: 400px; width: 100%">
                    <l-tile-layer url="http://tile.stamen.com/toner/{z}/{x}/{y}.png" 
                            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'

                    ></l-tile-layer>
                        <l-marker v-if="selectedPoint !== null" :lat-lng="selectedPoint" >
                        </l-marker>
            </l-map>
            <br>
            <button class="btn mt-16" @click="createSpot()">Spot hinzufügen</button>

        </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import axios from 'axios';
import apiUrl from '@/apiUrl.ts'
import SpotDetails from '@/components/SpotDetails.vue'

@Component({
  components: {
      SpotDetails
  }
})
export default class CommentComponent extends Vue {
 
  loading = true;
  dialogVisible = false;

  title = '';
  selectedPoint: number[] | null = null;
  spots = [];
  center = [49.411566, 8.676653];
  selectedId: number | null = null

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

  spotClicked(spot: {id: number}) {
      this.selectedId = spot.id;
  }

    createSpot(){
        if(this.selectedPoint === null){
            // @ts-ignore
            this.$message('Du musst einen Punkt auf der Karte auswaehlen um einen Spot zu erstellen');
            return;
        }   
        if(this.title === '') {
                        // @ts-ignore
            this.$message('Du musst einen Namen eingeben um einen Spot zu erstellen');
            return;
        }

        axios.post(`${apiUrl}/map/`, {name: this.title, location: {coordinates: this.selectedPoint.reverse(), type: 'Point'}})
            .then(result => {
                            // @ts-ignore
                this.$message('Spot hinzugefuegt! Adde noch einen Kommentar oder paar Bilder damit man weiss was da geht.');    
                this.dialogVisible = false;
            },
            error => {
                            // @ts-ignore
                this.$message('Irgendwas ist schief gelaufen versuch es spaeter nochmal');
                console.log(error)
            })

    }

    onMapCLick(click: {latlng: {lat: number, lng: number}}){
        this.selectedPoint = [click.latlng.lat, click.latlng.lng]
    }

    created(){
        axios.get(`${apiUrl}/map/`)
        .then(result => {
            this.spots = result.data.map((obj: any) => {return {
                name: obj.name,
                location: obj.location.coordinates.reverse(),
                id: obj.id,
            }});
            console.log(this.spots);
        },
        error => {})
    }

}
</script>



<style lang="stylus">
.shredmap
    height 100%

.main-map 
    width: 100%
    height: 40% !important
</style>
