<template>
  <div>
    <div>
      <ToolbarAdmin v-on:childToParent="getRows" />
    </div>
    <div
      class="flex-center page"
      style="
        display: flex;
        height: 85vh;
        flex-direction: column;
        justify-content: space-between;
        font-family: 'Montserrat', sans-serif;
      "
    >
      <div
        class="q-pa-md flex"
        style="
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
      >
        <!-- <div style="font-size: 250%; margin-top: 1%">PRODUSE</div> -->
        <div style="margin-top: 2%">
          <img style="width: 150px" src="photos/ecommerce.png" />
        </div>
        <div style="max-width: 95%">
          <div class="flex" style="justify-content: flex-end">
            <q-select
              v-model="visibleColumns"
              multiple
              outlined
              dense
              options-dense
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              options-cover
              style="min-width: 150px; background-color: #ffffff"
            />
          </div>
          <q-table
            style="margin-top: 20px"
            class="my-sticky-header-table"
            :data="rows"
            :columns="columns"
            row-key="id"
            :key="componentKey"
            flat
            bordered
            @row-click="onRowClick"
            selection="multiple"
            :selected.sync="selectedRows"
            :visible-columns="visibleColumns"
          >
          </q-table>
        </div>
      </div>

      <div
        style="
          display: flex;
          width: 100%;
          justify-content: flex-end;
          margin-right: 8%;
        "
      >
        <q-btn round fab icon="add" color="secondary" @click="addProduct" />
        <q-btn
          style="margin-left: 15px"
          round
          fab
          color="red"
          icon="delete_forever"
          @click="deleteProducts"
        />
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="max-width: 90vw; font-family: 'Montserrat', sans-serif">
        <q-card-section class="scroll items-center">
          <div style="display: flex; justify-content: flex-end">
            <q-icon
              name="clear"
              style="font-size: 30px"
              color="secondary"
              @click="refreshPage"
              v-close-popup
            />
          </div>
          <div
            style="
              display: flex;
              font-size: 250%;
              margin-top: 2%;
              margin-left: 6%;
              color: #26a69b;
            "
          >
            <b>Introdu caracteristicile produsului...</b>
          </div>
          <div style="display: flex; margin-top: 1%">
            <div
              style="
                padding: 30px;
                width: 50%;
                margin-left: 6%;
                margin-top: 30px;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              "
            >
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="brand" label="Brand" />
                </div>
                <div>
                  <q-input v-model="model" label="Model" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="dimensions" label="Dimensiuni" />
                </div>
                <div>
                  <q-input v-model="weight" label="Greutate" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="displaySize" label="Dimensiune ecran" />
                </div>
                <div>
                  <q-input v-model="battery" label="Baterie" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="memRAM" label="Memorie RAM" />
                </div>
                <div>
                  <q-input v-model="memInternal" label="Memorie internă" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="selfieCam" label="Cameră selfie" />
                </div>
                <div>
                  <q-input v-model="mainCam" label="Cameră spate" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="displayRes" label="Rezoluție ecran" />
                </div>
                <div>
                  <q-input v-model="netSpeed" label="Viteză internet" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="usb" label="USB" />
                </div>
                <div>
                  <q-input v-model="price" label="Preț" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                  <q-input v-model="discount" label="Reducere (%)" />
                </div>
                <div>
                  <q-input v-model="quantity" label="Cantitate" />
                </div>
              </div>
            </div>
            <div style="margin-top: 2%; margin-left: 50px; display: flex">
              <img src="photos/addPhone.svg" style="width: 85%" />
            </div>
          </div>
          <div
            class="flex flex-center q-pa-md"
            style="margin-top: 3%; flex-direction: column"
          >
            <div
              class="q-gutter-md flex"
              style="align-items: center; justify-content: center; width: 94%"
            >
              <div
                v-if="changeLabel"
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 520px;
                  margin-right: 50px;
                "
              >
                <div
                  v-for="photo in productEditPhotos"
                  :key="photo"
                  :name="productEditPhotos.indexOf(photo)"
                  style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
                >
                  <div style="display: flex; justify-content: flex-end">
                    <q-icon
                      name="clear"
                      class="cursor-pointer"
                      style="font-size: 15px; padding: 5px"
                      color="secondary"
                      @click="deletePhoto(photo)"
                    />
                  </div>
                  <div style="padding-top: 5px; padding-bottom: 10px">
                    <img style="width: 150px" :src="`photos/${photo}`" />
                  </div>
                </div>
              </div>

              <div>
                <q-uploader
                  style="width: 600px"
                  label="Încarcă poze"
                  @added="onFileAdd"
                  color="secondary"
                  :max-files="clickBtnAdd === true ? 3 : maxFiles"
                  multiple
                  accept=".jpg"
                />
              </div>
            </div>

            <div style="margin-top: 3%">
              <q-btn
                flat
                :label="changeLabel ? 'Modifică' : 'Adaugă'"
                @click="
                  changeLabel ? editProduct(productEdit.id) : saveProduct()
                "
                style="
                  background-color: #26a69b;
                  color: white;
                  font-size: 120%;
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                "
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "../boot/axios";
import ToolbarAdmin from "../components/ToolbarAdmin.vue";

