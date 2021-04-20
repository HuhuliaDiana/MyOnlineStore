<template>
  <div>
    <div>
      <Toolbar></Toolbar>
    </div>
    <div>
      <CardProduct
        v-for="item in products"
        :key="item.Product.id"
        :idProd="item.Product.id"
        :priceProd="item.Product.price"
        :photosProd="item.Product.photos"
      />
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import CardProduct from "../components/CardProduct";
import Toolbar from "../components/Toolbar";

export default {
  name: "Favourite",
  components: {
    CardProduct,
    Toolbar,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getUserFavProducts", { withCredentials: true })
      .then((response) => {
        this.products = response.data;
        console.log(this.products)
      });
  },
};
</script>

<style>
</style>