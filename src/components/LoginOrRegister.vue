<template>
  <div class='login-register txt-center'>
  <p>{{top}}</p>
         <a @click="$router.push('/login')" class="link">Anmelden</a> oder <a @click="$router.push('/register')" class="link">Registrieren</a>
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
  @Prop({default: ''})
  top!: string;
  @Prop({default: ''})
  bottom!: string;
}
</script>
