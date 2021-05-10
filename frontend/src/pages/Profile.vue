<template>
  <div style="font-family: 'Montserrat', sans-serif">
    <div>
      <Toolbar />
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        margin-top: 15%;
        font-size: 170%;
      "
    >
      <div style="display: flex; justify-content: space-between; width: 65%">
        <div style="text-align: center">
          <span class="material-icons" style="color: #26a69b; font-size: 800%">
            manage_accounts
          </span>
          <div style="margin-top: 5%">Date personale</div>
        </div>
        <div style="text-align: center">
          <span class="material-icons" style="color: #26a69b; font-size: 800%">
            shopping_bag
          </span>
          <div style="margin-top: 5%">Comenzile tale</div>
        </div>
        <div style="text-align: center">
          <span class="material-icons" style="color: #26a69b; font-size: 800%">
            groups
          </span>
          <div style="margin-top: 5%">Sugestii primite</div>
        </div>
      </div>
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
    // PersonalData,
  },
};
</script>

<style>
</style>