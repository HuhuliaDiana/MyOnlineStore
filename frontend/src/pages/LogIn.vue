<template style="">
  <div
    class="page"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    "
  >
    <div class="flex form" style="width: 70%; justify-content: space-between;height:900px">
      <div
        style="
          width: 40%;
          background-color: #26a69b;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-style: italic;
          font-size: 400%;
        "
      >
        WiseCell
      </div>
      <div class="login" style="width: 50%;">
        <div
          style="
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <q-form
            @submit="onLoggedIn"
            class="q-gutter-md flex flex-center"
            style="width: 100%;border:1px solid"
          >
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
            <q-input
              filled
              v-model="password"
              style="width: 80%"
              type="password"
              label="Parola *"
              hint="Parola"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <div style="display: flex; justify-content: center">
              <q-btn label="Login" type="submit" color="secondary" />
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
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.page {
  background: -webkit-linear-gradient(
    left,
    #26a69b,
    #26a69b 40%,
    #f0f0f0 0%,
    #f0f0f0
  );
}
</style>