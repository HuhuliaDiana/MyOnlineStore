<template>
  <div>
    <div><Toolbar /></div>
    <div
      style="
        display: flex;
        justify-content: center;
        font-family: 'Montserrat', sans-serif;
      "
    >
      <div style="width: 20%">
        <div
          class="orderInfo"
          v-for="order in orders"
          :key="order.id"
          @mouseover="getOrder(order.id)"
        >
          <div v-if="order.id % 2 === 0">
            <div
              style="
                font-size: 170%;
                margin-top: 15%;
                padding: 20px;
                color: #26a69b;
              "
            >
              Comanda nr. {{ order.id }}
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                padding: 20px;
                width: 55%;
              "
            >
              <div style="display: flex; justify-content: space-between">
                <div>Plasata pe:</div>
                <div style="margin-left: 15px">
                  <b> {{ order.createdAt }}</b>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 5%;
                "
              >
                <div>Total plata:</div>
                <div style="margin-left: 15px">
                  <b> {{ order.price }} lei</b>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              style="
                font-size: 170%;
                margin-top: 15%;
                padding: 20px;
                color: #26a69b;
              "
            >
              Comanda nr. {{ order.id }}
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                padding: 20px;
                width: 55%;
              "
            >
              <div style="display: flex; justify-content: space-between">
                <div>Plasata pe:</div>
                <div style="margin-left: 15px">
                  <b> {{ order.createdAt }}</b>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 5%;
                "
              >
                <div>Total plata:</div>
                <div style="margin-left: 15px">
                  <b> {{ order.price }} lei</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="width: 50%; margin-top: 3%; margin-left: 5%">
        <Order
          :shouldRender="render"
          v-if="order !== null"
          :id="order.id"
          :dataPlasare="order.createdAt"
          :town="order.town"
          :county="order.county"
          :phone="order.phone"
          :price="order.price"
          :address="order.address"
          :lastname="order.lastname"
          :paymentMethod="order.paymentMethod"
          :firstname="order.firstname"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";

import Toolbar from "../components/Toolbar.vue";
import Order from "../components/Order.vue";

export default {
  name: "Orders",
  components: {
    Toolbar,
    Order,
  },
  data() {
    return {
      orders: [],
      order: null,
      render: null,
    };
  },
  watch: {
    order(n, o) {
      this.order = n;
      this.render = true;
    },
    render(n, o) {
      this.render = n;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getUserOrders", { withCredentials: true })
      .then((res) => {
        this.orders = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getOrder(key) {
      axios
        .get(`http://localhost:8082/getOrder/${key}`, { withCredentials: true })
        .then((res) => {
          this.order = res.data;
        })
        .catch((err) => {
          console.log(err);
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