<template>
  <div>
    <div>Comanda nr. {{ id }}</div>
    <div>Plasata pe {{ dataPlasare }}</div>
    <div>Livrat catre: {{ lastname }} {{ firstname }}</div>
    <div>Adresa: {{ address }}, {{ town }}, {{ county }}</div>
    <div>Modalitate livrare: Prin curier</div>
    <div>Modalitate de plata: {{ paymentMethod }}</div>
    <div>Total plata: {{ price }} lei</div>
    <div style="width: 40%" class="q-pa-md">
      <q-carousel
        swipeable
        style="height: 200px"
        animated
        v-model="slide"
        ref="carousel"
        infinite
      >
        <q-carousel-slide :name="1" >
          <OrderedProduct
            v-for="item in products"
            :key="item.Product.id"
            :idCartProd="item.id"
            :idProd="item.Product.id"
            :priceProd="item.Product.price"
            :photosProd="item.Product.photos"
            :quantityProd="item.quantity"
          />
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
            class="q-gutter-xs"
          >
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import OrderedProduct from "../components/OrderedProduct";
import axios from "../boot/axios";

export default {
  name: "Order",
  components: {
    OrderedProduct,
  },

  props: [
    "id",
    "dataPlasare",
    "address",
    "town",
    "price",
    "county",
    "lastname",
    "firstname",
    "paymentMethod",
  ],
  data() {
    return {
      slide: 1,
      products: [],
      autoplay: false,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:8082/getProductsFromOrder/${this.id}`, {
        withCredentials: true,
      })
      .then((result) => {
        this.products = result.data;
        console.log(this.products);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style>
</style>