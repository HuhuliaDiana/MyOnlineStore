<template>
  <div style="display: table; font-family: 'Montserrat', sans-serif">
    <div>
      <span style="width: 100%; font-size: 140%; font-weight: bold">
        Sumar comanda
      </span>
    </div>
    <div style="display: table; margin-top: 10%; width: 100%">
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div>Cost produse:</div>
        <div>{{ cost }} lei</div>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div>Cost livrare:</div>
        <div>{{ costLivrare }} lei</div>
      </div>
    </div>
    <div
      style="margin-top: 10%; border-bottom: 1px solid rgba(0, 0, 0, 0.25)"
    ></div>
    <div
      style="
        font-size: 120%;
        margin-top: 10%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: bold;
      "
    >
      <div>Total:</div>
      <div>{{ costF }} lei</div>
    </div>
    <div v-if="discount !== 0" style="margin-top: 15%; text-align: center">
      <q-btn
        color="secondary"
        label="Aplica reducere"
        style="font-size: 90%"
        @click="applyDiscount"
      >
        <q-tooltip
          content-style="font-size: 12px;text-align:center;background-color:#ffe5b4; color:black; font-family: 'Montserrat', sans-serif"
        >
          Foloseste reducerea de<b> 10%</b> pentru aceasta comanda!
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  data() {
    return {
      products: [],
      cost: 0,
      discount: 0,
      costF: 0,
      costLivrare: 0,
    };
  },
  watch: {
    costF(n, o) {
      this.costF = n;
    },
    discount(n, o) {
      this.discount = n;
    },
  },

  methods: {
    applyDiscount() {
      //sterge discountul din userDB
      axios
        .patch(
          "http://localhost:8082/deleteDiscount",
          { initialDiscount: 0 },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          this.costF = this.costF - this.costF / 10;
          this.discount = 0;
        })
        .catch((err) => {
          console.log(err);
        });

      //aplica discount
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCartProducts", { withCredentials: true })
      .then((result) => {
        this.products = result.data;
        this.products.forEach((prod) => {
          this.cost +=
            (prod.Product.price -
              (prod.Product.price * prod.Product.discount) / 100) *
            prod.quantity;
        });
        if (this.cost > 0) {
          this.costLivrare = 17.5;
        }
        this.costF = this.cost + this.costLivrare;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8082/getCurrentUser", {
        withCredentials: true,
      })
      .then((result) => {
        this.discount = result.data.discount;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>