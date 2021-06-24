<template>
  <div>
    <div>
      <ToolbarAdmin />
    </div>
    <div
      class="flex-center page"
      style="
        display: flex;
        height: 85vh;
        flex-direction: column;
        justify-content: space-between;
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
        <div style="font-size: 250%; margin-top: 1%">PRODUSE</div>
        <div style="margin-top: 2%">
          <q-table
            class="my-sticky-header-table"
            style="font-family: 'Montserrat', sans-serif"
            :data="rows"
            :columns="columns"
            row-key="name"
            :key="componentKey"
            flat
            bordered
            @row-click="onRowClick"
          />
        </div>
      </div>

      <div
        style="
          display: flex;
          width: 100%;
          justify-content: flex-end;
          margin-right: 11%;
        "
      >
        <q-btn round fab icon="add" color="secondary" @click="addProduct" />
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="font-family: 'Montserrat', sans-serif; max-width: 90vw">
        <q-card-section class="scroll items-center">
          <div style="display: flex; justify-content: flex-end">
            <q-icon
              name="clear"
              class="cursor-pointer"
              style="font-size: 30px"
              color="secondary"
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
                  <q-input v-model="memRAM" label="Memorie RAM" />
                </div>
                <div>
                  <q-input v-model="memInt" label="Memorie internă" />
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
                  max-files="3"
                  multiple
                  accept=".jpg"
                  @rejected="onRejected"
                />
              </div>
            </div>

            <div style="margin-top: 3%">
              <q-btn
                flat
                :label="changeLabel ? 'Modifică' : 'Adaugă'"
                @click="changeLabel ? editProduct(productEdit.id) : saveProduct"
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
  name: "AddProduct",
  components: {
    ToolbarAdmin: ToolbarAdmin,
  },

  data() {
    return {
      componentKey: true,
      rows: [],
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
          label: "Dimensions",
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
          name: "usb",
          label: "USB",
          align: "center",
          field: "usb",
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
      files: [],
      product: null,
      productEdit: null,

      products: [],
      productEditPhotos: [],

      dimensions: null,
      brand: null,
      weight: null,
      memRAM: null,
      memInternal: null,
      selfieCam: null,
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
    };
  },

  mounted() {
    axios
      .get("http://localhost:8082/getAllProducts")
      .then((res) => {
        this.rows = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    deletePhoto(photo) {
      this.productEditPhotos.splice(this.productEditPhotos.indexOf(photo), 1);
    },
    editProduct(key) {
      //axios edit product
      //verifica ce campuri se schimba, vefifica pozele, vefifica daca s-au incarcat poze- this.files!==null
      
    },
    onRowClick(evt, row) {
      this.productEdit = row;

      this.productEditPhotos = row.photos.split(", ");
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
      this.usb = row.USB;
      this.discount = row.discount;
      this.displayRes = row.displayRes;
      this.quantity = row.quantity;
      this.price = row.price;
      this.changeLabel = true;
    },
    addProduct() {
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
      this.battery = null;
      this.displaySize = null;
      this.usb = null;
      this.discount = null;
      this.displayRes = null;
      this.quantity = null;
      this.price = null;
    },
    onFileAdd(myFiles) {
      const filesNames = myFiles.map((file) => file.name);
      this.files = filesNames;
    },
    saveProduct() {
      this.files.forEach((file) => {
        if (this.photos !== "") {
          this.photos = this.photos.concat(", " + file);
        } else {
          this.photos = this.photos.concat(file);
        }
      });
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
      axios
        .post("http://localhost:8082/addProduct", product, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result.data.message);
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