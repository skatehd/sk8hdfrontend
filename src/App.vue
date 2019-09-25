<template>
  <div id="app">
    <div id="nav">
      <Push class="hidden-desktop" :right="true">
      <img @click="home" src="/logo.png" class="burger__logo clickable">
       <p @click="$router.push('/board')" class="router-link">📝 BilloBoard</p> <br/>
       <p @click="$router.push('/map')" class="router-link">🗺️ ShredMap</p> <br/>
       <p v-if="isLoggedIn()" class="router-link" @click="logout"> 
        Ausloggen
      </p> 
     <div v-else class='burger-menu__login-register' >
       <p @click="$router.push('/login')" class="router-link">Anmelden</p> <br/>
       <p @click="$router.push('/register')" class="router-link">Registrieren</p> <br/>      
     </div>
      <!-- <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link> -->
      </Push>
      <div class="visible-desktop header-desktop" >
      <img src="/logo.png"  @click="home" class="header__logo header__left clickable">
      <div v-if="isLoggedIn()" class="nav__logout" @click="logout"> 
        Ausloggen
     </div> 
     <div v-else class="nav__logout">
       <router-link to="/login">Anmelden</router-link> | <router-link to="/register">Registrieren</router-link>
     </div>
      <router-link  to="/">Home</router-link> | 
      <router-link to="/board">📝 BilloBoard</router-link> |  
      <router-link to="/map">🗺️ ShredMap</router-link> 

        </div>
    </div>
    <div id="page-wrap" class="fill-height">
    <router-view />
    </div>
  </div>
</template>
<style lang="stylus">
@import './global.styl';

.router-link 
  color: white
  cursor pointer

body, html
  height: 100%
  margin 0

body
  background #000

.clickable
  cursor: pointer

.header__logo
  height: 2rem

.burger__logo
  height: 3rem

.burger-menu__login-register
  display: block

.bm-menu
  z-index: 9999999

.bm-burger-button
  position: fixed
  top: 1rem
  right: 1rem

.header-desktop
  position: fixed
  padding: 1em
  background rgba(0,0,0,0.7)
  width: 100%

.header__left 
  float: left

.nav__logout
  float: right 
  cursor pointer
  margin-right: 2rem

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #999999
  height: 100%

#nav
  height 2rem
  z-index: 1
  position: absolute 
  top: 0
  left: 0
  width 100%
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983


/* Visibility Helpers */
@media only screen and (min-width: 769px) {
  .visible-mobile, .visible-tablet, .hidden-desktop {
    display: none !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 768px) {
  .visible-mobile, .hidden-tablet, .visible-desktop {
    display: none !important;
  }
}

@media only screen and (max-width: 479px) {
  .hidden-mobile, .visible-tablet, .visible-desktop {
    display: none !important;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Push } from 'vue-burger-menu'
import Component from 'vue-class-component'
import { cloneDeep} from 'lodash'

@Component({
  components: {
    Push
  }
})
export default class Home extends Vue {

  home(){
    this.$router.push('/');
  }

  logout() {
    this.$store.dispatch('logout')
    .then(() => {
      
    }
    );
  }

  // This is to make SPA on github work: 
  // all pages other than index and static will be 404'd 
  // In the custom 404 we attach the current route to sessionStorage and redirect to index
  // here we have to set the route accordingly
  created() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect != window.location.pathname) {
        this.$router.push(redirect.replace(/^.*\/\/[^\/]+/, ''));
      }
      else {
      }
  }

}

</script>
