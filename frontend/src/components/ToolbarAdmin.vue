<template>
  <div>
    <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
      <q-toolbar-title
        style="font-style: italic; font-size: 200%; margin-left: 15%"
      >
        WiseCell</q-toolbar-title
      >

      <q-tabs
        v-model="model"
        size="15px"
        style="margin-right: 5%"
        @click="openPage(model)"
      >
        <q-tab name="products" label="Produse" />
        <q-tab name="orders" label="Comenzi" />
      </q-tabs>

      <q-btn
        size="15px"
        style="margin-right: 15%"
        flat
        round
        dense
        icon="logout"
        @click="logout"
      />
    </q-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {},
  },
};
</script>

<style>

</style>