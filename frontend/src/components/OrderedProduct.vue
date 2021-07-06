<template>
  <div
    style="
      font-family: 'Montserrat', sans-serif;
      display: flex;
      justify-content: center;
    "
  >
    <div class="product" style="display: flex" v-on:click="seeProduct()">
      <div style="display: flex">
        <div class="divPhoto">
          <img
            class="photos"
            v-bind:src="`../photos/${photosProd.split(', ')[0]}`"
          />
        </div>

        <div class="infoProduct" style="width: 50%">
          <div style="font-weight: bold; font-size: 115%">
            {{ product.brand }} {{ product.model }}
          </div>
          <div style="color: grey">
            {{ product.memInternal }} {{ product.netSpeed }}
            {{ product.memRAM }}
          </div>
        </div>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          margin-right: 20px;
          margin-top: 10px;
          width: fit-content;
        "
      >
        <div
          style="
            display: flex;
            justify-content: flex-end;
            font-size: 110%;
            font-weight: bold;
          "
        >
          {{
            Math.round(
              (product.price - ((product.price * product.discount) / 100)) * 100
            ) / 100
          }}&nbsp;lei
        </div>
        <div>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              margin-bottom: 15%;
              margin-top: 5%;
            "
          >
            {{ quantityProd }}&nbsp;buc.
          </div>
        </div>
        <div style="border-bottom: 1px solid grey"></div>

        <div style="margin-top: 15%">
          &nbsp;<b style="font-size: 110%">{{ Math.round(subtotal*100)/100 }}&nbsp;lei</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
export default {
  props: ["idProd", "priceProd", "photosProd", "quantityProd"],

  data() {
    return {
      product: null,
      reducedPrice: null,
      color: null,
      subtotal: 0,
    };
  },
  watch: {
    product(n, o) {
      this.product = n;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8082/getProduct/${this.idProd}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.product = response.data;
        console.log("orderedproduct");
        this.calcSubtotal();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    calcSubtotal() {
      this.subtotal =
        this.quantityProd *
        (this.product.price -
          (this.product.price * this.product.discount) / 100);
    },
    seeProduct() {
      axios
        .post(`http://localhost:8082/addToViewedProducts`, this.product, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      this.$router.push(`/product/${this.idProd}`);
    },
  },
};
</script>

<style scoped>
.product {
  width: 85%;
  display: flex;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.divPhoto {
  width: 20%;
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
}
.photos {
  width: 100%;
}
.infoProduct {
  margin-top: 10px;
}
.quote {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  background: -webkit-linear-gradient(
    bottom,
    #26a69b,
    #26a69b 10%,
    #ffffff 1%,
    #ffffff
  );
}
</style>