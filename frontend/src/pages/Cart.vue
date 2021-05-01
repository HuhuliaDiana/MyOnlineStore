<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="body">
      <div class="flex-child products">
        <CartProduct
          v-on:childToParent="getProducts"
          v-on:productListModified="listModified"
          v-for="item in products"
          :key="item.Product.id"
          :idCartProd="item.id"
          :idProd="item.Product.id"
          :priceProd="item.Product.price"
          :photosProd="item.Product.photos"
          :quantityProd="item.quantity"
          :quantityProduct="item.Product.quantity"
        />
        <div>
          <div
            class="div_lb"
            style="
              font-family: 'Montserrat', sans-serif;
              font-size: 150%;
              margin-top: 7%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Detalii livrare
          </div>
          <div>
            <Order />
          </div>

          <div
            class="div_lb"
            style="
              font-family: 'Montserrat', sans-serif;
              font-size: 150%;
              margin-top: 7%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Modalitate livrare
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="livrare"
              style="font-family: 'Montserrat', sans-serif; font-size: 120%"
              :options="optionsLivrare"
              color="secondary"
              disable
            />
          </div>

          <div
            class="div_lb"
            style="
              font-family: 'Montserrat', sans-serif;
              font-size: 150%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Modalitate de plata
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="plata"
              style="font-family: 'Montserrat', sans-serif; font-size: 120%"
              :options="optionsPlata"
              color="secondary"
              inline
            />
          </div>
        </div>
      </div>
      <div class="flex-child orderSummary">
        <CartPrice :key="shouldRender" style="width: 60%" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import CartProduct from "../components/CartProduct";
import CartPrice from "../components/CartPrice";
import Toolbar from "../components/Toolbar.vue";
import Order from "../components/Order.vue";

export default {
  name: "Cart",
  components: {
    CartProduct,
    CartPrice,
    Toolbar,
    Order,
  },
  data() {
    return {
      products: [],
      optionsLivrare: [
        {
          label: "Prin curier",
          value: "op1",
        },
      ],
      livrare: "op1",
      shouldRender: true,
      plata: null,
      optionsPlata: [
        {
          label: "Ramburs",
          value: "op2",
        },
        {
          label: "Card online",
          value: "op3",
        },
      ],
      val: [],
      cost: 0,
    };
  },

  watch: {
    shouldRender(n, o) {
      this.shouldRender = n;
    },
    val(newVal, oldVal) {
      this.getTheProducts();
    },
  },
  methods: {
    listModified(value) {
      this.shouldRender = !this.shouldRender;
    },

    calcCost() {
      this.products.forEach((prod) => {
        this.cost += prod.Product.price * prod.quantity;
      });
    },
    getProducts(value) {
      this.val = value;
    },
    getTheProducts() {
      axios
        .get("http://localhost:8082/getCartProducts", { withCredentials: true })
        .then((response) => {
          this.products = response.data;

          //calculeaza cost produse
          this.calcCost();
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
  width: 17%;
}
.div_lb {
  background: -webkit-linear-gradient(
    left,
    #26a69b,
    #26a69b 1%,
    #f0f0f0 1%,
    #f0f0f0
  );
}
</style>