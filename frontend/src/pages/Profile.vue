<template>
  <div>
    <div>
      <Toolbar />
    </div>
    <div>
      <PersonalData/>
    </div>
  </div>
</template>

<script>
import axios from "../boot/axios";
import Toolbar from "../components/Toolbar";
import PersonalData from "../components/PersonalData";

export default {
  name: "Profile",
  components: {
    Toolbar,
    PersonalData
  },
};
</script>

<style>
</style>