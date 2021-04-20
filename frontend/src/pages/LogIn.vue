<template>

<div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onLoggedIn"
      class="q-gutter-md"
    >
       <q-input
        filled
        v-model="email"
        label="Your email *"
        hint="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        type="password"
        label="Your password *"
        hint="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="Log in" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from '../boot/axios'

export default {
  name:'Register',
  data(){
    return{
      email:null,
      password:null,
      accept:false

    }
  },
  methods:{
    onLoggedIn(){
      const user={
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:8082/login', user, {withCredentials:true}).then((res)=>{
        console.log('Succesfully logged in')
        this.$router.push('/home')

       }).catch((err)=>{
          const errors = Object.values(err.response.data);
          errors.map(e => {
             this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: e
          })
       })


      })
      



    }
  }

}
</script>

<style>

</style>