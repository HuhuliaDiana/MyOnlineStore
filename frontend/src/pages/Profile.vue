<template>
  <div style="font-family: 'Montserrat', sans-serif">
    <div>
      <Toolbar />
    </div>
    <div
      style="
        margin-top: 2.5%;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <!-- <span style="font-size: 900%; color: #26a69b" class="material-icons">
        account_circle
      </span> -->
      <img style="width: 7%" src="photos/bee.png" />
      <span
        style="
          margin-top: 5px;
          font-size: 150%;
          color: #3b484a;
          font-weight: bold;
        "
        >{{ username }}</span
      >

      <div
        style="
          margin-top: 2%;
          width: 30%;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        "
      >
        <PersonalData />
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          margin-top: 3%;
          width: 100%;
        "
      >
        <div style="display: flex; justify-content: space-between; width: 17%">
          <div style="text-align: center">
            <span
              class="material-icons"
              style="color: #26a69b; font-size: 500%"
            >
              shopping_bag
            </span>
            <div style="margin-top: 4%; font-weight: bold">
              <a href="/#/suggestionsFrom" style="">Comenzile tale</a>
            </div>
          </div>
          <div style="text-align: center;">
            <span
              class="material-icons"
              style="color: #26a69b; font-size: 500%"
            >
              groups
            </span>
            <div style="margin-top: 4%; font-weight: bold">
              <a href="/#/orders">Sugestiile tale</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import Toolbar from "../components/Toolbar";
import PersonalData from "../components/PersonalData";

export default {
  name: "Profile",
  components: {
    Toolbar,
    PersonalData,
  },
  data() {
    return {
      username: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCurrentUser", {
        withCredentials: true,
      })
      .then((result) => {
        this.username = result.data.username;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
a:link {
  color: #3b484a;

  text-decoration: none;
}
a:visited {
  color: #3b484a;
}

a:hover {
  color: orange;
  text-decoration: none;
}

a:active {
  color: #3b484a;
}
a:focus {
  color: #3b484a;
}
</style>