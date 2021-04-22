<template>
  <div class="myDiv">
    <div>
      <Toolbar />
    </div>
    <div class="divProducts">
      <div class="products">
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
    val(newVal, oldVal) {
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