<template>
  <div>
    <div>
      <Toolbar :disable="true" />
    </div>
    <div class="body">
      <div class="flex-child products">
        <div v-if="costProduse !== 0">
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
            Coșul de cumpărături este gol!
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
            Date de livrare
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
            Modalitate de livrare
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
            Modalitate de plată
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
          <div
            v-if="paymentMethod === 'Card online'"
            style="margin-top: 3%; display: flex; justify-content: center"
          >
            <div
              class="q-gutter-y-md column"
              style="
                padding: 5% 5%;
                width: 65%;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
              "
            >
              <div class="flex row" style="justify-content: space-between">
                <img
                  src="photos/debit-card.png"
                  style="width: 8%; height: fit-content; margin-top: 2%"
                />
                <q-input
                  outlined
                  v-model="nrCard"
                  style="width: 85%"
                  label="Numărul cardului"
                  hint="Numărul cardului"
                />
              </div>

              <div
                class="row flex"
                style="justify-content: space-between; margin-top: 30px"
              >
                <q-input
                  outlined
                  v-model="expireDate"
                  label="MM/YY"
                  hint="Data expirării"
                />
                <q-input
                  outlined
                  v-model="cvv"
                  label="CVV/CVV2"
                  hint="Cod securitate"
                />
              </div>
              <div
                class="flex row"
                style="justify-content: space-between; margin-top: 30px"
              >
                <img
                  src="photos/user.png"
                  style="width: 8%; height: fit-content; margin-top: 2%"
                />
                <q-input
                  outlined
                  v-model="cardholder"
                  style="width: 85%"
                  label="Numele deținătorului"
                  hint="Deținătorul cardului"
                />
              </div>
            </div>
          </div>

          <div style="margin-top: 7%; text-align: center; margin-bottom: 8%">
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
        <CartPrice
          style="width: 60%"
          v-on:transmitFinalCost="getFinalCost"
          :date="noiDate"
          :costProduse="costProduse"
          :costLivrare="costLivrare"
          :costF="costF"
        />
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="font-family: 'Montserrat', sans-serif; width: 400px">
        <q-card-section class="row items-center">
          <span style="color: #26a69b; font-size: 300%" class="material-icons">
            check_circle
          </span>
          <div
            style="
              display: flex;
              flex-direction: column;
              margin-left: 5%;
              margin-top: 5px;
            "
          >
            <div>
              Comanda cu <b style="color: #26a69b">nr. {{ nrOrder }}</b> a fost
              realizata!
            </div>
            <div>
              Total plata:
              <b style="color: #26a69b"
                >{{ Math.round(costF * 100) / 100 }} lei</b
              >
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="secondary"
            v-close-popup
            @click="
              () => {
                this.$router.go();
              }
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      nrCard: null,
      expireDate: null,
      cvv: null,
      cardholder: null,
      cardValidation: null,
      confirm: false,
      nrOrder: null,
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
      noiDate: [],
      costProduse: 0,
      costLivrare: 0,
      costF: 0,
    };
  },

  watch: {
    products() {},
    noiDate() {},
    shouldRender() {},
    nrOrder() {},
    val(n, o) {
      this.products = n;
    },
    cost() {},
    plata() {},
    county() {
      this.getValidation();
    },
    town() {
      this.getValidation();
    },
    cvv() {
      this.getValidation();
    },
    nrCard() {
      this.getValidation();
    },
    expireDate() {
      this.getValidation();
    },
    cardholder() {
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
    costProduse() {},
    costLivrare() {},
    costF() {},
  },

  methods: {
    //sa calculez aici cost produse, cost livrare si cost final si sa le transmit lui cartprice
    ceva() {
      this.costLivrare = 17.5;
      this.noiDate.forEach((element) => {
        this.costProduse += element.price * element.number;
      });
      this.costF = this.costProduse + this.costLivrare;
    },
    getFinalCost(value) {
      this.costF = value;
    },
    onClickPaymentMethod(value) {
      this.paymentMethod = value;
    },
    getTown(value) {
      this.town = value;
    },
    getFirstname(value) {
      this.firstname = value;
    },
    getLastname(value) {
      this.lastname = value;
    },
    getAddress(value) {
      this.address = value;
    },
    getCounty(value) {
      this.county = value;
    },
    getPhone(value) {
      this.phone = value;
    },
    listModified(value) {
      //update the prod with id 1 to receive quantity=value.quantity

      // const id=value.id
      // const index=this.products.
      // this.products.splice(this.products.indexOf(value),1)
      const x = this.noiDate.find((data) => {
        return data["id"] === value.id;
      });

      x["number"] = value.number;

      this.costProduse = 0;
      this.noiDate.forEach((element) => {
        this.costProduse += element.price * element.number;
      });

      this.costF = this.costProduse + this.costLivrare;
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
            price: this.costF,
          },
          { withCredentials: true }
        )
        .then((response) => {
          this.nrOrder = response.data.id;
          this.confirm = true;
        });
    },

    getProducts(value) {
      this.val = value;
    },
    getTheProducts() {
      axios
        .get("http://localhost:8082/getCartProducts", { withCredentials: true })
        .then((response) => {
          this.products = response.data;

          this.sendDataToCartPrice();
        });
    },
    getValidation() {
      this.cardValidation =
        !this.cvv || !this.cardholder || !this.nrCard || !this.expireDate;

      this.validation =
        this.costF === 0 ||
        !this.paymentMethod ||
        !this.town ||
        !this.county ||
        !this.phone ||
        !this.address ||
        !this.lastname ||
        !this.firstname ||
        this.products.length === 0 ||
        (this.paymentMethod === "Card online" && this.cardValidation);
    },
    sendDataToCartPrice() {
      this.products.forEach((product) => {
        this.noiDate.push({
          id: product.Product.id,
          number: product.quantity,
          price:
            product.Product.price -
            (product.Product.price * product.Product.discount) / 100,
        });
      });
      this.ceva();
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