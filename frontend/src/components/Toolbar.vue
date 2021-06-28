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
            :disable="disabled"
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
        <q-tab name="home" label="Magazin" />
        <q-tab name="discounts" label="Reduceri" />
        <q-tab name="new" label="Nou" />
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
        icon="person"
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
import axios from "../boot/axios";

export default {
  props: ["disable", "products", "productsBeg"],
  data() {
    return {
      search: "",
      fprice: "",
      fbrand: "",
      disabled: null,
      fram: "",
      tab: "home",
      fmemInt: "",
      fstock: "",
      fnet: "",
      // products: [],
      url: null,
    };
  },
  watch: {
    products() {
      console.log("beg");
      console.log(this.productsBeg);
    },
    tab() {
      this.getURL();
    },
    disabled() {},
    search(newVal, oldVal) {
      console.log(this.search);
      axios
        .get(this.url)
        .then((response) => {
          this.products = response.data;
          this.searchProduct(newVal);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.disableSearch();
    // this.getURL();
  },

  methods: {
  
    // getProducts() {
    //   axios
    //     .get(this.url)
    //     .then((response) => {
    //       this.products = response.data;
    //       this.searchProduct(newVal);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    searchProduct(newVal) {
      if (this.search !== "") {
        this.products = this.products.filter((product) => {
          if (
            Object.keys(product).find(
              (key) =>
                product[key] !== "id" &&
                product[key] !== "quantity" &&
                product[key] !== "photos" &&
                product[key] &&
                product[key]
                  .toString()
                  .toUpperCase()
                  .trim()
                  .includes(newVal.toUpperCase().trim()) //case insensitive
            )
          ) {
            return product;
          }
        });
        this.$emit("childToParent", this.products);
        console.log(this.products);
      }
    },
    disableSearch() {
      if (this.disable) {
        this.disabled = true;
      }
    },
    getURL() {
      if (this.tab === "home") {
        this.url = "http://localhost:8082/getAllProducts";
      }
      if (this.tab === "discounts") {
        this.url = "http://localhost:8082/getReducedProducts";
      }
      if (this.tab === "new") {
        this.url = "http://localhost:8082/getNewProducts";
      }
    },
    openPage(key) {
      this.tab = key;
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