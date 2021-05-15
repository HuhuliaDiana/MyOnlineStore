<template>
  <div>
    <div><Toolbar /></div>
  </div>
</template>

<script>
import axios from "../boot/axios";

import Toolbar from "../components/Toolbar.vue";

export default {
  name: "Orders",
  components: {
    Toolbar,
  },
};
</script>

<style>
</style>