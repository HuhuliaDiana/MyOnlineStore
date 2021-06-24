<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="divProducts">
      <div v-if="products.length > 0" class="products">
        <FavProduct
          v-on:childToParent="getProducts"
          v-for="item in products"
          :key="item.id"
          :idProd="item.Product.id"
          :priceProd="item.Product.price"
          :photosProd="item.Product.photos"
        />
      </div>
      <div v-else style="margin-top: 10%; text-align: center">
        <div
          style="
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            font-size: 150%;
            color:#383838
          "
        >
          Nu aveti produse favorite!
        </div>
        <img style="width:40%;margin-top:5%" src="photos/emptyCart.svg"/>
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