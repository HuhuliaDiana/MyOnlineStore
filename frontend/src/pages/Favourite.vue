<template>
  <div>
    <div>
      <Toolbar disable="true"/>
    </div>
    <div class="divProducts">
      <div
        v-if="products.length > 0"
        style="display: flex; flex-direction: column; margin-top: 5%"
      >
        <div style="text-align: center">
          <img src="photos/love.svg" style="width: 200px" />
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
      <div v-else style="margin-top: 10%; text-align: center">
        <div
          style="
            font-family: 'Montserrat', sans-serif;
            font-size: 300%;
            color: #383838;
          "
        >
          Nu aveți produse favorite!
        </div>
        <img style="width: 20%; margin-top: 10%" src="photos/emptyCart.svg" />
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
.products {
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  margin-top: 5%;
  width: fit-content;
}
.divProducts {
  width: 77%;
  margin: auto;
}
</style>