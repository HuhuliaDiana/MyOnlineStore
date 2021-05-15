<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="body">
      <div v-if="users.length > 0" class="suggestions">
        <SuggestionsFromUser
          v-for="user in users"
          :key="user.id"
          :id="user.id"
          :username="user.username.toUpperCase()"
        />
      </div>
      <div v-else style="margin-top: 8%; text-align: center">
        <div
          style="
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            font-size: 150%;
            color: #383838;
          "
        >
          Nu aveti sugestii de produse!
        </div>
        <img style="width: 30%; margin-top: 5%" src="photos/empty_cart.png" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import Toolbar from "../components/Toolbar.vue";
import SuggestionsFromUser from "../components/SuggestionsFromUser.vue";

export default {
  name: "SuggestionsFrom",
  components: {
    Toolbar,
    SuggestionsFromUser,
  },
  data() {
    return {
      users: [],
    };
  },
  watch: {
    users(n, o) {
      this.users = n;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/seeUsersWhoSuggestedProducts", {
        withCredentials: true,
      })
      .then((response) => {
        this.users = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.suggestions {
  width: 55%;
  margin: 0 auto;
}
</style>