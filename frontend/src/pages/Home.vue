<template>
  <div>
    <div>
      <Toolbar v-on:childToParent="getRows" />
    </div>
    <div style="width: 100%" class="flex-container">
      <div class="flex-child filters">
        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="height: 35px; align-items: center; display: flex"
          >
            <label class="lbFilter">Disponibilitate:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              id="group"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              v-model="ss"
              :options="stockStatus"
              color="orange"
              @input="onItemClickStock(ss)"
            />
          </div>
        </div>

        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="height: 35px; align-items: center; display: flex"
          >
            <label class="lbFilter">Sortează după:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="price"
              :options="ascDescPrice"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              color="orange"
              @input="onItemClickPrice(price)"
            />
          </div>
        </div>
        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="height: 35px; align-items: center; display: flex"
          >
            <label class="lbFilter">Brand:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="brand"
              :options="brands"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              color="orange"
              @input="onItemClickBrand(brand)"
            />
          </div>
        </div>
        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="height: 35px; align-items: center; display: flex"
          >
            <label class="lbFilter">Viteză internet:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="networkSpeed"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              :options="netSpeeds"
              color="orange"
              @input="onItemClickNet(networkSpeed)"
            />
          </div>
        </div>
        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="
              background-color: #f0f0f0;
              height: 35px;
              align-items: center;
              display: flex;
            "
          >
            <label class="lbFilter">RAM:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="memR"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              :options="memRAM"
              color="orange"
              @input="onItemClickRAM(memR)"
            />
          </div>
        </div>

        <div class="lb_qGroup">
          <div
            class="div_lbFilter"
            style="height: 35px; align-items: center; display: flex"
          >
            <label class="lbFilter">Memorie internă:</label>
          </div>
          <div class="q-pa-lg">
            <q-option-group
              v-model="memInt"
              style="color: #606060; font-family: 'Montserrat', sans-serif"
              :options="memInternal"
              color="orange"
              @input="onItemClickMemInt(memInt)"
            />
          </div>
        </div>
      </div>
      <div class="flex-child products">
        <div class="products">
          <Product
            v-for="item in products"
            :key="item.id"
            :idProd="item.id"
            :priceProd="item.price"
            :photosProd="item.photos"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import Product from "../components/Product";
import Toolbar from "../components/Toolbar";

