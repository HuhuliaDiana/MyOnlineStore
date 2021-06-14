<template>
  <div class="body">
    <div v-if="products.length > 0">
      <div
        style="
          color: #c0c0c0;
          margin-top: 5%;
          text-align: center;
          font-weight: bold;
        "
      >
        RECOMANDĂRI
      </div>
      <div
        style="
          font-size: 200%;
          font-weight: bold;
          text-align: center;
          font-family: 'Arial Narrow', Arial, sans-serif;
        "
      >
        {{ username }}
      </div>
      <div style="font-size: 250%; font-weight: bold; text-align: center">
        <span class="material-icons-outlined"> account_circle </span>
      </div>
      <div class="products">
        <div style="margin: 0 auto; width: 100%; margin-top: 5%">
          <SuggestedProduct
            v-on:childToParent="getProducts"
            :userId="id"
            v-for="item in products"
            :key="item.Product.id"
            :idCartProd="item.id"
            :idProd="item.Product.id"
            :priceProd="item.Product.price"
            :photosProd="item.Product.photos"
            :quantityProd="item.quantity"
            :note="item.note"
            :quantityProduct="item.Product.quantity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import SuggestedProduct from "../components/SuggestedProduct";

export default {
  props: ["username", "id"],
  watch: {
    val(newVal, oldVal) {
      this.getTheProducts();
    },
  },
  methods: {
    getProducts(value) {
      this.val = value;
    },
    getTheProducts() {
      axios
        .get(`http://localhost:8082/seeSuggestionsFromUser/${this.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    SuggestedProduct,
  },
  data() {
    return {
      val: [],
      products: [],
    };
  },
  mounted() {
    this.getTheProducts();
  },
};
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
</style>