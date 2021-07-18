<template>
  <div>
    <div>
      <ToolbarAdmin />
    </div>

    <div
      class="q-pa-md flex"
      style="
        font-family: 'Montserrat', sans-serif;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <div style="margin-top: 2%">
        <img style="width: 150px" src="photos/checklist.png" />
      </div>

      <div class="q-pa-md" style="margin-top: 2%; width: 80%">
        <q-table
          :data="rows"
          :columns="columns"
          row-key="id"
          class="my-sticky-header-table"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                auto-width
                style="background-color: rgb(38, 166, 155, 0.3)"
              />
              <q-th
                style="background-color: rgb(38, 166, 155, 0.3)"
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  round
                  color="secondary"
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props" class="expandProducts">
              <q-td colspan="100%">
                <div class="flex flex-center">
                  <table style="width: 60%">
                    <tr>
                      <th>Id produs</th>
                      <th>Produs</th>
                      <th>Cantitate</th>
                    </tr>
                    <tr v-for="produs in props.row.produse" :key="produs.id">
                      <td v-if="produs.Product">{{ produs.Product.id }}</td>
                      <td v-if="produs.Product">
                        {{ produs.Product.brand }} {{ produs.Product.model }}
                      </td>
                      <td v-if="produs">{{ produs.quantity }}</td>
                    </tr>
                  </table>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import ToolbarAdmin from "../components/ToolbarAdmin.vue";
import axios from "../boot/axios";
export default {
  components: {
    ToolbarAdmin: ToolbarAdmin,
  },
  data() {
    return {
      rows: [],
      columns: [
        {
          name: "id",
          label: "Id",
          align: "center",
          required: true,
          field: (row) => row.id,
          format: (val) => `${val}`,
        },
        {
          name: "town",
          label: "Oraș",
          align: "center",
          required: true,
          field: "town",
        },
        {
          name: "county",
          label: "Județ",
          align: "center",
          required: true,
          field: "county",
        },
        {
          name: "address",
          label: "Adresă",
          align: "center",
          required: true,
          field: "address",
        },
        {
          name: "phone",
          label: "Telefon",
          align: "center",
          required: true,
          field: "phone",
        },

        {
          name: "name",
          label: "Livrare la",
          align: "center",
          required: true,
          field: (row) => row.lastname + " " + row.firstname,
        },
        {
          name: "paymentMethod",
          label: "Metodă de plată",
          align: "center",
          required: true,
          field: "paymentMethod",
        },
        {
          name: "totalPrice",
          label: "Preț total",
          align: "center",
          required: true,
          field: (row) => row.price + " lei",
        },
        {
          name: "email",
          label: "Cont",
          align: "center",
          required: true,
          field: (row) => row.Cart.User.email,
        },
      ],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/getAllOrders")
      .then((result) => {
        this.rows = result.data;
        this.rows.forEach((element) => {
          axios
            .get(`http://localhost:8082/getProductsFromCart/${element.id}`)
            .then((res) => {
              element["produse"] = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        });
        console.log(this.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
th,
td {
  text-align: center;
}
.expandProducts {
  background-color: rgba(216, 226, 223, 0.158);
}
</style>
<style lang="sass">
.my-sticky-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: rgb(38,166,155,0.3)
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>