export default {
  name: "Home",
  components: {
    Product,
    Toolbar,
  },

  data() {
    return {
      ss: null,
      price: null,
      brand: null,
      networkSpeed: null,
      memR: null,
      memInt: null,

      path: null,

      fprice: "",
      fbrand: "",
      fram: "",
      fmemInt: "",
      fstock: "",
      fnet: "",

      url: null,

      statusModel: "",
      products: [],
      brands: [],
      netSpeeds: [],
      allProducts: [],
      memRAM: [],
      memInternal: [],
      val: [],

      search: "",
      ascDescPrice: [
        { label: "Preț crescător", value: "ascprice" },
        { label: "Preț descrescător", value: "descprice" },
        { label: "Elimină filtrul", value: "" },
      ],
      stockStatus: [],
    };
  },
  watch: {
    val(n, o) {
      this.products = n;
    },
    products() {},
    $route(to, from) {
      if (to.path.includes("home")) {
        this.path = "home";
        this.url = "http://localhost:8082/getAllProducts";
      } else if (to.path.includes("discounts")) {
        this.path = "discounts";
        this.url = "http://localhost:8082/getReducedProducts";
      } else if (to.path.includes("new")) {
        this.path = "new";
        this.url = "http://localhost:8082/getNewProducts";
      }
      axios
        .get(this.url, {
          withCredentials: true,
        })
        .then((response) => {
          this.products = response.data;
          this.filter();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getCurrentRoute(), this.getFilters();

    axios
      .get(this.url, { withCredentials: true })
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    getCurrentRoute() {
      const currUrl = this.$router.currentRoute.path;
      if (currUrl.includes("home")) {
        this.path = "home";
        this.url = "http://localhost:8082/getAllProducts";
      } else if (currUrl.includes("discounts")) {
        this.path = "discounts";
        this.url = "http://localhost:8082/getReducedProducts";
      } else if (currUrl.includes("new")) {
        this.path = "new";
        this.url = "http://localhost:8082/getNewProducts";
      }
    },
    //cautarea se
    getRows(value) {
      this.val = value;
    },
    getNetSpeed() {
      const netSpeed = this.allProducts.map((element) => element.netSpeed);
      const newNetSpeed = [...new Set(netSpeed)];
      newNetSpeed.forEach((element) => {
        const elem = {
          label: element,
          value: element,
        };
        this.netSpeeds.push(elem);
      });
      this.netSpeeds.push({
        label: "Elimină filtrul",
        value: "",
      });
    },
    getRAM() {
      const memRam = this.allProducts.map((element) => element.memRAM);
      const newMemRAM = [...new Set(memRam)];
      newMemRAM.forEach((element) => {
        const elem = {
          label: element,
          value: element,
        };
        this.memRAM.push(elem);
      });
      this.memRAM.push({
        label: "Elimină filtrul",
        value: "",
      });
    },
    getMemInt() {
      const memInt = this.allProducts.map((element) => element.memInternal);
      const newMemInt = [...new Set(memInt)];
      newMemInt.forEach((element) => {
        const elem = {
          label: element,
          value: element,
        };
        this.memInternal.push(elem);
      });
      this.memInternal.push({
        label: "Elimină filtrul",
        value: "",
      });
    },
    getStock() {
      const stock = this.allProducts.map((element) => {
        if (element.quantity < 15 && element.quantity > 0) {
          return "Stoc limitat";
        } else if (element.quantity >= 15) {
          return "În stoc";
        } else {
          return "Stoc epuizat";
        }
      });
      const newStock = [...new Set(stock)];
      newStock.forEach((element) => {
        const elem = {
          label: element,
          value: element,
        };
        this.stockStatus.push(elem);
      });
      this.stockStatus.push({
        label: "Elimină filtrul",
        value: "",
      });
    },
    getBrands() {
      const brands = this.allProducts.map((element) => element.brand);
      const newBrands = [...new Set(brands)];
      newBrands.forEach((element) => {
        const elem = {
          label: element,
          value: element,
        };
        this.brands.push(elem);
      });
      this.brands.push({
        label: "Elimină filtrul",
        value: "",
      });
    },
    getFilters() {
      axios
        .get(this.url, {
          withCredentials: true,
        })
        .then((response) => {
          this.allProducts = response.data;
          this.getRAM();
          this.getNetSpeed();
          this.getStock();
          this.getMemInt();
          this.getBrands();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filter() {
      if (this.fprice === "ascprice") {
        this.products.sort(function (a, b) {
          return a.price - a.discount / 100 - (b.price - b.discount / 100);
        });
      }
      if (this.fprice === "descprice") {
        this.products.sort(function (a, b) {
          return b.price - b.discount / 100 - (a.price - a.discount / 100);
        });
      }

      if (this.fbrand !== "") {
        const valbrand = this.fbrand;
        this.products = this.products.filter(function (element) {
          return element.brand === valbrand;
        });
      }
      if (this.fnet !== "") {
        const valnet = this.fnet;
        this.products = this.products.filter(function (element) {
          return element.netSpeed === valnet;
        });
      }

      if (this.fram !== "") {
        const valram = this.fram;
        this.products = this.products.filter(function (element) {
          return element.memRAM === valram;
        });
      }

      if (this.fmemInt !== "") {
        const valmemInt = this.fmemInt;
        this.products = this.products.filter(function (element) {
          return element.memInternal === valmemInt;
        });
      }

      if (this.fstock !== "") {
        const valstock = this.fstock;
        if (valstock === "În stoc") {
          this.products = this.products.filter(function (element) {
            return element.quantity > 15;
          });
        } else if (valstock === "Stoc limitat") {
          this.products = this.products.filter(function (element) {
            return element.quantity > 0 && element.quantity <= 15;
          });
        } else if (valstock === "Stoc epuizat") {
          this.products = this.products.filter(function (element) {
            return element.quantity === 0;
          });
        }
      }
    },
    onItemClickRAM(key) {
      this.fram = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {});
    },
    onItemClickMemInt(key) {
      this.fmemInt = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {});
    },
    onItemClickNet(key) {
      this.fnet = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {
          console.log(err);
        });
    },
    onItemClickStock(key) {
      this.fstock = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {});
    },
    onItemClickBrand(key) {
      this.fbrand = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {});
    },
    onItemClickPrice(key) {
      this.fprice = key;
      this.$router
        .push(
          `/${this.path}/${this.fprice}${this.fbrand}${this.fram}${this.fmemInt}${this.fstock}${this.fnet}`
        )
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.flex-child:first-child {
  width: 12%;
  margin-left: 15%;
  display: block;
}
.flex-child:nth-child(2) {
  width: 50%;
  margin-top: 20px;
  margin-left: 5%;
}
.products {
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  width: fit-content;
}
.lbFilter {
  margin-left: 20px;
  font-size: 120%;
  font-family: "Montserrat", sans-serif;
}

.q-pa-lg {
  margin-top: -15px;
}
.flex-container {
  display: flex;
  margin-top: 50px;
  margin-left: 30px;
}
.lb_qGroup {
  margin-top: 20px;
}
.div_lbFilter {
  background: -webkit-linear-gradient(
    left,
    #26a69b,
    #26a69b 3%,
    #f0f0f0 3%,
    #f0f0f0
  );
}
</style>