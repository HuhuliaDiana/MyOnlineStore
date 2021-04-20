<template>
  <div>
    <q-input v-model="brand" label="Brand" />
    <q-input v-model="price" label="Price" />
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
          style="max-width: 300px"
          label="Restricted to images"
          @added="onFileAdd"
          multiple
          accept=".jpg, image/*"
          @rejected="onRejected"
        />
      </div>
    </div>
    <q-btn label="Save" @click="saveProduct" color="primary" />
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  name: "AddProduct",
  data() {
    return {
      files: [],
      product: null,
      brand: null,
      price: null,
      photos: '',
    };
  },

  methods: {
    onFileAdd(myFiles) {
      const filesNames = myFiles.map((file) => file.name);
      this.files = filesNames;
    },
    saveProduct() {
      this.files.forEach((file) => {
        if (this.photos!=='') {
          this.photos = this.photos.concat(", " + file);
        } else {
          this.photos = this.photos.concat(file);
        }
      });
      const product = {
        brand: this.brand,
        price: this.price,
        photos: this.photos,
      };
      axios.post('http://localhost:8082/addProduct',product,{withCredentials:true}).then((result)=>{
        console.log(result.data.message)
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
};
</script>

<style>
</style>
