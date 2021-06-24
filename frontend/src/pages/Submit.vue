<template>
  <div style="font-family: 'Montserrat', sans-serif">
    <div
      class="page"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;
      "
    >
      <div
        class="form"
        style="
          height: 800px;
          width: 26%;
          position: absolute;
          margin-right: 50%;
          background-color: #26a69b;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <img src="photos/login.svg" style="width: 80%" />
      </div>

      <div
        class="flex form"
        style="
          width: 60%;
          justify-content: space-between;
          height: 900px;
          display: flex;
          justify-content: flex-end;
        "
      >
        <div
          style="
            padding: 50px;
            display: flex;
            width: 70%;
            display: flex;
            align-items: center;
            flex-direction: column;
          "
        >
          <div
            style="
              color: #26a69b;
              font-size: 500%;
              font-weight: bold;
              font-style: italic;
              text-align: center;
              margin-top: 5%;
            "
          >
            WiseCell
          </div>
          <q-form
            @submit="onLoggedIn"
            class="q-gutter-md flex flex-center"
            style="width: 70%; height: 80%; flex-direction: column"
          >
            <div
              style="display: flex; justify-content: space-between; width: 80%"
            >
              <div
                class="material-icons"
                style="color: #a8a8a8; font-size: 300%; margin-bottom: 3%"
              >
                badge
              </div>

              <q-input
                filled
                v-model="lastname"
                label="Nume *"
                hint="Nume"
                style="width: 80%"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div
              style="display: flex; justify-content: space-between; width: 80%"
            >
              <div
                class="material-icons"
                style="color: #a8a8a8; font-size: 300%; margin-bottom: 3%"
              >
                badge
              </div>
              <q-input
                filled
                v-model="firstname"
                style="width: 80%"
                label="Prenume *"
                hint="Prenume"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div
              style="display: flex; justify-content: space-between; width: 80%"
            >
              <div
                class="material-icons"
                style="color: #a8a8a8; font-size: 300%; margin-bottom: 3%"
              >
                person
              </div>
              <q-input
                filled
                v-model="username"
                style="width: 80%"
                label="Alege un nume de utilizator *"
                hint="Nume de utilizator"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div
              style="display: flex; justify-content: space-between; width: 80%"
            >
              <div
                class="material-icons"
                style="color: #a8a8a8; font-size: 300%; margin-bottom: 3%"
              >
                email
              </div>
              <q-input
                filled
                v-model="email"
                label="Email *"
                hint="Email"
                style="width: 80%"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div
              style="display: flex; justify-content: space-between; width: 80%"
            >
              <div
                class="material-icons"
                style="color: #a8a8a8; font-size: 300%; margin-bottom: 3%"
              >
                lock
              </div>
              <q-input
                filled
                v-model="password"
                type="password"
                label="Parola noua *"
                style="width: 80%"
                hint="Parola noua"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div style="margin-top: 10%">
              <q-btn
                label="Submit"
                type="submit"
                style="
                  font-size: 150%;
                  padding-left: 20px;
                  padding-right: 20px;
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                "
                color="secondary"
                @click="submit"
              />
              <q-btn
                label="Register"
                type="submit"
                color="secondary"
                style="
                  font-size: 150%;
                  padding-left: 20px;
                  margin-left: 20px;
                  padding-right: 20px;
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                "
                flat
                class="q-ml-sm"
                @click="register"
              />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../boot/axios";

export default {
  name: "Submit",
  data() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      accept: false,
      username: null,
    };
  },
  methods: {
    register() {
      this.$router.push("/login");
    },
    submit() {
      const user = {
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        username: this.username,
        email: this.email,
      };

      axios
        .post("http://localhost:8082/addUser", user, {
          withCredentials: true,
        })
        .then((res) => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Contul a fost creat cu succes!",
          });
          this.$router.push("/login");
        })
        .catch((err) => {
          const errors = err.response.data;
          errors.map((e) => {
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "warning",
              message: e,
            });
          });
        });
    },
  },
};
</script>

<style>
.form {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
</style>