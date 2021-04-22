<template>
  <div>
    <!-- div intreg -->
    <div
      :style="myDiv"
      style="font-family: 'Montserrat', sans-serif"
      class="product"
      v-on:click.self="seeProduct()"
    >
      <!-- div heart rating -->

      <!-- div photo -->
      <div class="divPhoto">
        <img
          class="photos"
          v-bind:src="`../photos/${photosProd.split(', ')[0]}`"
        />
      </div>

      <!-- div info -->

      <div class="infoProduct">
        <div style="font-weight: bold; font-size: 115%">
          {{ product.brand }} {{ product.model }}
        </div>
        <div style="color: grey">
          {{ product.memInternal }} {{ product.netSpeed }} {{ product.memRAM }}
        </div>
        <div style="font-size: 90%; margin-top: 20px">
          <div>
            <span style="color: grey">Disponibilitate: </span>
            <span :style="{ color: color }">
              {{ getStockStatus() }}
            </span>
          </div>
          <div style="color: grey">Garantie inclusa: 24 luni</div>
        </div>
      </div>

      <!-- div principal -->
      <div
        style="width: 25%; margin-left: 13%; display: block; margin-right: 11%"
      >
        <!-- div cantitate -->
        <div style="display: flex; flex-flow: row wrap; margin-top: 10px">
          <div style="margin-top: 3px">
            <q-btn
              size="7px"
              flat
              round
              :disabled="number === 1"
              style="background-color: #f0f0f0"
              color="grey"
              icon="remove"
              @click="minus_1()"
            />
          </div>
          <div style="margin-right: 8px; margin-left: 8px; margin-top: 3px">
            <span style="font-size: 15px">{{ number }}</span>
          </div>
          <div style="margin-top: 3px">
            <q-btn
              size="7px"
              flat
              :disabled="quantityProduct === 0"
              style="background-color: #f0f0f0"
              color="grey"
              round
              icon="add"
              @click="plus_1()"
            />
          </div>
        </div>

        <!-- div pret -->
        <div>
          <div
            style="margin-top: 15%; display: flex"
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

          <div style="margin-top: 25%; font-size: 20px" v-else>
            <div>{{ priceProd }} lei</div>
          </div>
        </div>
      </div>

      <div
        style="
          margin-top: 10px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div>
          <q-rating
            v-model="fav"
            max="1"
            style="margin-left: 17%"
            size="2em"
            color="orange"
            color-selected="orange"
            icon="favorite_border"
            icon-selected="favorite"
            no-dimming
            @click="onFav"
          />
        </div>
        <div>
          <q-btn
            size="12px"
            round
            icon="delete"
            color="secondary"
            @click="deleteProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
export default {
  props: [
    "idProd",
    "priceProd",
    "photosProd",
    "quantityProd",
    "quantityProduct",
    "idCartProd",
  ],

  data() {
    return {
      fav: null,
      product: null,
      username: null,
      reducedPrice: null,
      quantity: null,
      color: null,

      number: null,
    };
  },

  watch: {
    number(newVal, oldVal) {
      if (newVal !== oldVal) {
        axios
          .patch(
            `http://localhost:8082/modifyQuantity/${this.idProd}`,
            { quantity: newVal },
            { withCredentials: true }
          )
          .then(() => {
            axios
              .get(`http://localhost:8082/getProduct/${this.idProd}`, {
                withCredentials: true,
              })
              .then((result) => {
                console.log(result.data);
                this.quantityProduct = result.data.quantity;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.number = this.quantityProd;
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    minus_1() {
      this.number--;
    },
    plus_1() {
      this.number++;
    },
    deleteProduct() {
      axios
        .delete(`http://localhost:8082/deleteCartProduct/${this.idCartProd}`, {
          withCredentials: true,
        })
        .then((response) => {
          this.$emit("childToParent", response.data);
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
      if (this.product.quantity > 0 && this.product.quantity <= 15) {
        this.color = "orange";
        return "Stoc limitat";
      } else if (this.product.quantity > 15) {
        this.color = "green";
        return "In stoc";
      } else if (this.product.quantity == 0) {
        this.color = "red";
        return "Stoc epuizat";
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
  width: 95%;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>