<template>
  <div>
    <div><Toolbar /></div>
    <div>
      <Order
        v-for="order in orders"
        :key="order.id"
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
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getUserOrders", { withCredentials: true })
      .then((res) => {
        this.orders = res.data;
        console.log(this.orders);
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