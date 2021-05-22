<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-left: 3%">
      <div
        class="orderInfo"
        style="display: flex; padding: 3%; flex-direction: column; width: 48%"
      >
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; align-items: center">
            <div style="font-size: 180%" class="material-icons-outlined">
              local_shipping
            </div>
            <div style="margin-left: 15px"><b>Modalitate de livrare:</b></div>
          </div>
          <div>Prin curier</div>
        </div>
        <div
          style="display: flex; justify-content: space-between; margin-top: 5%"
        >
          <div style="display: flex; align-items: center">
            <div style="font-size: 180%" class="material-icons-outlined">
              paid
            </div>
            <div style="margin-left: 15px"><b>Modalitate de plata:</b></div>
          </div>
          <div>{{ paymentMethod }}</div>
        </div>
      </div>
      <div
        class="orderInfo"
        style="display: flex; padding: 3%; flex-direction: column; width: 48%"
      >
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; align-items: center; height: fit-content">
            <div style="font-size: 180%" class="material-icons-outlined">
              account_circle
            </div>
            <div style="margin-left: 15px"><b>Livrat catre:</b></div>
          </div>

          <div>
            <div>{{ lastname }} {{ firstname }}</div>
            <div>{{ phone }}</div>
          </div>
        </div>
        <div
          style="display: flex; justify-content: space-between; margin-top: 5%"
        >
          <div style="display: flex; align-items: center; height: fit-content">
            <div style="font-size: 180%" class="material-icons-outlined">
              home
            </div>
            <div style="margin-left: 15px"><b>Adresa:</b></div>
          </div>
          <div>
            <div>{{ address }}</div>
            <div>{{ town }}, {{ county }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="q-pa-md">
        <q-carousel
          swipeable
          style="height: 250px"
          animated
          v-model="slide"
          ref="carousel"
          infinite
        >
          <q-carousel-slide
            :name="products.indexOf(item)"
            :key="item.id"
            v-for="item in products"
          >
            <OrderedProduct
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
    "phone",
    "county",
    "lastname",
    "firstname",
    "paymentMethod",
  ],
  data() {
    return {
      slide: 1,
      products: [],
      render: true,
    };
  },
  watch: {
    render(n, o) {
      this.render = n;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8082/getProductsFromOrder/${this.id}`, {
        withCredentials: true,
      })
      .then((result) => {
        this.products = result.data;
        console.log("hei");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style scoped>
.orderInfo {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>