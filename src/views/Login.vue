<template>
  <div class='auth'>
      <img src="logo.png" class="auth_logo">
       <h4>Einloggen</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
          <el-input id="name" type="text" v-model="name" required autofocus/>
      </div>
      <br>
     
      <label for="password">Passwort</label>
      <div>
          <el-input id="password" type="password" v-model="password" required/>
      </div>
      <br>
      <div>
          <el-button type="submit" @click="login">Anmelden</el-button>
      </div>
    </form>
  </div>
</template>

<style lang="stylus">
.auth
  max-width 30rem 
  margin auto
  margin-top 10rem
  

.auth_logo
  height: 200px

</style>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";


@Component({
  components: {
  }
})
export default class Home extends Vue {
  name= "";
  password  =  "";

  login() {
   
      console.log('Logging in')
        let data = {
          username: this.name,
          password: this.password,
        }
        this.$store.dispatch('login', data)
       .then(
         () => this.$router.push('/'), 
       error => {
         console.log(error.response)
        Object.keys(error.response.data)
        .forEach(key => 
          error.response.data[key].forEach(
            // @ts-ignore
            (message :string) => this.$message({message: `${key}: ${message}`, type: 'error'}) 
          )
        )
})
  }
}
</script>
