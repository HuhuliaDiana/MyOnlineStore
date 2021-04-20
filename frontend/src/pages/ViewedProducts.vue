<template>
  <div>
    <Product
      v-for="item in products"
      :key="item.id"
      :idProd="item.id"
      :priceProd="item.price"
      :photosProd="item.photos"
    />
  </div>
</template>

<script>
import axios from "../boot/axios";
import Product from "../components/Product";

export default {
  name: "ViewedProducts",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getLastViewedProducts", { withCredentials: true })
      .then((response) => {
        this.products = response.data;
      });
  },
  methods: {},
};
</script>

<style>
</style>