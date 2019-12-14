<template>
  <div class="home">
    <div id="overlay">
      <video autoplay muted loop id="main__video" class="visible-desktop">
        <source src="headervideo.mp4" type="video/mp4">Your browser does not support the video tag.
      </video>
      <img id="hero-pic" class="hidden-desktop" src="headermobile.jpg" alt>
        <div class="main__header_content">
          <img src="animated_logo.gif" id="animated_logo">
          <h1 class="visible-desktop">Das ist die Website von HD Skateboarding e.V.</h1>
          <!-- <p class="visible-desktop">
            HD Skateboarding e.V. ist der Skateboard Verein von Heidelberg.
            <br>Alle machen mit - egal ob Mädchen oder Junge, Albaner oder Sachse, sogar unsere Freunde von der Polizei kommen jeden Tag am Skatepark vorbei, weil wir so cool skaten.
          </p> -->
        </div>
      </div>

    <div class="main__content">
     <div class="main__about">

        <!-- <div>
          <h1>📅 Anstehende Events</h1>
          <div class='main__events'>
          <EventCard v-for='event of events.slice(0,4)' v-bind:key='event.id' :event='event'>              
          </EventCard>
          </div>
        </div>
 -->
        <h1 id="about">
          👋 Über Uns 
        </h1>
        <p>
        Heidelberg Skateboarding e. V. Ist der erste Verein zur Förderung der Skateboardkultur in Heidelberg<br>
        Durch die Aufnahme in das olympische Programm zu den Sommerspielen in Tokyo 2020 hat die Versportlichung von Skateboarding einen neuen Höhepunkt erreicht. Jedoch ist es nichts Neues, dass szenefremde Akteure (wie in diesem Fall das IOC) versuchen, Skateboarding für ihre Zwecke zu instrumentalisieren. Dabei geht jedoch immer etwas Essenzielles verloren, was Skateboarding ausmacht – seine Vielseitigkeit. Egal ob auf der Straße oder in Skateparks, beim Skaten spielt niemand gegeneinander, sondern alle zusammen. Es geht darum, sich kreativ mit seiner Umwelt auseinanderzusetzen und selbstbestimmt neue Tricks zu lernen. Dabei wird jeder von den anderen unterstützt. Es gibt keine schlechten Spieler, mit denen niemand zusammenspielen will, stattdessen wird jeder Erfolg und jeder Trick, auch wenn er noch so einfach sein mag, gefeiert und der Spaß an der Freude steht im Vordergrund!<br>
        Dem  globalen Trend der Sportifizierung, Standardisierung und Fremdbestimmung im Skateboarding wollen wir durch die Gründung des Heidelberg Skateboarding e.V. auf lokaler Ebene entgegenwirken. Skateboarding soll in den Händen der Skaterinnen und Skater bleiben. Mit diesem Verein wollen wir den Heidelberger Skaterinnen und Skatern Möglichkeiten zur Gestaltung der lokalen Szene eröffnen. Wir grenzen uns deshalb davon ab, ein Sportverein zu sein. Bei uns steht die Förderung der Skateboardkultur in seiner gesamten Bandbreite im Vordergrund!<br><br>

        Ziele von Heidelberg Skateboarding e. V sind.:<br><br>

      <ul>
        <li> Die Förderung und Unterstützung der Skateboardkultur in Heidelberg und Umgebung – durch die Veranstaltung von verschiedenen Events, Contests, Skatekursen und das damit verbundene Zusammenkommen der regionalen und überregionalen Skateboardgemeinschaft. </li>
        <li> Kinder, Jugendliche und Erwachsene für Skateboarding zu begeistern. </li>
        <li> Kindern, Jugendlichen und Erwachsenen die Möglichkeit geben zusammen zu spielen (zu skaten) und sich dabei frei zu entfalten. </li>
        <li> Gegen Vorurteile und Repression von Minderheiten und SkateboarderInnen zu kämpfen. </li>
        <li> Eine positive Gemeinschaft zu bilden in der sich jeder wohl fühlt, unabhängig von Geschlecht, Alter, Hautfarbe, Muttersprache oder Meinung. </li>
        <li> Eine Rolle als kommunizierendes und beratendes Bindeglied zwischen der Skateboardgemeinschaft und der Stadt einzunehmen um die Einflussnahme auf den Bau und Erhalt von Skateparks zu vergrößern, sowie das Auftreten als Sprachrohr für alle Skateboard relevanten Belangen. </li>
      </ul>    

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
          <br> <br>
          Möglichkeiten zur Abgabe des Mitgliedsantrags:<br><br>
          <ul>
            <li>Planet Sports Heidelberg, Hauptstraße 107, Heidelberg Altstadt </li>
             <li>Pascal Orawa, Klausenpfad 10, Heidelberg Handschusheim</li>
             <li>Julian Sroczinski, Mannheimerstr. 65, Heidelberg Wieblingen</li>
               <li>Josh Weidlich, Plöck 10, Heidelberg Altstadt</li>
              </ul>
        </p>
     </div>

      <a href="/satzung"><h1>Vereinssatzung</h1></a>
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
