<template>
  <div class="myDiv">
    <div>
      <Toolbar />
    </div>
    <div class="divProducts">
      <div class="products">
        <FavProduct
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