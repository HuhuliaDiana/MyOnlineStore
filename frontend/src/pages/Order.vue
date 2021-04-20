<template>
  <div>
    <q-input v-model="town" label="Town" />
    <q-input v-model="county" label="County" />
    <q-input v-model="phone" label="Phone" />
    <q-input v-model="address" label="Address" />
    <q-btn label="Save" @click="saveUserContact" color="primary" />

    <q-btn-dropdown color="primary" label="Choose contact">
      <q-list v-for="contact in userContacts" :key="contact">
        <q-item clickable v-close-popup @click="fillTextFields(contact)">
          <q-item-section>
            <q-item-label>
              Town: {{ contact.town }} County: {{ contact.county }} Address:
              {{ contact.address }} Phone: {{ contact.phone }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn
      id="btnUpdateContact"
      label="Update"
      style="display: none"
      @click="updateUserContact"
      color="primary"
    />
  </div>
</template>

<script>
import axios from "../boot/axios";

export default {
  name: "Order",
  data() {
    return {
      town: null,
      county: null,
      chosenContact: null,
      phone: null,
      address: null,
      userContacts: [],
      btnUpdateContact: document.getElementById("btnUpdateContact"),
    };
  },
  watch: {
    town(newValue, oldValue) {
      if (this.chosenContact && newValue !== this.chosenContact.town) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    county(newValue, oldValue) {
      if (this.chosenContact && newValue !== this.chosenContact.county) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    address(newValue, oldValue) {
      if (this.chosenContact && newValue !== this.chosenContact.address) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    phone(newValue, oldValue) {
      if (this.chosenContact && newValue !== this.chosenContact.phone) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getCurrentUserContacts", {
        withCredentials: true,
      })
      .then((result) => {
        this.userContacts = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    saveUserContact() {
      const userContact = {
        town: this.town,
        county: this.county,
        phone: this.phone,
        address: this.address,
      };
      console.log(userContact);
      axios
        .post("http://localhost:8082/setUserContact", userContact, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fillTextFields(contact) {
      this.town = contact.town;
      this.county = contact.county;
      this.address = contact.address;
      this.phone = contact.phone;

      this.chosenContact = contact;
    },
    updateUserContact() {
      const idContact = this.chosenContact.id;

      const userContact = {
        town: this.town,
        county: this.county,
        phone: this.phone,
        address: this.address,
      };
      axios
        .patch(
          `http://localhost:8082/updateUserContact/${idContact}`,
          userContact,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>