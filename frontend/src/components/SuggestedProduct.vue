<template>
  <div
    style="
      font-family: 'Montserrat', sans-serif;
      display: flex;
      flex-direction: row;
      margin-top: 5%;
    "
  >
    <div
      :style="myDiv"
      class="product"
      v-on:click.self="seeProduct()"
    >
      <div class="divPhoto">
        <img
          class="photos"
          v-bind:src="`../photos/${photosProd.split(',')[0]}`"
        />
      </div>

      <div class="infoProduct" style="width: 26%">
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
        </div>
      </div>

      <div
        style="width: 25%; margin-left: 13%; display: block; margin-right: 11%"
      >
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
                {{
                  Math.round(
                    (product.price - (product.price * product.discount) / 100) *
                      100
                  ) / 100
                }}
                lei
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
          display: flex;
          padding: 5px;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div>
          <q-rating
            v-model="fav"
            max="1"
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
          <q-icon
            name="clear"
            style="margin-left: 17%"
            class="cursor-pointer"
            @click="deleteProduct"
          />
        </div>
      </div>
    </div>
    <div
      class="quote"
      v-if="note !== ''"
      style="width: 25%; margin-left: 5%; text-align: center"
    >
      <div style="display: flex; justify-content: flex-end">
        <div class="material-icons" style="color: #26a69b; font-size: 35px">
          format_quote
        </div>
      </div>

      <div
        style="
          padding: 10px;
          font-style: italic;
          color: #404040;
          margin-top: 5%;
        "
      >
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
export default {
  props: ["idProd", "priceProd", "photosProd", "idCartProd", "userId", "note"],

  data() {
    return {
      fav: null,
      product: null,
      username: null,
      reducedPrice: null,
      color: null,

      number: null,
    };
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
      })
      .catch((err) => {
        console.log(err);
      });
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

    deleteProduct() {
      axios
        .delete(
          `http://localhost:8082/removeSuggestion/${this.idProd}/${this.userId}`,
          {
            withCredentials: true,
          }
        )
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
  width: 65%;
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