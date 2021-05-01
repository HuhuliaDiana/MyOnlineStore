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
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  data() {
    return {
      products: [],
      cost: 0,
      costF: 0,
      costLivrare: 0,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCartProducts", { withCredentials: true })
      .then((result) => {
        this.products = result.data;
        this.products.forEach((prod) => {
          this.cost += prod.Product.price * prod.quantity;
        });
        if (this.cost > 0) {
          this.costLivrare = 17.5;
        }
        this.costF = this.cost + this.costLivrare;
      });
  },
};
</script>

<style>
</style>