<template>
  <div class="home">
    <div id="overlay">
      <video autoplay muted loop id="main__video" class="visible-desktop">
        <source src="headervideo.mp4" type="video/mp4">Your browser does not support the video tag.
      </video>
      <img id="hero-pic" class="hidden-desktop" src="headermobile.jpg" alt>
        <div class="main__header_content">
          <img src="animated_logo.gif" id="animated_logo">
          <h1 class="visible-desktop">Das die Website von HD Skateboarding e.V.</h1>
          <!-- <p class="visible-desktop">
            HD Skateboarding e.V. ist der Skateboard Verein von Heidelberg.
            <br>Alle machen mit - egal ob Mädchen oder Junge, Albaner oder Sachse, sogar unsere Freunde von der Polizei kommen jeden Tag am Skatepark vorbei, weil wir so cool skaten.
          </p> -->
        </div>
      </div>

    <div class="main__content">
     <div class="main__about">

        <div>
          <h1>📅 Anstehende Events</h1>
          <div class='main__events'>
          <EventCard v-for='event of events.slice(0,4)' v-bind:key='event.id' :event='event'>              
          </EventCard>
          </div>
        </div>

        <h1 id="about">
          👋 Über Uns 
        </h1>
        <p>
        Heidelberg Skateboarding e.V. ist der erste Skateboarding Verein in Heidelberg.
        </p>
        <p>
        Skateboarding ist ein sehr cooler Sport. Anders als bei vielen anderen Sportarten spielt beim Skateboarding niemand gegeneinander sondern alle zusammen. <br> 
        Es geht darum coole Tricks zu machen und dabei wird jeder von den anderen unterstützt. Es gibt keine schlechten Spieler mit denen niemand zusammen spielen will, stattdessen wird jeder Erfolg gefeiert, auch wenn es ein Trick ist der voll einfach ist. 
        </p>
        <p>
        Ziele von Heidelberg Skateboarding e.V. sind
        <ul>
          <li>
            Kinder, Jugendliche und Erwachsene für Skateboarding zu begeistern 
          </li>
          <li>
            Kindern, Jugendlichen und Erwachsenen die Möglichkeit zu geben zusammen zu spielen, ohne Leistungsdruck und ohne Gruppen/-trennung oder -zwang
          </li>
          <li>
            Gegen Vorurteile und Repression gegenüber Minderheiten und Skateboarder zu kämpfen
          </li>
          <li>
            Eine positive Gemeinschaft zu bilden in der sich jeder wohl fühlt, unabhängig von Geschlecht, Alter, Hautfarbe, Muttersprache oder Meinung
          </li>
          <li>
            Die Skateboarding Gemeinschaft zu unterstützen durch Events, Wettbewerbe sowie die Einflußnahme auf politische Entscheidungen bezüglich des Baus und des Erhalts von Skate/-parks und Locations. 
          </li>
          </ul> 
        </p>


        <h1 id="antrag">
          📝 Mitgliederantrag 
        </h1>
        <p>
          Wenn du kein Geld hast sag Bescheid dann kannst du auch irgendwie umsonst Mitglied werden.  
          Ansonsten beträgt der Beitragssatz für Mitglieder:
          
          <ul>
            <li>
          Unter 18: 3 € im Monat
            </li>
            <li>
          Über 18: 5€ im Monat
            </li>
            <li>
          Fördermitgliedsbeitrag: 2 € im Monat
            </li>
          </ul>

          Der <a href="Beitrittserklaerung.pdf" download>Mitgliederantrag</a> muss ausgedruckt und geschickt (bzw. vorbeigebracht) werden weil wir ein SEPA Lastschriftmandat mit Unterschrift brauchen. 
          Bei Events haben wir aber auch immer ein paar Beitrittserklaerungen dabei. 
        </p>
     </div>

    </div>
  </div>
</template>

<style lang="stylus">
.home {
  height: 100%;
}

#overlay 
  background-color:rgba(0,0,0,.5);
  height:100%;
  left:0;
  position:relative;
  top:0;
  transition:background-color 300ms ease;
  width:100%;

#animated_logo
  width: 100%

.main__header_content
  margin 128px 
  max-width: 50rem;
  margin: auto;
  color: #fff
  text-shadow: 2px 2px #000;
  position: absolute;
  left: 0;
  right: 0;
  top: 20%
  bottom: 20%; 
  h1
    font-size: 3rem;
  p
    font-size: 1.5rem;

.main__about
  max-width 50rem
  margin: auto

.main__events
  display grid 
  grid-template-columns repeat(auto-fit, minmax(100px, 360px))
  grid-gap: 20px
  align-items: center;
  justify-items: center;
  justify-content space-evenly


#main__video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 0;
  height: auto;
  width: auto;
  backface-visibility: hidden;
  background-size: cover;
  perspective: 1000;
}

.main__content 
  padding 16px
  position: relative;
  background-color: #000;
  ul
    text-align: left
  p 
    font-size: 1rem
  h1
    font-size: 2rem;


#hero-pic {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}



</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import axios from 'axios'
import apiUrl from '@/apiUrl'


@Component({
  components: {
    EventCard
  }
})
export default class Home extends Vue {

  events = [];

  mounted() {
   
    
  }

  created(){
    axios.get(apiUrl + '/events/').then(
      result => {
       console.log(result.data)
       this.events = result.data.results
      },
      error => {
        //TODO
      }
    );
  }
}
</script>
