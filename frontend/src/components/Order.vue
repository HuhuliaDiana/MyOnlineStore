<template>
  <div>
   
    <div
      style="
        margin-top: 5%;
        display: flow;
        flow-direction: column;
        align-items: center;
      "
    >
      <div
        style="
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          height: 200px;
          justify-content: space-between;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <q-input outlined v-model="lastname" label="Lastame" />
          <q-input outlined v-model="firstname" label="Firstname" />

          <q-input
            outlined
            mask="(###) ### - ####"
            v-model="phone"
            label="Phone"
          />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <q-input outlined v-model="town" label="Town" />
          <q-input outlined v-model="county" label="County" />
          <q-input outlined v-model="address" label="Address" />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div>
            <q-btn-dropdown
            color="secondary"
              style="
                font-family: 'Montserrat', sans-serif;
              "
              label="Selecteaza date"
            >
              <q-list v-for="contact in userContacts" :key="contact">
                <q-item
                  clickable
                  v-close-popup
                  @click="fillTextFields(contact)"
                >
                  <q-item-section>
                    <q-item-label>
                      Town: {{ contact.town }} County:
                      {{ contact.county }} Address: {{ contact.address }} Phone:
                      {{ contact.phone }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <div>
              <q-btn
                id="btnUpdateContact"
                style="
                  background-color: #f5f5f5;
                  font-family: 'Montserrat', sans-serif;
                  display:none ;
                  margin-right: 10px;
                "
                label="Update"
                @click="updateUserContact"
              />
            </div>
            <div>
              <q-btn
              color="secondary"
                label="Save"
                style="
                  font-family: 'Montserrat', sans-serif;
                "
                @click="saveUserContact"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        style="
          display: flex;
          flex-direction: row;
          width: 70%;
          border: 1px solid;
          margin: 0 auto;
          margin-top: 20px;
          justify-content: space-between;
        "
      >
         <div>
          <q-btn label="Save" @click="saveUserContact" color="primary" />
        </div> 

        <div>
           <q-btn-dropdown color="primary" label="Choose contact">
            <q-list v-for="contact in userContacts" :key="contact">
              <q-item clickable v-close-popup @click="fillTextFields(contact)">
                <q-item-section>
                  <q-item-label>
                    Town: {{ contact.town }} County:
                    {{ contact.county }} Address: {{ contact.address }} Phone:
                    {{ contact.phone }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> 
        </div>
         <div>
          <q-btn
            id="btnUpdateContact"
            label="Update"
            style="display: "
            @click="updateUserContact"
            color="primary"
          />
        </div> 
      </div> -->
    </div>
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
      lastname: null,
      firstname: null,
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
    axios
      .get("http://localhost:8082/getCurrentUser", {
        withCredentials: true,
      })
      .then((result) => {
        this.lastname = result.data.lastname;
        this.firstname = result.data.firstname;
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

<style scoped>
</style>