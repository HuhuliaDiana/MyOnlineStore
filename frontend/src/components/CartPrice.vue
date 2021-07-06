<template>
  <div style="display: table; font-family: 'Montserrat', sans-serif">
    <div>
      <span style="width: 100%; font-size: 140%; font-weight: bold">
        Sumar comandă
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
        <div>{{ Math.round(costProduse * 100) / 100 }} lei</div>
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
      <div>{{ Math.round(costF * 100) / 100 }} lei</div>
    </div>
    <div v-if="discount !== 0" style="margin-top: 15%; text-align: center">
      <q-btn
        color="secondary"
        :disabled="costProduse === 0"
        label="Aplica reducere"
        style="font-size: 90%"
        @click="applyDiscount"
      >
        <q-tooltip
          content-style="font-size: 12px;text-align:center;background-color:#ffe5b4; color:black; font-family: 'Montserrat', sans-serif"
        >
          Folosește reducerea de<b> 10%</b> pentru această comandă!
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  props: ["ceva", "costProduse", "costLivrare", "costF"],

  data() {
    return {
      products: [],
      cost: 0,
      discount: 0,
      costFinal: 0,
    };
  },

  watch: {
    cost() {},
    discount() {},
  },

  methods: {
    applyDiscount() {
      axios
        .patch(
          "http://localhost:8082/deleteDiscount",
          {},
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Ai aplicat reducerea de 10%!",
          });
          this.costFinal = this.costF - this.costF / 10;
          this.$emit("transmitFinalCost", this.costFinal);
          this.discount = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCurrentUser", {
        withCredentials: true,
      })
      .then((result) => {
        this.discount = result.data.discount;
        console.log(this.discount);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>