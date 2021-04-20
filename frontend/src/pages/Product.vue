<template>
  <div>
    <!-- <q-btn
      label="Send product as sugestion"
      @click="chooseToSendSugestion"
      color="primary"
    /> -->
    <q-input
      id="qinput_email"
      v-model="email"
      label="Send to:"
      hint="User email"
    />

    <q-btn label="Send sugestion" @click="sendSugestion" color="primary" />
    <div class="q-pa-md">
      <div class="q-gutter-y-md column">
        <q-rating
          v-model="setRating"
          max="7"
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
    <div>
      {{ product.id }}
      {{ product.brand }}
      {{ product.quantity }}
      {{ product.price }}
    </div>

    <div class="q-pa-md" :key="product">
      <q-carousel animated v-model="slide" arrows navigation infinite>
        <q-carousel-slide
          v-for="photo in photos"
          :key="photo"
          :name="photos.indexOf(photo)"
          v-bind:img-src="`../photos/${photo}`"
        />
      </q-carousel>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column">
        <q-rating
          v-model="getRating"
          max="7"
          size="3em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          no-dimming
          disable
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
export default {
  name: "Product",
  data() {
    return {
      setRating: null,
      getRating: 0,
      product: null,
      idProduct: null,
      photos: [],
      slide: 1,
      email: null,
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

<style>
</style>