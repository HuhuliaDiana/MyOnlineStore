<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 140%;
      height: 430px;
      padding: 6%;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Nume:</span>
        <!-- <input v-model="lastname" /> -->
        <q-input color="teal" filled v-model="lastname" style="font-size: 80%">
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Prenume:</span>
        <!-- <input outlined v-model="firstname" /> -->
        <q-input color="teal" filled v-model="firstname" style="font-size: 80%">
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Nume de utilizator:</span>
        <!-- <input outlined v-model="username" /> -->
        <q-input color="teal" filled v-model="username" style="font-size: 80%">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>Email:</span>
        <!-- <input outlined v-model="email" /> -->
        <q-input color="teal" filled v-model="email" style="font-size: 80%">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>
    </div>
    <div style="margin-top: 10%">
      <q-btn
        color="secondary"
        style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        label="Salvare"
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
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Date actualizate!",
          });
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