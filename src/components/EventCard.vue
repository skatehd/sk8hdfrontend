<template>
        <div class='event_card' @click="routeToEvent()">
              <img :src="imageSrc()" class='event_card__image'>
              
              <div class='event_card__content'>
             <div class='event__time'>🕑 {{formatdate(event.starttime)}} <br>
               <div v-if="event.endtime !== null">
                  &nbsp; - {{formatdate(event.endtime)}}
                </div> 
              </div>

            <h3>{{event.title}}</h3>
            <p>
            {{event.short_description}}    
            </p>  

              </div>
          </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EventCard extends Vue {
  @Prop({required: true}) private event!: any;

  formatdate(datestring: string) {
      const date = new Date(datestring);
      return date.toLocaleTimeString("de-DE", {
     year: "numeric",
     month:"numeric",
     day: "numeric",
     hour: '2-digit', 
     minute:'2-digit'});
  }

  routeToEvent() {
    this.$router.push({ name: 'event', params: { id: this.event.id } })  
    }

  imageSrc(){
      if(this.event.image !== null){
          return this.event.image;
      }
      return 'placeholder.jpg'
  }
}
</script>

<style scoped lang="stylus">
.event_card
  // box-shadow 1px 1px 1px 1px #ccc
  border-style dashed
  transition: 0.3s;
  margin: 2 rem
  border-radius: 16px;
  text-align: left
  z-index: 2
  overflow: hidden
  cursor: pointer
  margin: auto
  max-width 360px
  width: 100%

.event_card__content
    padding: 2rem

.event__time
  display: block
  float: right

.event_card:hover 
  // box-shadow 3px 3px 3px 3px #ccc

.event_card__image
  width: 100%
  height: 200px
  object-fit: cover;


</style>
