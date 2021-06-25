<template>
  <div>
    <div>
      <ToolbarAdmin />
    </div>

    <div
      class="q-pa-md flex"
      style="
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <div style="font-size: 250%; margin-top: 1%">COMENZI</div>

      <div class="q-pa-md" style="margin-top: 2%">
        <q-table
          :data="rows"
          :columns="columns"
          row-key="name"
          :key="componentKey"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="accent"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="
                    props.expand
                      ? ('remove', getProductsFromCart(props.row.id))
                      : 'add'
                  "
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <div :v-for="product in products">{{product.quantity}}</div>
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
      componentKey: true,
      rows: [],
      products: [],
      //pune contul de pe care s a fct comanda le expand in table quasar
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
          name: "price",
          label: "Preț",
          align: "center",
          required: true,
          field: (row) => row.price + " lei",
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
      ],
    };
  },
  methods: {
    getProductsFromCart(key) {
      axios
        .get(`http://localhost:8082/getProductsFromCart/${key}`)
        .then((res) => {
          console.log("hei");
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8082/getAllOrders")
      .then((res) => {
        this.rows = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
</style>