<template>
  <div>
    <div><Toolbar disable="true" /></div>
    <div
      v-if="orders.length > 0"
      style="
        display: flex;
        justify-content: center;
        margin-top: 5%;
        font-family: 'Montserrat', sans-serif;
      "
    >
      <div class="q-ma-md" style="width: 23%">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          :visible="visible"
          style="height: 610px"
        >
          <div class="q-py-xs" v-for="order in orders" :key="order.id">
            <div
              class="orders"
              style="
                display: flex;

                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 90%;
              "
            >
              <div
                style="
                  display: flex;
                  margin-bottom: 5%;
                  justify-content: space-between;

                  width: 100%;
                "
              >
                <div style="margin-left: 10px">
                  <div style="font-size: 170%; padding: 20px; color: #26a69b">
                    Comanda nr. {{ order.id }}
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      padding: 20px;
                      width: 110%;
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
                <div style="margin-top: 26%; height: 100%">
                  <q-icon
                    name="chevron_right"
                    style="
                      margin-left: 17%;
                      font-size: 200%;
                      margin-right: 20px;
                      color: #26a69b;
                    "
                    class="cursor-pointer"
                    @click="getOrder(order.id)"
                  />
                </div>
              </div>
              <div>
                <q-btn
                  style="
                    font-size: 80%;
                    font-weight: 400;
                    margin-bottom: 15%;
                    color: #26a69b;
                  "
                  label="Anulează comanda"
                  @click="ceva(order.id)"
                />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <div style="width: 50%; margin-left: 5%">
        <Order
          :key="render"
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
    <div v-else style="margin-top: 8%; text-align: center">
      <div
        style="
          font-family: 'Montserrat', sans-serif;
          font-size: 300%;
          color: #383838;
        "
      >
        Nu ați realizat comenzi!
      </div>
      <img style="width: 15%; margin-top: 10%" src="photos/emptyCart.svg" />
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="font-family: 'Montserrat', sans-serif; width: 400px">
        <q-card-section
          class="row items-center"
          style="background-color: #26a69b; color: white; font-size: 120%"
        >
          <span class="q-ml-sm" style="margin-top: 3%"
            >Sigur doresti anularea comenzii?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="DA"
            color="secondary"
            v-close-popup
            @click="cancelOrder"
          />
          <q-btn flat label="NU" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      idOrderCancel: null,
      orders: [],
      order: null,
      visible: true,
      render: false,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#26a69b",
        width: "5px",
        opacity: 0.75,
      },

      confirm: false,

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#26a69b",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  watch: {
    order(n, o) {},
    render(n, o) {
      console.log("a randat......." + this.render);
    },
    idOrderCancel() {},
    orders() {},
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
  methods: {
    ceva(key) {
      this.confirm = true;
      this.idOrderCancel = key;
      console.log(this.idOrderCancel);
    },
    cancelOrder() {
      axios
        .delete(`http://localhost:8082/cancelOrder/${this.idOrderCancel}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.orders = res.data;
          this.$router.go();
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Comanda a fost anulata!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOrder(key) {
      axios
        .get(`http://localhost:8082/getOrder/${key}`, { withCredentials: true })
        .then((res) => {
          this.order = res.data;
          this.render = !this.render;
          console.log("am apasat");
          console.log(this.order);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.orders {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background: -webkit-linear-gradient(
    left,
    #26a69b,
    #26a69b 1%,
    #ffffff 1%,
    #ffffff
  );
}
.q-py-xs:not(:last-child) {
  margin-bottom: 10%;
}
</style>