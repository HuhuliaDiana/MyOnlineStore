<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="divProducts">
      <div
        v-if="products.length > 0"
        class="products"
        style="display: flex; justify-content: space-between"
      >
        <div style="margin-right: 8%;margin-top:7%">
          <img src="photos/love.svg" style="width:400px"/>
        </div>
        <div
          style="
            display: flex;
            flex-flow: row wrap;
            justify-content:space-between;
            width: fit-content;
            margin: auto;
            
          "
        >
          <FavProduct
            v-on:childToParent="getProducts"
            v-for="item in products"
            :key="item.id"
            :idProd="item.Product.id"
            :priceProd="item.Product.price"
            :photosProd="item.Product.photos"
          />
        </div>
      </div>
      <div v-else style="margin-top: 10%; text-align: center">
        <div
          style="
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            font-size: 300%;
            color: #383838;
          "
        >
          Nu aveți produse favorite!
        </div>
        <img style="width: 20%; margin-top: 5%" src="photos/emptyCart.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import FavProduct from "../components/FavProduct";
import Toolbar from "../components/Toolbar";

export default {
  name: "Favourite",
  components: {
    FavProduct,
    Toolbar,
  },

  watch: {
    val() {
      this.getTheProducts();
    },
  },
  data() {
    return {
      products: [],
      val: [],
    };
  },
  methods: {
    getProducts(value) {
      this.val = value;
    },
    getTheProducts() {
      axios
        .get("http://localhost:8082/getUserFavProducts", {
          withCredentials: true,
        })
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        });
    },
  },
  //created
  mounted() {
    this.getTheProducts();
  },
};
</script>

<style scoped>
.divProducts {
  width: 90%;
  margin: auto;
  margin-top: 5%;
}
</style>