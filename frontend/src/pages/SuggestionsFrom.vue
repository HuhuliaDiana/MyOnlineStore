<template>
  <div>
    <div>
      <Toolbar disable="true" />
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
            font-size: 300%;
            color: #383838;
          "
        >
          Nu aveți recomandări de produse!
        </div>
        <img style="width: 16%; margin-top: 8%" src="photos/emptyCart.svg" />
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