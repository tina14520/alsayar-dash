<template>
  <section class="countries">
    <sweet-modal ref="editModal" title="Edit Trip Type">
      <FormulateForm v-model="rowElments" @submit="editCountry">
        <FormulateInput
          type="text"
          name="name"
          placeholder="Trip Type"
          validation="required"
          label="name"
          v-model="countryName"
        />
        <div class="validation-errors">
          <div class="validation-error" v-for="err in validationErrors" :key="err.param">
            {{ err.msg }}
          </div>
        </div>
        <div class="submitbtn">
          <FormulateInput
            type="submit"
            label="Edit"
            @submit="editCountry()"
            :disabled="isLoading"
          />
        </div>
      </FormulateForm>
    </sweet-modal>

    <sweet-modal ref="successModal" icon="success"> successful </sweet-modal>
    <sweet-modal ref="unsuccessModal" icon="warning"> faild </sweet-modal>
    <sweet-modal ref="warningModal" icon="error" title="Delete Trip Type">
      Are you sure ?
      <p></p>
      <!--<div class="buttons">
     <div class="back">
          <FormulateInput
            type="submit"
            color="red"
            label="<<cancel"
            @click="back()"
            :disabled="isLoading"
          />
        </div> -->
      <button
        type="submit"
        label="Delete"
        class="salah"
        @click="deleteCountry()"
        :disabled="isLoading"
        slot="button"
      >
        Delete
      </button>

      <!--</div>-->
    </sweet-modal>

    <h1>Trip Types</h1>
    <div class="submitbtn">
      <FormulateInput
        type="button"
        label="Add Trip Type"
        @click="add"
        color="black"
        calss="add"
        depressed
      />
    </div>
    <div style="width: 600px">
      <table type="table" id="firstTable" class="table">
        <tr class="tr">
          <th>ID</th>
          <th>Name</th>
          <th></th>
          <th>  </th>
        </tr>
        <tr v-for="(row, index) in rows" :key="row.id">
          <td>{{ index + 1 }}</td>
          <td>{{ row.name }}</td>
          <td>
            <svg
              @click="showModalEdit(row)"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-edit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2a9d8f"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </td>
          <td>
            <svg
              @click="showWarningModal(row)"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff2825"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </td>
        </tr>
      </table>

      <sweet-modal ref="addCountryModal" title="Add Trip Type">
        <FormulateForm v-model="formValues" @submit="addCountry">
          <FormulateInput
            type="text"
            name="name"
            placeholder="Trip Type"
            validation="required"
            label="name"
          />
          
          <div class="validation-errors">
            <div
              class="validation-error"
              v-for="err in validationErrors"
              :key="err.param"
            >
              {{ err.msg }}
            </div>
          </div>
          <FormulateInput
            class="submitbtn"
            type="submit"
            label="Add"
            @click="addCountry"
            :disabled="isLoading"
          />
        </FormulateForm>
      </sweet-modal>
    </div>
  </section>
</template>

<script>
import ant from "ant-design-vue";
import icons from "vue-table-dynamic";
// import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import SweetModal from "sweet-modal-vue/src/plugin.js";
Vue.use(SweetModal);
Vue.use(Vuetify);
Vue.use(ant);
Vue.use(icons);
import "vuetify/dist/vuetify.min.css";
// import { mdiPencil, mdiDelete } from "@mdi/js";
// import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
// import VueTableDynamic from "vue-table-dynamic";
export default {
  created() {
    this.getCountries();
  },
  data() {
    return {
      rowElments: {},
      formValues: {},
      index: 1,
      isLoading: false,
      validationErrors: [],
      rows: [{name:"Trip Type"}],
      countryName: undefined,
      countryValue: undefined,
      id: undefined,
      name:""
    };
  },
  methods: {
    // Modals
    add() {
      this.$refs.addCountryModal.open();
    },
    back() {
      this.$refs.warningModal.close();
    },
    unsuccess() {
      this.$refs.unsuccessModal.open();
    },
    success() {
      this.$refs.successModal.open();
    },
    showModalEdit(row) {
      console.log(row);
      this.countryName = row.name;
      this.countryValue = row.value;
      this.id = row._id;
      this.$refs.editModal.open();
    },
    showWarningModal(row) {
      this.$refs.warningModal.open();
      this.id = row._id;
    },
    getCountries() {
      // axios
      //   .get("http://localhost:3000/settings/all")
      //   .then((response) => {
      //     console.log(response.data.settings);
      //     this.rows = response.data.settings;
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //   });
    },
    addCountry() {
      this.name= this.formValues.name,
      this.isLoading = true;
      this.rows.push(this.name)
      console.log(this.name);
      this.$refs.addCountryModal.close();
      this.success();
      this.isLoading = false;


      // axios
      //   .post("http://localhost:3000/settings/add", {
      //     name: this.formValues.name,
      //     value: this.formValues.value,
      //   })
        // .then((response) => {
        //   console.log(response);
        //   console.log(this.formValues.name, this.formValues.value);
        //   // this.rows.push({ name: this.formValues.name, value: this.formValues.value });
        //   this.success();
        //   this.getCountries();
        //   this.$refs.addCountryModal.close();
        //   console.log(this.rows);
        //   this.isLoading = false;
        // })
        // .catch((err) => {
        //   console.log(err.response);
        //   this.validationErrors = err.response.data.errors;
        //   this.isLoading = false;
        // });
    },
    editCountry() {
      this.isLoading = true;
      // console.log(this.editedId);
      // axios
      //   .put("http://localhost:3000/settings/update/" + this.id, {
      //     name: this.rowElments.name,
      //     value: this.rowElments.value,
      //   })
      //   .then((response) => {
      //     console.log(response.status);
      //     this.getCountries();
      //     this.success();
      //     this.$refs.editModal.close();
      //     this.getCountries();
      //     this.isLoading = false;
      //   })
      //   .catch((err) => {
      //     this.unsuccess();
      //     this.$refs.editModal.open();
      //     this.getCountries();
      //     this.isLoading = false;
      //     console.log(err.response);
      //     this.validationErrors = err.response.data.errors;
      //   });
    },
    deleteCountry() {
      this.isLoading = true;
      console.log(this.id);
      this.rows.splice(this.rowElments.name)
        // this.events.splice(this.rowElments.indexOf(event), 1);
      this.$refs.warningModal.close();
      this.success();
      // axios
      //   .delete("http://localhost:3000/settings/delete/" + this.id)
      //   .then((response) => {
      //     console.log(response.status);
      //     this.getCountries();
      //     this.success();
      //     this.$refs.warningModal.close();
      //     this.getCountries();
      //     this.isLoading = false;
      //   })
      //   .catch((err) => {
      //     this.unsuccess();
      //     this.getCountries();
      //     this.isLoading = false;
      //     console.log(err.response);
      //     this.validationErrors = err.response.data.errors;
      //   });
    },
  },
};
</script>

<style scoped lang="scss">
.buttons {
  white-space: nowrap;
}
.back {
  margin-right: 10rem;
  display: inline-block;
  justify-content: flex-end;
}
.submit-btn {
  display: inline-block;
  justify-content: flex-end;
}
.submitbtn {
  display: flex;
  justify-content: flex-end;
}
.salah {
  border: none;
  background-color: $danger;
  padding: 0.4rem 0.8rem;
  color: $white;
  border-radius: 0.3rem;
}
.add {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 1rem 0;
  button {
    border: none;
    background-color: $primary;
    color: $white;
    padding: 0.3rem 0.8rem;
    border-radius: 0.2rem;
    &:hover {
      background-color: $primaryDark;
    }
  }
}
</style>
