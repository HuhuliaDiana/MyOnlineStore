<template>
  <div class="q-pa-md flex flex-center" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="lastname"
        label="Your lastname *"
        hint="Lastname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-input
        filled
        v-model="firstname"
        label="Your firstname *"
        hint="Firstname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
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
        label="New password *"
        hint="New password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Register" type="submit" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from '../boot/axios'

export default {
  name:"Submit",
  data(){
    return {
      firstname:null,
      lastname:null,
      email:null,
      password:null,
      accept: false
    }

  },
  methods: {
    onSubmit () {
       const user = {
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
            email: this.email,
        };

        if(this.accept===true){

        axios.post('http://localhost:8082/addUser',
        user, {withCredentials:true}
        ).then((res)=>{
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
        this.$router.push('/login');

        }).catch((err)=>{
          const errors = err.response.data;
          errors.map(e => {
             this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: e
          })
          })

        })

        }else{
          this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })

      }

    }
  }
}
</script>


<style>

</style>