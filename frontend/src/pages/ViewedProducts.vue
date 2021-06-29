<template>
  <div class="myDiv">
    <div>
      <Toolbar disable="true" />
    </div>
    <div class="divProducts">
      <div
        v-if="products.length > 0"
        style="display: flex; flex-direction: column; margin-top: 5%"
      >
        <div style="text-align: center">
          <img src="photos/viewed.svg" style="width: 250px" />
        </div>
        <div class="products" style="display: flex; margin-top: 5%">
          <FavProduct
            style="margin-right: 20px"
            v-on:childToParent="getProducts"
            v-for="item in products"
            :key="item.id"
            :idProd="item.Product.id"
            :priceProd="item.Product.price"
            :photosProd="item.Product.photos"
          />
        </div>
      </div>
      <div
        v-else
        style="
          margin-top: 10%;
          text-align: center;
          display: flex;
          flex-direction: column;
          text-align: center;
        "
      >
        <div
          style="
            font-family: 'Montserrat', sans-serif;
            font-size: 300%;
            color: #383838;
          "
        >
          Nu ați vizualizat niciun produs!
        </div>
        <div>
          <img style="width: 20%; margin-top: 10%" src="photos/emptyCart.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import FavProduct from "../components/FavProduct";
import Toolbar from "../components/Toolbar";

export default {
  name: "ViewedProducts",
  components: {
    FavProduct,
    Toolbar,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getTheProducts() {
      axios
        .get("http://localhost:8082/getLastViewedProducts", {
          withCredentials: true,
        })
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        });
    },
  },
  mounted() {
    this.getTheProducts();
  },
};
</script>

<style scoped>
.products {
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  margin-top: 80px;
  width: fit-content;
}
.divProducts {
  width: 77%;
  margin: auto;
}
</style>