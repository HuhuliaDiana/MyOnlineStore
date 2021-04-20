# Quasar App (frontend)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

let url = new URL(document.location.href+'/?brand=samsung');
      // let params = new URLSearchParams(url);
      // console.log(document.URL.searchParams.get('brand'))
      document.location.href=url.href
      let params = (new URL(document.location)).searchParams;
      let name = params.get('brand');
      console.log(name)

      const url=window.location.href
      window.history.pushState( {url} , '', '?brand=samsung' );


   
    <q-btn
      id="a"
      label="See all products"
      style="display: none"
      @click="seeAllProducts"
      color="primary"
    />

CARUSEL
        <!-- trebuie populata tabela Photo pt a aparea pozele -->
          <!-- <div class="q-pa-md" :key="item">
          <q-carousel animated v-model="slide" arrows navigation infinite>
            <q-carousel-slide
              :name="1"
              v-bind:img-src="`../photos/${item.photo}`"
            />
            <q-carousel-slide
              :name="2"
              v-bind:img-src="`../photos/${item.photo}`"
            />
          </q-carousel>
        </div> -->
photo:
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Photo", {
     photo:DataTypes.STRING
       
    });
  };
  
DROPDOWN LISTS:
  
      <!-- <q-btn-dropdown color="primary" label="Order by">
        <q-list v-for="option in ascDescPrice" :key="option">
          <q-item clickable v-close-popup @click="onItemClickPrice(option)">
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->

      <!-- <q-btn-dropdown color="primary" label="Brands">
        <q-list v-for="brand in brands" :key="brand">
          <q-item clickable v-close-popup @click="onItemClickBrand(brand)">
            <q-item-section>
              <q-item-label>{{ brand }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown color="primary" label="RAM">
        <q-list v-for="ram in memRAM" :key="ram">
          <q-item clickable v-close-popup @click="onItemClickRAM(ram)">
            <q-item-section>
              <q-item-label>{{ ram }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->

      <!-- <q-btn-dropdown color="primary" label="Memory internal">
        <q-list v-for="memInt in memInternal" :key="memInt">
          <q-item clickable v-close-popup @click="onItemClickMemInt(memInt)">
            <q-item-section>
              <q-item-label>{{ memInt }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->

      <!-- <q-btn-dropdown color="primary" label="Stock status">
        <q-list v-for="ss in stockStatus" :key="ss">
          <q-item clickable v-close-popup @click="onItemClickStock(ss)">
            <q-item-section>
              <q-item-label>{{ ss }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->


            //da disable la filtre
      // axios
      //   .get("http://localhost:8082/getNewProducts", this.products, { withCredentials: true })
      //   .then((result) => {
      //     this.products = result.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });



       //da disable la filtre sau
      //reduced products la produsele aflate deja pe pagina si posibilitate de stergere a filtrelor
      // axios
      //   .get("http://localhost:8082/getReducedProducts", this.products, {
      //     withCredentials: true,
      //   })
      //   .then((result) => {
      //     this.products = result.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

        <!-- <div v-for="ss in stockStatus" :key="ss">
            <input
              ="group"
              type="radio"
              :value="ss.value"
              v-model="comparisonvalue"
            />
            <label>{{ ss.label }}</label>
          </div> -->

            <div class="q-pa-md">
            <div v-for="ss in stockStatus" class="q-gutter-sm" :key="ss">
              <q-radio
                class="qRadioStock"
                right-label
                v-model="statusModel"
                :val="ss.value"
                :label="ss.label"
                @input="onItemClickStock(statusModel)"
              />
            </div>

            <q-btn label="Clear selection" @click="clearSelection" />
          </div>


           <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="search" label="Search" />
        </div>
      </div>
      <q-btn flat round dense icon="search" @click="getFavouriteProducts" />
      
daca nu merge cautarea, schimba search:null si verifica daca search===null!!!


    seeAllProducts() {
      a.style.display = "none";
      //se iau toate produsele

      // axios
      //   .get("http://localhost:8082/getAllProducts", { withCredentials: true })
      //   .then((response) => {
      //     this.products = response.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      //se tine cont de filtre
      // const url=this.$router.currentRoute.path
      // this.$router.push(url)
      this.$router
        .push(
          `/home/${this.fprice}/${this.fbrand}/${this.fram}/${this.fmemInt}/${this.fstock}/${this.fnet}`
        )
        .catch((err) => {});
    },

     getReducedProducts() {
      this.$router
        .push(
          `/home/${this.fprice}/${this.fbrand}/${this.fram}/${this.fmemInt}/${this.fstock}/${this.fnet}`
        )
        .then((result) => {
          this.products = result.data;
          this.products = this.products.filter(function (element) {
            if (element.reduction) {
              return element;
            }
          });
        })
        .catch((err) => {});

    },
    getNewProducts() {

      var d = new Date();
      d.setMonth(d.getMonth() - 1);

      this.products = this.products.filter(function (element) {
        if (new Date(element.createdAt) >= d) {
          return element;
        }
      });

    },


      // axios
      //   .get("http://localhost:8082/getNetSpeed", this.allProducts, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     response.data.forEach((element) => {
      //       const elem = {
      //         label: element,
      //         value: element,
      //       };
      //       this.netSpeeds.push(elem);
      //       console.log(this.netSpeeds);
      //     });
      //     this.netSpeeds.push({
      //       label: "Clear selection",
      //       value: null,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // axios
      //   .get("http://localhost:8082/getBrands", this.allProducts, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     response.data.forEach((element) => {
      //       const elem = {
      //         label: element,
      //         value: element,
      //       };
      //       this.brands.push(elem);
      //     });
      //     this.brands.push({
      //       label: "Clear selection",
      //       value: null,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // axios
      //   .get("http://localhost:8082/getMemInternal", this.allProducts, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     response.data.forEach((element) => {
      //       const elem = {
      //         label: element,
      //         value: element,
      //       };
      //       this.memInternal.push(elem);
      //     });
      //     this.memInternal.push({
      //       label: "Clear selection",
      //       value: null,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // axios
      //   .get("http://localhost:8082/getStock", this.allProducts, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     response.data.forEach((element) => {
      //       const elem = {
      //         label: element,
      //         value: element,
      //       };
      //       this.stockStatus.push(elem);
      //     });
      //     this.stockStatus.push({
      //       label: "Clear selection",
      //       value: null,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // axios
      //   .get("http://localhost:8082/getRAM", this.allProducts, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     response.data.forEach((element) => {
      //       const elem = {
      //         label: element,
      //         value: element,
      //       };
      //       this.memRAM.push(elem);
      //     });
      //     this.memRAM.push({
      //       label: "Clear selection",
      //       value: null,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });


      <li class="liProduct" v-for="(item, index) in products" :key="index">
          <Product
          :id="item.id"
          />
        </li>

         <ul class="flex-child products">
        <li class="liProduct" v-for="(item, index) in products" :key="index">
          <Product
          :id="item.id"
          />
        </li>
      </ul>

         <!-- <ul>
      <li v-for="item in products" :key="item.id">
        {{ item.Product.price }}
        {{ item.Product.brand }}
        {{ item.Product.memRAM }}
        {{ item.Product.memInternal }}
        {{ "-- > " + item.quantity }}
      </li>
    </ul> -->


        // getStockStatus(product) {
    //   if (product.quantity > 0 && product.quantity <= 15) {
    //     return "Stoc limitat";
    //   } else if (product.quantity > 15) {
    //     return "In stoc";
    //   } else if (product.quantity == 0) {
    //     return "Stoc epuizat";
    //   }
    // },

    // addProductInCart(key) {
    //   axios
    //     .post(
    //       `http://localhost:8082/addProductInCart/${key}`,
    //       {},
    //       { withCredentials: true }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   this.products.find((element) => element.id === key).quantity--;
    // },


       <!-- <q-btn-toggle
        size="15px"
        style="margin-right: 5%"
        v-model="model"
        flat
        stretch
        :options="options"
        @click="openPage(model)"
      /> -->
