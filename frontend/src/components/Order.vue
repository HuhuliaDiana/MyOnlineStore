<template>
  <div>
    <div>Comanda nr. {{ id }}</div>
    <div>Plasata pe {{ dataPlasare }}</div>
    <div>Modalitate livrare: Livrare prin curier</div>
    <div>Pentru:</div>
    <div>Adresa: {{ address }}, {{ town }}, {{ county }}</div>
  </div>
</template>

<script>
export default {
  props: ["id", "dataPlasare", "address", "town", "county"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>