<template>
  <div>
    <div style="text-align: center">
      <img style="width: 12%" src="photos/packing-list.png" />
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-left: 3%;
        margin-top: 5%;
      "
    >
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
            <div style="margin-left: 15px"><b>Modalitate de plată:</b></div>
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
            <div style="margin-left: 15px"><b>Livrat către:</b></div>
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
    <div style="">
      <div class="q-pa-md" style="">
        <q-carousel
          swipeable
          style="height: 250px"
          animated
          v-model="slide"
          ref="carousel"
          infinite
        >
          <q-carousel-slide
            :name="products.indexOf(item) + 1"
            :key="item.id"
            v-for="item in products"
          >
            <OrderedProduct
              :shouldRender="render"
              :key="item.Product.id"
              :idCartProd="item.id"
              :idProd="item.Product.id"
              :priceProd="item.Product.price"
              :photosProd="item.Product.photos"
              :quantityProd="item.quantity"
            />
          </q-carousel-slide>
        </q-carousel>
        <div class="row justify-center">
          <q-btn-toggle
            toggle-color="secondary"
            keep-color
            v-model="slide"
            :options="options"
          />
        </div>
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
      options: [],
      render: false,
    };
  },
  watch: {
    render(n, o) {
      this.render = true;
    },
    products(n, o) {
      this.products = n;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8082/getProductsFromOrder/${this.id}`, {
        withCredentials: true,
      })
      .then((result) => {
        this.products = result.data;
        this.render = !this.render;
        this.getOptions();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getOptions() {
      this.products.forEach((product) => {
        this.options.push({
          label: this.products.indexOf(product) + 1,
          value: this.products.indexOf(product) + 1,
        });
      });
    },
  },
};
</script>

<style scoped>
.orderInfo {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>