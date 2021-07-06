<template>
  <div>
    <div
      style="
        font-family: 'Montserrat', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 16px;
      "
      class="product"
      v-on:click="seeProduct()"
    >
      <div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <q-badge
            font-size="15px"
            text-color="white"
            style="
              background-color: #ff4d4d;
              margin-left: 10px;
              margin-top: 10px;
            "
            :label="isNew"
          />

          <q-rating
            style="margin-right: 10px; height: 100%; margin-top: 10px"
            v-model="fav"
            max="1"
            size="2.5em"
            color="orange"
            color-selected="orange"
            icon="favorite_border"
            icon-selected="favorite"
            no-dimming
            v-on:click.stop.prevent="onFav"
          />
        </div>
        <div>
          <img
            class="photos"
            v-bind:src="`../photos/${photosProd.split(', ')[0]}`"
          />
        </div>
        <div style="margin-left: 20px">
          <div style="font-size: 17px; margin-top: 20px; font-weight: bold">
            {{ product.brand }}
          </div>
          <div>
            {{ product.model }} {{ product.memInternal }} {{ product.netSpeed }}
            {{ product.memRAM }}
          </div>
        </div>
      </div>

      <div>
        <div
          style="margin-top: 30px; margin-left: 20px; display: flex"
          v-if="product.discount !== 0"
        >
          <div>
            <div
              style="
                text-decoration: line-through;
                color: grey;
                font-size: 15px;
              "
            >
              {{ priceProd }} lei
            </div>
            <div style="font-size: 20px">{{ priceReduced }} lei</div>
          </div>

          <div>
            <q-badge
              color="red"
              align="top"
              style="margin-left: 20px; margin-top: 2px"
              >- {{ product.discount }} %</q-badge
            >
          </div>
        </div>

        <div
          style="margin-top: 52px; margin-left: 20px; font-size: 20px"
          v-else
        >
          <div>{{ priceProd }} lei</div>
        </div>

        <div
          style="display: flex; margin-top: 5%; justify-content: space-between"
        >
          <div style="margin-left: 20px">
            <q-btn
              :disabled="quantity === 0"
              round
              icon="add"
              color="secondary"
              v-on:click.stop.prevent="addProductInCart"
            />
          </div>
          <div
            style="margin-right: 10%; margin-top: 4%"
            :style="{ color: color }"
          >
            {{ stockStatus }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
export default {
  props: ["idProd", "priceProd", "photosProd"],

  data() {
    return {
      fav: null,
      product: null,
      quantity: null,
      isNew: "",
      username: null,
      reducedPrice: null,
      stockStatus: null,
      color: null,
      priceReduced: null,
    };
  },
  watch: {
    stockStatus(newVal, oldVal) {},
  },

  mounted() {
    this.checkProductNew();

    axios
      .get(`http://localhost:8082/checkFavProduct/${this.idProd}`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data !== "") {
          this.fav = 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8082/getProduct/${this.idProd}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.product = response.data;
        this.quantity = this.product.quantity;
        this.getStockStatus();
        const num =
          this.product.price -
          (this.product.price * this.product.discount) / 100;
        this.priceReduced = Math.round(num * 100) / 100;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    checkProductNew() {
      axios
        .get(`http://localhost:8082/checkIfProductIsNew/${this.idProd}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data !== null) {
            this.isNew = "Nou!";
            console.log(this.isNew);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onFav() {
      if (this.fav === 1) {
        //add to favorites

        axios
          .post("http://localhost:8082/addFavProduct", this.product, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //delete from favorites

        axios
          .delete(`http://localhost:8082/deleteFavProduct/${this.idProd}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getStockStatus() {
      if (this.quantity > 0 && this.quantity <= 15) {
        this.color = "orange";
        this.stockStatus = "Stoc limitat";
      } else if (this.quantity > 15) {
        this.color = "green";
        this.stockStatus = "În stoc";
      } else if (this.quantity == 0) {
        this.color = "red";
        this.stockStatus = "Stoc epuizat";
      }
    },
    addProductInCart() {
      axios
        .post(`http://localhost:8082/addProductInCart`, this.product, {
          withCredentials: true,
        })
        .then((response) => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Ai adăugat un produs în coș!",
          });
          this.quantity = response.data.quantity;
          this.getStockStatus();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seeProduct() {
      // add product to last viewed products

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
  width: 280px;
  height: 560px;
  justify-content: center;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.photos {
  width: 80%;
  height: 50%;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>