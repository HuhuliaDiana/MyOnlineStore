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
              margin-top: 10%;
            "
          >
            WiseCell
          </div>
          <q-form
            @submit="onLoggedIn"
            class="q-gutter-md flex flex-center"
            style="
              width: 70%;
              height: 50%;
              flex-direction: column;
              margin-top: 5%;
            "
          >
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
                style="color: #a8a8a8; font-size: 300%"
              >
                lock
              </div>
              <q-input
                filled
                v-model="password"
                style="width: 80%; margin-top: 5%"
                type="password"
                label="Parola *"
                hint="Parola"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div
              style="display: flex; justify-content: center; margin-top: 10%"
            >
              <q-btn
                label="Login"
                type="submit"
                color="secondary"
                style="
                  font-size: 180%;
                  padding-left: 20px;
                  padding-right: 20px;
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                "
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
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      accept: false,
    };
  },
  methods: {
    getCart() {
      axios
        .get("http://localhost:8082/getCart", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLoggedIn() {
      const user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:8082/login", user, { withCredentials: true })
        .then((res) => {
          this.getCart();
          console.log("Succesfully logged in");
          this.$router.push("/home");
        })
        .catch((err) => {
          const errors = Object.values(err.response.data);
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

<style scoped>
.form {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
</style>