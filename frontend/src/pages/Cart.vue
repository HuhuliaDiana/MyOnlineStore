<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div class="body">
      <div class="flex-child products">
        <div v-if="cost !== 0">
          <CartProduct
            v-on:childToParent="getProducts"
            v-on:productListModified="listModified"
            v-for="item in products"
            :key="item.Product.id"
            :idCartProd="item.id"
            :idProd="item.Product.id"
            :priceProd="item.Product.price"
            :photosProd="item.Product.photos"
            :quantityProd="item.quantity"
            :quantityProduct="item.Product.quantity"
          />
        </div>
        <div v-else>
          <div
            style="
              font-family: 'Montserrat', sans-serif;
              font-weight: bold;
              font-size: 150%;
            "
          >
            Cosul de cumparaturi este gol!
          </div>
        </div>
        <div style="font-family: 'Montserrat', sans-serif">
          <div
            class="div_lb"
            style="
              font-size: 150%;
              margin-top: 7%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Detalii livrare
          </div>
          <div>
            <DeliveryData
              v-on:sendTown="getTown"
              v-on:sendLastname="getLastname"
              v-on:sendFirstname="getFirstname"
              v-on:sendAddress="getAddress"
              v-on:sendPhone="getPhone"
              v-on:sendCounty="getCounty"
            />
          </div>

          <div
            class="div_lb"
            style="
              font-size: 150%;
              margin-top: 7%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Modalitate livrare
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="livrare"
              style="font-size: 120%"
              :options="optionsLivrare"
              color="secondary"
              disable
            />
          </div>

          <div
            class="div_lb"
            style="
              font-size: 150%;
              background-color: #f0f0f0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
            "
          >
            Modalitate de plata
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="plata"
              style="font-size: 120%"
              :options="optionsPlata"
              color="secondary"
              inline
              @input="onClickPaymentMethod(plata)"
            />
          </div>
          <div style="margin-top: 3%; text-align: center; margin-bottom: 8%">
            <q-btn
              color="secondary"
              :disabled="validation"
              label="Trimite comanda"
              @click="sendOrder"
            />
          </div>
        </div>
      </div>
      <div class="flex-child orderSummary" style="margin-left: 3%">
        <CartPrice style="width: 60%" v-on:transmitFinalCost="getFinalCost" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import CartProduct from "../components/CartProduct";
import CartPrice from "../components/CartPrice";
import Toolbar from "../components/Toolbar.vue";
import DeliveryData from "../components/DeliveryData.vue";

export default {
  name: "Cart",
  components: {
    CartProduct,
    CartPrice,
    Toolbar,
    DeliveryData,
  },
  data() {
    return {
      products: [],
      optionsLivrare: [
        {
          label: "Prin curier",
          value: "op1",
        },
      ],
      livrare: "op1",
      shouldRender: true,
      plata: null,
      optionsPlata: [
        {
          label: "Ramburs",
          value: "Ramburs",
        },
        {
          label: "Card online",
          value: "Card online",
        },
      ],
      val: [],
      cost: 0,
      town: null,
      county: null,
      address: null,
      phone: null,
      validation: null,
      lastname: null,
      firstname: null,
      paymentMethod: null,
    };
  },

  watch: {
    shouldRender() {},
    val() {},
    cost() {
      console.log(this.cost);
    },
    plata() {},
    county() {
      this.getValidation();
    },
    town() {
      this.getValidation();
    },
    address() {
      this.getValidation();
    },
    phone() {
      this.getValidation();
    },
    lastname() {
      this.getValidation();
    },
    firstname() {
      this.getValidation();
    },
    paymentMethod() {
      this.getValidation();
    },
  },
  methods: {
    getFinalCost(value) {
      this.cost = value;
    },
    onClickPaymentMethod(value) {
      this.paymentMethod = value;
    },
    getTown(value) {
      this.town = value;
      console.log(this.town);
    },
    getFirstname(value) {
      this.firstname = value;
      console.log(this.firstname);
    },
    getLastname(value) {
      this.lastname = value;
      console.log(this.lastname);
    },
    getAddress(value) {
      this.address = value;
      console.log(this.address);
    },
    getCounty(value) {
      this.county = value;
      console.log(this.county);
    },
    getPhone(value) {
      this.phone = value;
      console.log(this.phone);
    },
    listModified(value) {
      this.shouldRender = !this.shouldRender;
      this.$router.go();
    },
    sendOrder() {
      axios
        .post(
          "http://localhost:8082/orderCart",
          {
            town: this.town,
            county: this.county,
            phone: this.phone,
            address: this.address,
            lastname: this.lastname,
            firstname: this.firstname,
            paymentMethod: this.paymentMethod,
            price: this.cost,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          
          axios
            .get("http://localhost:8082/getDiscountForSendingSuggestion", {
              withCredentials: true,
            })
            .then((result) => {
              console.log(result.data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },

    // calcCost() {
    //   this.products.forEach((prod) => {
    //     this.cost += prod.Product.price * prod.quantity;
    //   });
    // },
    getProducts(value) {
      this.val = value;
    },
    getTheProducts() {
      axios
        .get("http://localhost:8082/getCartProducts", { withCredentials: true })
        .then((response) => {
          this.products = response.data;

          //calculeaza cost produse
          // this.calcCost();
        });
    },
    getValidation() {
      this.validation =
        this.cost === 0 ||
        !this.paymentMethod ||
        !this.town ||
        !this.county ||
        !this.phone ||
        !this.address ||
        !this.lastname ||
        !this.firstname;
    },
  },

  mounted() {
    this.getValidation();
    this.getTheProducts();
  },
};
</script>

<style scoped>
.body {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}
.flex-child:first-child {
  width: 40%;
}
.flex-child:nth-child(2) {
  width: 17%;
}
.div_lb {
  background: -webkit-linear-gradient(
    left,
    #26a69b,
    #26a69b 1%,
    #f0f0f0 1%,
    #f0f0f0
  );
}
</style>