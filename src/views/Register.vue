<template>
  <div class='auth'>
      <img src="logo.png" class="auth_logo">
       <h4>Registrieren</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
          <el-input id="name" type="text" v-model="name" required autofocus/>
      </div>
      <br>
      <label for="email" >E-Mail Addresse</label>
      <div>
          <el-input id="email" type="email" v-model="email" required/>
      </div>
<br>
      <label for="password">Passwort</label>
      <div>
          <el-input id="password" type="password" v-model="password" required/>
      </div>
<br>
      <label for="password-confirm">Passwort Wiederholen</label>
      <div>
          <el-input id="password-confirm" type="password" v-model="password_confirmation" required/>
      </div>
      <br>
      <div>
          <el-button type="submit" @click="register">Registrieren</el-button>
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
  email = "";
  password  =  "";
  password_confirmation= "";
 is_admin= null;

  register() {
    if(this.password !== this.password_confirmation){
      // @ts-ignore
      this.$message({message: 'Die Passwoerter stimmen nicht ueberein', type: 'error'})
      return;
    }
      console.log('Registering')
        let data = {
          username: this.name,
          email: this.email,
          password1: this.password,
          password2: this.password_confirmation,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
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