export default {
  components: {
    ToolbarAdmin: ToolbarAdmin,
  },
  watch: {
    maxFiles() {},
    rows() {},
    clickBtnAdd() {},
    val(n, o) {
      this.rows = n;
    },
    photos() {},
  },

  data() {
    return {
      filename: null,
      maxFiles: null,
      clickBtnAdd: false,
      visibleColumns: [],
      lastProductId: null,
      componentKey: true,
      rows: [],
      selectedRows: [],
      columns: [
        {
          name: "id",
          label: "Id",
          align: "center",
          required: true,
          field: (row) => row.id,
          format: (val) => `${val}`,
        },
        {
          name: "brand",
          align: "center",
          label: "Brand",
          field: "brand",
        },
        { name: "model", label: "Model", field: "model", align: "center" },
        {
          name: "dimensions",
          label: "Dimensiuni",
          field: "dimensions",
          align: "center",
        },
        { name: "weight", label: "Greutate", field: "weight", align: "center" },
        {
          name: "memRAM",
          label: "Memorie RAM",
          field: "memRAM",
          align: "center",
        },
        {
          name: "memInternal",
          label: "Memorie internă",
          field: "memInternal",
          align: "center",
        },
        {
          name: "selfieCam",
          label: "Cameră selfie",
          align: "center",
          field: "selfieCam",
        },
        {
          name: "mainCam",
          label: "Cameră spate",
          field: "mainCam",
          align: "center",
        },
        {
          name: "battery",
          label: "Baterie",
          field: "battery",
          align: "center",
        },
        {
          name: "displayRes",
          label: "Rezoluție ecran",
          align: "center",
          field: "displayRes",
        },
        {
          name: "displaySize",
          label: "Dimensiune ecran",
          align: "center",
          field: "displaySize",
        },
        {
          name: "netSpeed",
          label: "Viteză internet",
          align: "center",
          field: "netSpeed",
        },
        {
          name: "USB",
          label: "USB",
          align: "center",
          field: "USB",
        },
        {
          name: "discount",
          label: "Reducere",
          align: "center",
          field: "discount",
        },
        {
          name: "price",
          label: "Preț",
          align: "center",
          field: "price",
        },
        {
          name: "quantity",
          align: "center",
          label: "Cantitate",
          field: "quantity",
        },
      ],
      product: null,
      productEdit: null,
      myFiles: null,
      productEditPhotos: [],

      dimensions: null,
      brand: null,
      weight: null,
      memRAM: null,
      memInternal: null,
      selfieCam: null,
      model: null,
      mainCam: null,
      battery: null,
      displaySize: null,
      usb: null,
      netSpeed: null,
      discount: null,
      price: null,
      displayRes: null,
      quantity: null,
      confirm: false,
      photos: "",
      changeLabel: false,
      refresh: false,
      val: [],
    };
  },

  mounted() {
    this.getAllProducts();
    this.getVisibleColumns();
  },

  methods: {
    getRows(value) {
      this.val = value;
    },
    getVisibleColumns() {
      this.columns.forEach((column) => {
        this.visibleColumns.push(column.name);
      });
    },
    getAllProducts() {
      axios
        .get("http://localhost:8082/getAllProducts")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProducts() {
      if (this.selectedRows.length > 0) {
        axios
          .patch("http://localhost:8082/deleteProducts", {
            array: this.selectedRows,
          })
          .then((res) => {
            console.log(res);
            this.getAllProducts();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    refreshPage() {
      if (this.refresh) {
        this.$router.go();
      }
    },
    deletePhoto(photo) {
      this.productEditPhotos.splice(this.productEditPhotos.indexOf(photo), 1); //delete s3
      this.photos = this.productEditPhotos.join(","); //s1, s2
      this.maxFiles = 3 - this.productEditPhotos.length;

      //edit photos from product
    },

    onRowClick(evt, row) {
      this.clickBtnAdd = false;

      this.productEdit = row;
      if (row.photos) {
        if (row.photos.charAt(row.photos.length - 1) === ",") {
          this.productEditPhotos[0] = row.photos.slice(0, -1);
        } else {
          this.productEditPhotos = row.photos.split(",");
        }
      } else {
        this.productEditPhotos = [];
      }
      console.log(row.photos);

      // if (row.photos) {
      //   const array = row.photos.split(",");
      //   if (array[1] === "") {
      //     this.productEditPhotos[0] = row.photos;
      //     console.log(this.productEditPhotos);
      //   } else {
      //     this.productEditPhotos = array;
      //   }
      // }
      this.maxFiles = 3 - this.productEditPhotos.length;

      this.confirm = true;
      this.brand = row.brand;
      this.model = row.model;
      this.dimensions = row.dimensions;
      this.weight = row.weight;
      this.memRAM = row.memRAM;
      this.memInternal = row.memInternal;
      this.selfieCam = row.selfieCam;
      this.mainCam = row.mainCam;
      this.battery = row.battery;
      this.displaySize = row.displaySize;
      this.netSpeed = row.netSpeed;
      this.usb = row.USB;
      this.discount = row.discount;
      this.displayRes = row.displayRes;
      this.quantity = row.quantity;
      this.price = row.price;
      this.photos = row.photos;
      this.changeLabel = true;
    },
    addProduct() {
      this.clickBtnAdd = true;
      this.changeLabel = false;
      this.confirm = true;
      this.brand = null;
      this.model = null;
      this.dimensions = null;
      this.weight = null;
      this.memRAM = null;
      this.memInternal = null;
      this.selfieCam = null;
      this.mainCam = null;
      this.netSpeed = null;
      this.battery = null;
      this.displaySize = null;
      this.usb = null;
      this.discount = null;
      this.displayRes = null;
      this.quantity = null;
      this.price = null;
    },
    onFileAdd(myFiles) {
      this.myFiles = myFiles;
    },
    editProduct(key) {
      const product = {
        quantity: this.quantity,
        price: this.price,
        brand: this.brand,
        model: this.model,
        dimensions: this.dimensions,
        weight: this.weight,
        memRAM: this.memRAM,
        memInternal: this.memInternal,
        selfieCam: this.selfieCam,
        mainCam: this.mainCam,
        battery: this.battery,
        displayRes: this.displayRes,
        displaySize: this.displaySize,
        netSpeed: this.netSpeed,
        USB: this.usb,
        discount: this.discount,
        photos: this.photos,
      };
      console.log(this.photos);

      //verifica pozele, verifica daca s-au incarcat poze- this.myFiles!==null
      let formData = new FormData();
      formData.append("bodyProduct", JSON.stringify(product));
      if (this.myFiles !== null) {
        for (var i = 0; i < this.myFiles.length; i++) {
          let file = this.myFiles[i];
          var newName = key.toString() + "_" + file.name; //adauga si id-ul care stiu ca il are produsul
          formData.append("product", file, newName);
        }
        console.log(formData);
      }

      axios
        .post(`http://localhost:8082/getEditProduct/${key}`, formData)
        .then((res) => {
          this.refresh = true;
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Ai modificat un produs!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveProduct() {
      const product = {
        brand: this.brand,
        quantity: this.quantity,
        price: this.price,
        model: this.model,
        dimensions: this.dimensions,
        weight: this.weight,
        memRAM: this.memRAM,
        memInternal: this.memInternal,
        selfieCam: this.selfieCam,
        mainCam: this.mainCam,
        battery: this.battery,
        displayRes: this.displayRes,
        displaySize: this.displaySize,
        netSpeed: this.netSpeed,
        USB: this.usb,
        discount: this.discount,
        // photos: this.photos,
      };

      //adauga si id-ul care stiu ca l ar primi produsul
      //get last id + 1

      let formData = new FormData();

      axios
        .get("http://localhost:8082/getLastId", {
          withCredentials: true,
        })
        .then((result) => {
          this.lastProductId = result.data.id;
          formData.append("bodyProduct", JSON.stringify(product));
          for (var i = 0; i < this.myFiles.length; i++) {
            let file = this.myFiles[i];
            var newName = this.lastProductId + "_" + file.name; //adauga si id-ul care stiu ca l ar primi produsul
            formData.append("product", file, newName);
          }

          axios
            .post("http://localhost:8082/addProduct", formData, {
              withCredentials: true,
            })
            .then((result) => {
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Ai adăugat un produs!",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>
<style lang="sass">
.my-sticky-header-table

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: rgb(38,166,155,0.3)

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  &.q-table--loading thead tr:last-child th
    top: 48px
</style>