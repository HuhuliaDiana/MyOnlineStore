<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      width: 14%;
      text-align: center;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        height: 200px;
        justify-content: space-between;
        font-family: 'Montserrat', sans-serif;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Lastname:</span>
        <input outlined v-model="lastname" />
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Firstname:</span>
        <input outlined v-model="firstname" />
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Username:</span>
        <input outlined v-model="username" />
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Email:</span>
        <input outlined v-model="email" />
      </div>
    </div>
    <div style="margin-top: 10%">
      <q-btn
        color="secondary"
        glossy
        label="Save"
        @click="updatePersonalData"
      />
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  name: "PersonalData",
  data() {
    return {
      username: null,
      firstname: null,
      lastname: null,
      email: null,
    };
  },
  methods: {
    updatePersonalData() {
      axios
        .patch(
          "http://localhost:8082/editProfile",
          {
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCurrentUser", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
        this.firstname = result.data.firstname;
        this.lastname = result.data.lastname;
        this.username = result.data.username;
        this.email = result.data.email;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>