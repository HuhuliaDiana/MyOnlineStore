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
          <q-input outlined v-model="lastname" label="Nume" />
          <q-input outlined v-model="firstname" label="Prenume" />

          <q-input
            outlined
            mask="(###) ### - ####"
            v-model="phone"
            label="Telefon"
          />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <q-input outlined v-model="town" label="Oraș" />
          <q-input outlined v-model="county" label="Județ" />
          <q-input outlined v-model="address" label="Adresă" />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 30%;
            justify-content: space-between;
          "
        >
          <div style="margin-left: 20%">
            <q-tooltip
              v-if="userContacts.length === 0"
              content-style="font-size: 12px;text-align:center;background-color:#ffe5b4; color:black; font-family: 'Montserrat', sans-serif"
            >
              Nu există date de livrare salvate!
            </q-tooltip>
            <q-btn-dropdown
              color="secondary"
              style="font-family: 'Montserrat', sans-serif"
              label="Selectează date"
            >
              <q-list v-for="contact in userContacts" :key="contact">
                <q-item
                  clickable
                  v-close-popup
                  @click="fillTextFields(contact)"
                >
                  <q-item-section>
                    <q-item-label>
                      Nume: {{ contact.lastname }}
                      {{ contact.firstname }} Telefon:
                      {{ contact.phone }}
                      Adresa: {{ contact.address }} Oras: {{ contact.town }}
                      Judet:
                      {{ contact.county }}
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
                  display: none;
                  margin-right: 10px;
                "
                label="Actualizare"
                color="secondary"
                @click="updateUserContact"
              />
            </div>
            <div v-if="verifyExistingData === true">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                content-style="font-size: 12px;text-align:center;background-color:#ffe5b4;color:black;
            font-family: 'Montserrat', sans-serif"
              >
                Aceste date de livrare sunt deja salvate!
              </q-tooltip>
              <q-btn
                color="secondary"
                label="Salvare"
                :disabled="true"
                style="font-family: 'Montserrat', sans-serif"
                @click="saveUserContact"
              />
            </div>
            <div v-else>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                content-style="font-size: 12px;text-align:center;background-color:#ffe5b4;color:black;
            font-family: 'Montserrat', sans-serif"
              >
                Salveaza datele de livrare pentru a le putea reutiliza la
                urmatoarea comanda!
              </q-tooltip>
              <q-btn
                color="secondary"
                label="Salvare"
                :disabled="false"
                style="font-family: 'Montserrat', sans-serif"
                @click="saveUserContact"
              />
            </div>
          </div>
        </div>
      </div>
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
      verifyExistingData: null,

      firstname: null,
      chosenContact: null,
      phone: null,
      address: null,
      userContacts: [],
      btnUpdateContact: document.getElementById("btnUpdateContact"),
    };
  },
  watch: {
    verifyExistingData() {},

    town(newValue, oldValue) {
      this.verify();

      this.$emit("sendTown", newValue);
      if (this.chosenContact && newValue !== this.chosenContact.town) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    lastname(newValue, oldValue) {
      this.verify();

      this.$emit("sendLastname", newValue);
      if (this.chosenContact && newValue !== this.chosenContact.lastname) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    firstname(newValue, oldValue) {
      this.verify();

      this.$emit("sendFirstname", newValue);
      if (this.chosenContact && newValue !== this.chosenContact.firstname) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    county(newValue, oldValue) {
      this.verify();

      this.$emit("sendCounty", newValue);

      if (this.chosenContact && newValue !== this.chosenContact.county) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    address(newValue, oldValue) {
      this.verify();

      this.$emit("sendAddress", newValue);

      if (this.chosenContact && newValue !== this.chosenContact.address) {
        btnUpdateContact.style.display = "inherit";
      } else {
        btnUpdateContact.style.display = "none";
      }
    },
    phone(newValue, oldValue) {
      this.verify();

      this.$emit("sendPhone", newValue);

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
        this.verify();
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
    validation() {
      return (
        !this.town ||
        !this.county ||
        !this.address ||
        !this.phone ||
        !this.lastname ||
        !this.firstname
      );
    },
    verify() {
      const array = this.userContacts.filter((e) => {
        return (
          e.town === this.town &&
          e.county === this.county &&
          e.phone === this.phone &&
          e.address === this.address &&
          e.lastname === this.lastname &&
          e.firstname === this.firstname
        );
      });
      if (array.length > 0 || this.validation()) {
        this.verifyExistingData = true;
      } else {
        this.verifyExistingData = false;
      }
    },
    saveUserContact() {
      const userContact = {
        town: this.town,
        county: this.county,
        phone: this.phone,
        address: this.address,
        lastname: this.lastname,
        firstname: this.firstname,
      };
      console.log(userContact);
      axios
        .post("http://localhost:8082/setUserContact", userContact, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Ai salvat datele de livrare!",
          });
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
      this.lastname = contact.lastname;
      this.firstname = contact.firstname;

      this.chosenContact = contact;
    },
    updateUserContact() {
      const idContact = this.chosenContact.id;

      const userContact = {
        town: this.town,
        county: this.county,
        phone: this.phone,
        address: this.address,
        lastname: this.lastname,
        firstname: this.firstname,
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
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Ai actualizat datele de livrare!",
          });
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