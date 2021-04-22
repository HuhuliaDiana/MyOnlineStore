<template>
  <div>
    <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
      <q-toolbar-title
        style="font-style: italic; font-size: 200%; margin-left: 15%"
      >
        WiseCell</q-toolbar-title
      >
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 100%">
          <q-input
            dark
            dense
            standout
            v-model="search"
            input-class="text-right"
            class="q-ml-md"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>
        </div>
      </div>

      <q-tabs
        v-model="model"
        size="15px"
        style="margin-right: 5%"
        @click="openPage(model)"
      >
        <q-tab name="home" label="Shop" />
        <q-tab name="discounts" label="Discounts" />
        <q-tab name="new" label="New" />
      </q-tabs>
      <q-btn
        size="15px"
        style="margin-right: 10px"
        flat
        round
        dense
        icon="favorite"
        @click="getFavouriteProducts"
      />
      <q-btn
        size="15px"
        style="margin-right: 10px"
        flat
        round
        dense
        icon="history"
        @click="getLastViewedProducts"
      />
      <q-btn
        size="15px"
        style="margin-right: 10px"
        flat
        round
        dense
        icon="shopping_cart"
        @click="getCart"
      />
      <q-btn
        size="15px"
        style="margin-right: 10px"
        flat
        round
        dense
        icon="manage_accounts"
        @click="getProfile"
      />
      <q-btn
        size="15px"
        style="margin-right: 15%"
        flat
        round
        dense
        icon="logout"
        @click="logout"
      />
    </q-toolbar>
  </div>
</template>

<script>
export default {

  data() {
    return {
      search: "",
      fprice: "",
      fbrand: "",
      fram: "",
      fmemInt: "",
      fstock: "",
      fnet: "",
    };
  },
  methods: {
   
    openPage(key) {
      this.$router
        .push(
          `/${key}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .then(() => {})
        .catch((err) => {});
    },
    getCart() {
      this.$router.push("/cart");
    },

    getLastViewedProducts() {
      this.$router.push("/viewedProducts");
    },
    getProfile() {
      this.$router.push("/profile");
    },
    getFavouriteProducts() {
      this.$router.push("/favourite");
    },
    logout() {},
  },
};
</script>

<style>
</style>