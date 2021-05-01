<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="myDiv">
      <!-- 
 -->

      <!-- <div class="q-pa-md">
      <div class="q-gutter-y-md column">
        <q-rating
          v-model="setRating"
          max="5"
          size="3em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          no-dimming
          @click="setRatingProduct"
          :disable="setRating !== null"
        />
      </div>
    </div>
   -->
      <div class="body" style="font-family: 'Montserrat', sans-serif">
        <div style="height: 500px; width: 400px">
          <div :key="product">
            <q-carousel
              style="height: 500px"
              animated
              v-model="slide"
              padding
              arrows
              control-color="grey"
            >
              <q-carousel-slide
                v-for="photo in photos"
                :key="photo"
                :name="photos.indexOf(photo)"
              >
                <div
                  class="fit items-center q-gutter-xs q-col-gutter no-wrap"
                  style="width: 100%; height: 100%"
                >
                  <q-img
                    class="rounded-borders col-6 full-height"
                    :src="`../photos/${photo}`"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
        <div class="infoProduct">
          <div style="font-weight: bold; font-size: 200%">
            {{ product.brand }} {{ product.model }}
          </div>
          <div style="font-size: 150%">
            {{ product.memInternal }} {{ product.netSpeed }}
            {{ product.memRAM }}
          </div>

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
                    font-size: 25px;
                  "
                >
                  {{ product.price }} lei
                </div>
                <div style="font-size: 35px">
                  {{ product.price - (product.price * product.discount) / 100 }}
                  lei
                </div>
              </div>

              <div>
                <q-badge
                  color="red"
                  align="top"
                  style="margin-left: 20px; margin-top: 10px"
                  >- {{ product.discount }} %</q-badge
                >
              </div>
            </div>

            <div style="margin-top: 25%; font-size: 20px" v-else>
              <div>{{ priceProd }} lei</div>
            </div>
          </div>

          <div style="display: flex; align-items: center">
            <div style="margin-top: auto" class="q-gutter-y-md column">
              <q-rating
                v-model="getRating"
                max="5"
                size="2em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                no-dimming
                disable
              />
            </div>
            <div
              style="
                color: grey;
                margin-top: 20px;
                margin-left: 10px;
                font-size: 95%;
              "
            >
              {{ nrReviews }} reviews
            </div>
          </div>
          <div class="fav" style="display: flex; margin-top: 10%">
            <div class="material-icons" style="font-size: 200%; color: orange">
              favorite
            </div>
            <div style="margin: auto; font-size: 120%; color: #ff8c00">
              Ai apreciat acest produs!
            </div>
          </div>
          <div style="display: flex; margin-top: 10%; font-size: 110%">
            <span style="color">Disponibilitate: </span>
            <div style="margin-left: 3%" :style="{ color: color }">
              {{ getStockStatus() }}
            </div>
          </div>
          <div style="margin-top: 10%; font-size: 110%">
            <span>Garantie standard:</span>

            <ul>
              <li>Persoane fizice: 24 luni</li>
              <li>Persoane juridice: 12 luni</li>
            </ul>
          </div>
        </div>
        <div
          style="
            width: 17%;
            margin-top: 25px;
            margin-left: 5%;
            display: flex;
            flex-direction: column;
          "
        >
          <div>
            <div style="display: flex; align-items: center">
              <span
                class="material-icons"
                style="font-size: 170%; margin-right: 5px"
                >schedule</span
              >
              <span>Livrare <b>1-3 zile</b> lucratoare</span>
            </div>
            <div style="display: flex; align-items: center; margin-top: 10px">
              <span
                class="material-icons"
                style="font-size: 170%; margin-right: 5px"
                >forward_30</span
              >
              <span>Retur gratuit in <b>30 de zile</b></span>
            </div>
          </div>
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              style="
                padding: 3px;
                width:70%;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                margin-top: 25px;
              "
              color="secondary"
              icon="shopping_cart"
              label="Adauga in cos"
            />
          </div>
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              style="padding: 3px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;width:70%;"
              color="red"
              icon-right="send"
              label="Trimite sugestie"
              @click="getFormSuggestion"
            />
            <q-tooltip
              anchor="center right"
              self="bottom middle"
              :offset="[10, 10]"
              content-style="font-size: 12px;text-align:center;background-color:#ffe5b4;color:black;
            font-family: 'Montserrat', sans-serif"
            >
              Recomanda acest produs unui prieten si in urma achizitiei<br />
              beneficiati amandoi de <i>reducerea de 10%</i> la urmatoarea
              comanda!
            </q-tooltip>
          </div>
          <div
            id="formSuggestion"
            style="
              visibility: hidden;
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              margin-top: 10px;
            "
          >
            <div class="q-pa-md">
              <div class="q-gutter-md">
                <q-input
                  id="qinput_email"
                  v-model="email"
                  label="Catre:"
                  color="secondary"
                  hint="Email"
                />
                <q-input
                  outlined
                  v-model="text"
                  style="margin-top: 30px"
                  label="Nota:"
                  color="secondary"
                />
                <div style="display: flex; justify-content: flex-end">
                  <q-btn
                    round
                    color="secondary"
                    icon="send"
                    @click="sendSugestion"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="characteristics"
          style="
            display: flex;
            margin: auto;
            margin-top: 5%;
            flex-flow: row wrap;
            justify-content: center;
            width: 50%;
          "
        >
          <div
            v-for="option in options"
            :key="option.label"
            style="
              border-radius: 10px;

              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              padding: 30px;

              width: fit-content;
              height: 90px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              margin-right: 10px;
              margin-bottom: 10px;
            "
          >
            <div style="color: grey; font-size: 90%">{{ option.label }}</div>
            <div
              style="
                font-size: 150%;
                font-family: 'Arial Narrow', Arial, sans-serif;
              "
            >
              {{ option.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import Toolbar from "../components/Toolbar.vue";

export default {
  name: "Product",
  components: {
    Toolbar: Toolbar,
  },

  data() {
    return {
      setRating: null,
      getRating: 0,
      product: null,
      color: null,
      idProduct: null,
      nrReviews: null,
      photos: [],
      slide: 1,
      email: null,
      fav: null,
      options: [],
      qinput: document.getElementById("qinput_email"),
    };
  },

  watch: {
    email(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.email = newVal;
      }
    },
  },

  mounted() {
    this.getProduct();
    this.getNrReviews();
    axios
      .get(`http://localhost:8082/getUserRatingProduct/${this.idProduct}`, {
        withCredentials: true,
      })
      .then((result) => {
        this.setRating = result.data.rating;
      });
    axios
      .get(`http://localhost:8082/getRatingProduct/${this.idProduct}`, {
        withCredentials: true,
      })
      .then((result) => {
        this.getRating = result.data.rating;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getFormSuggestion() {
      const div = document.getElementById("formSuggestion");
      div.style.visibility = "visible";
    },
    getNrReviews() {
      axios
        .get(`http://localhost:8082/getNumberRatings/${this.idProduct}`, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result.data);
          this.nrReviews = result.data.nrRatings;
        })
        .catch((err) => {
          console.log(err);
        });
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
    getProduct() {
      const url = document.location.href;
      const splits = url.split("/");
      this.idProduct = splits[splits.length - 1];

      axios
        .get(`http://localhost:8082/getProduct/${this.idProduct}`, {
          withCredentials: true,
        })
        .then((result) => {
          this.product = result.data;

          this.options.push(
            {
              label: "RAM",
              value: this.product.memRAM,
            },
            {
              label: "Memory internal",
              value: this.product.memInternal,
            },
            {
              label: "Network speed",
              value: this.product.netSpeed,
            },
            {
              label: "Main Cam",
              value: this.product.mainCam,
            },
            {
              label: "Selfie Cam",
              value: this.product.selfieCam,
            },

            {
              label: "Display size",
              value: this.product.displaySize,
            },
            {
              label: "Battery",
              value: this.product.battery,
            },
            {
              label: "USB",
              value: this.product.USB,
            },
            {
              label: "Display resolution",
              value: this.product.displayRes,
            },

            {
              label: "Dimensions",
              value: this.product.dimensions,
            }
          );
          this.photos = this.product.photos.split(", ");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setRatingProduct() {
      axios
        .patch(
          `http://localhost:8082/updateRating/${this.idProduct}`,
          {
            rating: this.setRating,
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(result.data);
          this.getRating = this.setRating;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseToSendSugestion() {},
    sendSugestion() {
      const body = { to: this.email, productId: this.idProduct };
      console.log(body);
      axios
        .post("http://localhost:8082/sendProductSugestion", body, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result.data.message);
        })
        .catch((err) => {
          const errors = Object.values(err.response.data);
          errors.map((e) => {
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "warning",
              message: e,
            });
          });
        });
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  height: fit-content;
}
.infoProduct {
  margin-left: 50px;
  height: fit-content;
  margin-top: 15px;
}
</style>