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
            :disable="disabled"
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
        <q-tab name="allProducts" label="Produse" />
        <q-tab name="allOrders" label="Comenzi" />
      </q-tabs>

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
  data() {
    return {
      disabled: null,
      search: "",
      rows: [],
    };
  },
  watch: {
    disabled() {},
    search(newVal, oldVal) {
      console.log(this.search);
      axios
        .get("http://localhost:8082/getAllProducts")
        .then((response) => {
          this.rows = response.data;
          this.searchProduct(newVal);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getURL();
  },

  methods: {
    getURL() {
      const currUrl = this.$router.currentRoute.path;
      if (currUrl.includes("allOrders")) {
        this.disabled = true;
      }
    },

    searchProduct(newVal) {
      if (this.search !== "") {
        this.rows = this.rows.filter((product) => {
          if (
            Object.keys(product).find(
              (key) =>
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
        this.$emit("childToParent", this.rows);
        console.log(this.rows);
      }
    },
    logout() {
      this.$router.push("/login");
    },

    openPage(key) {
      this.$router
        .push(`/${key}`)
        .then(() => {})
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>