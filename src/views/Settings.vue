<template>
  <section class="settings">
    <sweet-modal ref="successModal" icon="success"> successful </sweet-modal>
    <sweet-modal ref="unsuccessModal" icon="warning"> faild </sweet-modal>
    <sweet-modal ref="editModal" title="Edit Setting">
      <FormulateForm v-model="rowElments" @submit="editSetting">
        <FormulateInput
          type="text"
          name="name"
          placeholder="setting name"
          validation="required"
          label="name"
          v-model="settingName"
        />
        <FormulateInput
          type="text"
          name="value"
          placeholder="setting value"
          validation="required"
          label="value"
          v-model="settingValue"
        />
        <div class="validation-errors">
          <div class="validation-error" v-for="err in validationErrors" :key="err.param">
            {{ err.msg }}
          </div>
        </div>
        <p v-if="already" class="alredy">
          {{ already }}
        </p>
        <div class="submitbtn">
          <FormulateInput
            type="submit"
            label="Edit"
            @submit="editSetting()"
            :disabled="isLoading"
          />
        </div>
      </FormulateForm>
    </sweet-modal>
    <sweet-modal ref="warningModal" icon="error" title="Delete setting">
      Are you sure ?
      <p></p>
      <button
        type="submit"
        label="Delete"
        class="salah"
        @click="deleteSetting()"
        :disabled="isLoading"
        slot="button"
      >
        Delete
      </button>

      <!--</div>-->
    </sweet-modal>

    <h1>Settings</h1>
    <div class="submitbtn">
      <FormulateInput
        type="button"
        label="Add Setting"
        @click="add"
        color="black"
        calss="add"
        depressed
      />
    </div>
    <div class="loader" v-if="loading" color="green">
      <rotate-square2></rotate-square2>
    </div>
    <div class="req-error" v-if="reqError">
      <span>{{ reqError }}</span>
      <button @click="getDrivers">Try again</button>
    </div>
    <div class="main-data" v-if="!loading && !reqError">
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead class="thead-colored">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">value</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <transition name="fade">
            <tbody v-if="rows">
              <tr v-for="(row, index) in rows" :key="row.id">
                <td>{{ index + 1 }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.value }}</td>
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
                    <path
                      d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                    />
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
            </tbody>
          </transition>
        </table>
      </div>
    </div>
    <sweet-modal ref="addSettingModal" title="Add Setting">
      <FormulateForm v-model="formValues" @submit="addSetting">
        <FormulateInput
          type="text"
          name="name"
          placeholder="setting value"
          validation="required"
          label="name"
        />
        <FormulateInput
          type="text"
          name="value"
          placeholder="setting value"
          validation="required"
          label="value"
        />
        <div class="validation-errors">
          <div class="validation-error" v-for="err in validationErrors" :key="err.param">
            {{ err.msg }}
          </div>
        </div>
        <FormulateInput
          class="submitbtn"
          type="submit"
          label="Add"
          @click="addSetting()"
          :disabled="isLoading"
        />
      </FormulateForm>
    </sweet-modal>
  </section>
</template>

<script>
import ant from "ant-design-vue";
import icons from "vue-table-dynamic";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import { RotateSquare2 } from "vue-loading-spinner";

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
    this.getSettings();
  },
  components: {
    RotateSquare2,
  },
  data() {
    return {
      reqError: undefined,
      loading: false,
      rowElments: {},
      formValues: {},
      index: 1,
      isLoading: false,
      validationErrors: [],
      rows: [],
      settingName: undefined,
      settingValue: undefined,
      id: undefined,
      already: undefined,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTE0ZDk0NjIyYWExMGE2ZTM0YjgwZmQiLCJpYXQiOjE2Mjg3NTYzNTl9.zzguSDlAcbyT78BRsKpE_w5510pjeetDPlTx9w4RluE",
    };
  },
  methods: {
    // Modals
    add() {
      this.$refs.addSettingModal.open();
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
      this.settingName = row.name;
      this.settingValue = row.value;
      this.id = row._id;
      this.$refs.editModal.open();
    },
    showWarningModal(row) {
      this.$refs.warningModal.open();
      this.id = row._id;
      console.log(row);
    },
    getSettings() {
      this.loading = true;
      axios
        .get("https://alsayar-backend-vwmk7.ondigitalocean.app/api/settings/all/", {
          headers: {
            Authorization: `token ${this.token}`,
          },
        })
        .then((response) => {
          this.loading = false;
          console.log(response.data.settings);
          this.rows = response.data.settings;
        })
        .catch((err) => {
          console.log(err.response);
          this.loading = false;
          this.reqError = err;
        });
    },
    addSetting() {
      this.isLoading = true;
      this.already = undefined;
      axios
        .post(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/settings/add",
          {
            name: this.formValues.name,
            value: this.formValues.value,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(this.formValues.name, this.formValues.value);
          // this.rows.push({ name: this.formValues.name, value: this.formValues.value });
          this.success();
          this.getSettings();
          this.$refs.addSettingModal.close();
          console.log(this.rows);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
          if (err) {
            if (err.response.status == 400) this.already = err.response.data.message;
            if (err.response.status == 500) this.already = "جدث خطأ غير متوقع";
            this.validationErrors = err.response.data.errors;
            this.isLoading = false;
          }
        });
    },
    editSetting() {
      this.isLoading = true;
      console.log(this.editedId);
      axios
        .put(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/settings/update/" +
            this.id,
          {
            name: this.rowElments.name,
            value: this.rowElments.value,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          this.getSettings();
          this.success();
          this.$refs.editModal.close();
          this.getSettings();
          this.isLoading = false;
        })
        .catch((err) => {
          this.unsuccess();
          this.$refs.editModal.open();
          this.getSettings();
          this.isLoading = false;
          console.log(err.response);
          this.validationErrors = err.response.data.errors;
        });
    },
    deleteSetting() {
      this.isLoading = true;
      console.log(this.id);
      // this.id=
      axios
        .delete(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/settings/delete/" +
            this.id,
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          this.getSettings();
          this.success();
          this.$refs.warningModal.close();
          this.getSettings();
          this.isLoading = false;
        })
        .catch((err) => {
          this.unsuccess();
          this.getSettings();
          this.isLoading = false;
          console.log(err.response);
          this.validationErrors = err.response.data.errors;
        });
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
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}
</style>
