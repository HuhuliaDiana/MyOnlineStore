<template>
  <div>
    <div
      :style="myStyle"
      style="font-family: 'Montserrat', sans-serif"
      class="product"
      v-on:click.self="seeProduct()"
    >
      <div style="display: flex; justify-content: flex-end">
        <q-rating
          style="margin-top: 10px; margin-right: 10px"
          v-model="fav"
          max="1"
          size="2.5em"
          color="orange"
          color-selected="orange"
          icon="favorite_border"
          icon-selected="favorite"
          no-dimming
          @click="onFav"
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

      <div
        style="margin-top: 30px; margin-left: 20px; display: flex"
        v-if="product.discount !== 0"
      >
        <div>
          <div
            style="text-decoration: line-through; color: grey; font-size: 15px"
          >
            {{ priceProd }} lei
          </div>
          <div style="font-size: 20px">
            {{ product.price - product.discount / 100 }} lei
          </div>
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

      <div style="margin-top: 52px; margin-left: 20px; font-size: 20px" v-else>
        <div>{{ priceProd }} lei</div>
      </div>

      <div style="display: flex; margin-top: 30px">
        <div style="flex: 1; margin-left: 20px">
          <q-btn
            :disabled="quantity === 0"
            round
            icon="add"
            color="secondary"
            @click="addProductInCart()"
          />
        </div>
        <div
          style="flex: 1; margin-top: 10px; margin-left: 60px"
          :style="{ color: color }"
        >
          {{ stockStatus }}
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
      username: null,
      reducedPrice: null,
      stockStatus: null,
      color: null,
    };
  },
  watch: {
    stockStatus(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    },
  },

  mounted() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
        this.stockStatus = "In stoc";
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
          this.quantity = response.data.quantity;
          console.log(this.quantity);
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