<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="body">
      <div class="flex-child products">
        <CartProduct
          v-on:childToParent="getProducts"
          v-for="item in products"
          :key="item.Product.id"
          :idCartProd="item.id"
          :idProd="item.Product.id"
          :priceProd="item.Product.price"
          :photosProd="item.Product.photos"
          :quantityProd="item.quantity"
          :quantityProduct="item.Product.quantity"
        />
      </div>
      <div class="flex-child orderSummary"></div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import CartProduct from "../components/CartProduct";
import Toolbar from "../components/Toolbar.vue";

export default {
  name: "Cart",
  components: {
    CartProduct,
    Toolbar,
  },
  data() {
    return {
      products: [],
      val:[]
    };
  },
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
        .get("http://localhost:8082/getCartProducts", { withCredentials: true })
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
.body {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}
.flex-child:first-child {
  width: 40%;
}
.flex-child:nth-child(2) {
  border: 1px solid;
  width: 17%;
}
</style>