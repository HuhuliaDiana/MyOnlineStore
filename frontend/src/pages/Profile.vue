<template>
  <div>
    <q-input
      v-model="cartName"
      label="Cart name"
      hint="Choose a name for your cart"
    />
    <q-btn label="Create cart" @click="createCart" color="primary" />
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      cartName: null,
    };
  },
  methods: {
      createCart(){
          

      }
  },
};
</script>

<style>
</style>