<template>
  <div class='login-register'>
  <p>{{top}}</p>
         <router-link to="/login">Anmelden</router-link> oder <router-link to="/register">Registrieren</router-link>
  <p>{{bottom}}</p>
  </div>
</template>

<style lang="stylus">


</style>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";


@Component({
  components: {
  }
})
export default class Home extends Vue {
  top= "";
  bottom = "";
}
</script>
