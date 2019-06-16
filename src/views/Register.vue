<template>
  <div class='auth'>
      <img src="logo.png" class="auth_logo">
       <h4>Registrieren</h4>

       <div v-if="success">
        <p class="register__success_emoji">👍</p>
        <h1>
          Registrierung Erfolgreich
        </h1>
       </div>

    <form v-if="!success" @submit.prevent="register" v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.8)">
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
          <el-input id="password-confirm" type="password" v-model="password_confirmation" @keyup.enter.native="register" required/>
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

.register__success_emoji
  font-size: 5rem


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
  success=false;
  loading = false;

  register() {
    if(this.password !== this.password_confirmation){
      // @ts-ignore
      this.$message({message: 'Die Passwoerter stimmen nicht ueberein', type: 'error'})
      return;
    }
      console.log('Registering')
      this.loading = true;
        let data = {
          username: this.name,
          email: this.email,
          password1: this.password,
          password2: this.password_confirmation,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
       .then(
         () => {
                 this.loading = false;
           this.success = true;
           setTimeout(() => 
           this.$router.push('/'),
           1000 
           )
        },
       error => {
         this.loading = false;
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
