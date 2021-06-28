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
  props: ["disable"],
  data() {
    return {
      search: "",
      fprice: "",
      fbrand: "",
      disabled: null,
      fram: "",
      fmemInt: "",
      path: null,
      fstock: "",
      fnet: "",
      products: [],
      url: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path.includes("home")) {
        this.path = "home";
        this.url = "http://localhost:8082/getAllProducts";
      } else if (to.path.includes("discounts")) {
        this.path = "discounts";
        this.url = "http://localhost:8082/getReducedProducts";
      } else if (to.path.includes("new")) {
        this.path = "new";
        this.url = "http://localhost:8082/getNewProducts";
      }
      axios
        .get(this.url, {
          withCredentials: true,
        })
        .then((response) => {
          this.products = response.data;
          this.filter();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    disabled() {},
    products() {},
    search(newVal, oldVal) {
      console.log(this.search);
      axios
        .get(this.url, { withCredentials: true })
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
    this.disableSearch(), this.getCurrentRoute(), this.getProducts();
  },

  methods: {
    getProducts() {
      axios
        .get(this.url, { withCredentials: true })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentRoute() {
      const currUrl = this.$router.currentRoute.path;
      if (currUrl.includes("home")) {
        this.path = "home";
        this.url = "http://localhost:8082/getAllProducts";
      } else if (currUrl.includes("discounts")) {
        this.path = "discounts";
        this.url = "http://localhost:8082/getReducedProducts";
      } else if (currUrl.includes("new")) {
        this.path = "new";
        this.url = "http://localhost:8082/getNewProducts";
      }
    },
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