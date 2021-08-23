<template>
  <section class="drivers">
    <sweet-modal></sweet-modal>
    <sweet-modal ref="successModal" icon="success"> successful </sweet-modal>
    <sweet-modal ref="unsuccessModal" icon="warning"> faild </sweet-modal>
    <sweet-modal height="900px" width="900px" ref="detilsModal" title="Driver Detiles">
      <table class="table">
        <tr>
          <th>Birthday</th>
          <th>{{ birthday }}</th>
        </tr>
        <tr>
          <th>Updated at</th>
          <th>{{ updatedAt.substring(0,10) }}</th>
        </tr>
        <tr>
          <th>Created at</th>
          <th>{{ createdAt.substring(0,10) }}</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>{{ date.substring(0,10) }}</th>
        </tr>
        <tr>
          <th>Car type</th>
          <th>{{ car_type }}</th>
        </tr>
        <tr>
          <th>Own type</th>
          <th>{{ own_type }}</th>
        </tr>
        <tr>
          <th>Driver license</th>
          <th>
            <img
              class="image"
              :src="'https://alsayar-backend-vwmk7.ondigitalocean.app/' + driver_license"
            />
          </th>
        </tr>
        <tr>
          <th>Feish</th>
          <th>
            <img
              class="image"
              :src="'https://alsayar-backend-vwmk7.ondigitalocean.app/' + feish"
            />
          </th>
        </tr>
        <tr>
          <th>Car license</th>
          <th>
            <img
              class="image"
              :src="'https://alsayar-backend-vwmk7.ondigitalocean.app/' + car_license"
            />
          </th>
        </tr>
        <tr>
          <th>Personal card id</th>
          <th>
            <img
              class="image"
              :src="
                'https://alsayar-backend-vwmk7.ondigitalocean.app/' + personal_card_id
              "
            />
          </th>
        </tr>
      </table>
    </sweet-modal>

    <sweet-modal height="450px" width="400px" ref="profileModal" title="Profile">
      <img
        class="profile"
        :src="'https://alsayar-backend-vwmk7.ondigitalocean.app/' + profile"
      />
    </sweet-modal>
    <sweet-modal ref="warningModal" icon="error" title="Delete driver">
      Are you sure ?
      <p></p>
      <Button
        type="submit"
        label="Delete"
        class="salah"
        @click="deleteDriver()"
        :disabled="isLoading"
        slot="button"
      >
        Delete
      </Button>
    </sweet-modal>

    <h1>Drivers</h1>
    <div class="add">
      <button @click="add" class="add-btn">Add Driver</button>
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
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Balance</th>
              <th scope="col">Status</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <transition name="fade">
            <tbody v-if="rows">
              <tr v-for="(row, index) in rows" :key="row.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    class="img"
                    @click="showViewProfile(row)"
                    :src="
                      'https://alsayar-backend-vwmk7.ondigitalocean.app' + row.profile_img
                    "
                  />
                </td>
                <td>{{ row.name }}</td>
                <td>{{ row.email }}</td>
                <td>{{ row.phone }}</td>
                <td>{{ row.balance }}.00$</td>
                <td>
                  <toggle-button
                    :value="row.is_online"
                    color="#06d6a0"
                    :sync="true"
                    :labels="true"
                    @change="changeStatus(row)"
                  />
                </td>

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
                <td>
                  <!--<a-icon type="info-circle" class="icon" color="#06d6a0" />-->
                  <svg
                    @click="showdetils(row)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-id"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#06d6a0"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <circle cx="9" cy="10" r="2" />
                    <line x1="15" y1="8" x2="17" y2="8" />
                    <line x1="15" y1="12" x2="17" y2="12" />
                    <line x1="7" y1="16" x2="17" y2="16" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </transition>
        </table>
      </div>
    </div>
    <sweet-modal ref="addDriverModal" title="Add Driver">
      <FormulateForm v-model="formValues" @submit="addDriver">
        <FormulateInput
          accept="image/*"
          type="image"
          name="profile_img"
          label="Select a profile image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          @change="upload_profile"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="car_license"
          label="Select a car license image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          @change="upload_car"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="driver_license"
          label="Select a Driver Licence image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          @change="upload_license"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="feish"
          label="Select a feish image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          @change="upload_feish"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="personal_card_id"
          label="Select a personal card image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          @change="upload_personal"
        />
        <FormulateInput
          type="text"
          name="name"
          placeholder="driver name"
          validation="required"
          label="name"
        />
        <FormulateInput
          type="password"
          name="password"
          placeholder="driver password"
          validation="required"
          label="password"
        />
        <FormulateInput
          type="email"
          name="email"
          placeholder="driver email"
          validation="required"
          label="name"
        />
        <FormulateInput
          type="tel"
          name="phone"
          placeholder="driver phone"
          validation="required"
          label="phone"
        />
        <FormulateInput
          type="date"
          name="birthday"
          label="Driver Birthday"
          placeholder="bleace enter driver birthday"
          validation="required"
          min="1970-12-01"
          max="2000-01-01"
          error-behavior="live"
        />
        <FormulateInput
          v-model="car_type"
          name="car_type"
          validation="required"
          :options="{
            first: 'First',
            second: 'Second',
            third: 'Third',
            fourth: 'Fourth',
          }"
          type="select"
          placeholder="Select a car type"
          label="Enter Driver Car Type"
        />
        <FormulateInput
          v-model="own_type"
          name="own_type"
          :options="{
            first: 'First',
            second: 'Second',
            third: 'Third',
            fourth: 'Fourth',
          }"
          type="select"
          placeholder="Select Driver own type"
          label="Enter Driver Own Type"
        />
        <p>
          Status
          <toggle-button
            title="status"
            :value="true"
            color="#06d6a0"
            :sync="true"
            :labels="true"
            label="active"
            v-model="driverStatus"
          />
        </p>
        <div class="validation-errors">
          <div class="validation-error" v-for="err in validationErrors" :key="err.param">
            {{ err.msg }}
          </div>
        </div>
        <p v-if="already" class="alredy">
          {{ already }}
        </p>
        <FormulateInput
          class="submitbtn"
          type="submit"
          label="Add"
          @click="addDriver"
          :disabled="isLoading"
        />
      </FormulateForm>
    </sweet-modal>
    <sweet-modal ref="editModal" title="Edit driver">
      <FormulateForm v-model="rowElments" @submit="editDriver">
        <FormulateInput
          accept="image/*"
          type="image"
          name="profile_img"
          label="Select a profile image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          v-model="driverImg"
          @change="upload_profile"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="car_license"
          label="Select a car license image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          v-model="driverCarLicense"
          @change="upload_car"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="driver_license"
          label="Select a Driver Licence image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          v-model="driverLicence"
          @change="upload_license"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="feish"
          label="Select a feish image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          v-model="driverFeish"
          @change="upload_feish"
        />
        <FormulateInput
          accept="image/*"
          type="image"
          name="personal_card_id"
          label="Select a personal card image"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png"
          v-model="driverCardId"
          @change="upload_personal"
        />
        <FormulateInput
          type="text"
          name="name"
          placeholder="driver name"
          validation="required"
          label="name"
          v-model="driverName"
        />
        <FormulateInput
          type="password"
          name="password"
          placeholder="driver password"
          validation="required"
          label="password"
          v-model="driverBalance"
        />
        <FormulateInput
          type="email"
          name="email"
          placeholder="driver email"
          validation="required"
          label="Email"
          v-model="driverEmail"
        />
        <FormulateInput
          name="phone number"
          placeholder="driver phone"
          validation="required"
          label="phone"
          v-model="driverPhone"
        />
        <FormulateInput
          type="date"
          name="Birthday"
          label="Driver Birthday"
          placeholder="bleace enter driver birthday"
          validation="required"
          min="1970-12-01"
          max="2000-01-01"
          error-behavior="live"
        />
        <FormulateInput
          v-model="car_type"
          :options="{
            first: 'Prestigious',
            second: 'Without EC',
            third: 'Economic',
          }"
          type="select"
          placeholder="Select a car type"
          label="Enter Driver Car Type"
        />
        <FormulateInput
          v-model="own_type"
          :options="{
            first: 'Special Property',
            second: 'Second',
            third: 'Third',
          }"
          type="select"
          placeholder="Select Driver own type"
          label="Enter Driver Own Type"
        />
        <toggle-button
          title="status"
          :value="true"
          color="#06d6a0"
          :sync="true"
          :labels="true"
          label="active"
          v-model="driverStatus"
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
            @submit="editDriver()"
            :disabled="isLoading"
          />
        </div>
      </FormulateForm>
    </sweet-modal>
  </section>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import SweetModal from "sweet-modal-vue/src/plugin.js";
import ToggleButton from "vue-js-toggle-button";
import { VueSpinners } from "@saeris/vue-spinners";
// import { PropagateLoader } from "@saeris/vue-spinners";
import { RotateSquare2 } from "vue-loading-spinner";
Vue.use(VueSpinners);
Vue.use(ToggleButton);
Vue.use(SweetModal);
Vue.use(Vuetify);
import "vuetify/dist/vuetify.min.css";
export default {
  created() {
    this.getDrivers();
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
      driverName: "",
      driverProfile: "",
      driverLicense: "",
      driverCarLicense: "",
      driverPersonalId: "",
      driverfeish: "",
      imgCode: undefined,
      imgSrc: undefined,
      iconBase64: undefined,
      driverBalance: undefined,
      driverEmail: undefined,
      driverStatus: undefined,
      driverPhone: undefined,
      driverImg: undefined,
      driverLicence: undefined,
      driverCar: undefined,
      driverBirthday: undefined,
      driverCarType: undefined,
      driverCreatedAt: undefined,
      driverDate: undefined,
      driverFeish: undefined,
      driverOwnType: undefined,
      driverCardId: undefined,
      driverUpdatedAt: undefined,
      id: undefined,
      online: undefined,
      cardImg: "",
      img: "",
      profileimage: "",
      profileImg: "",
      driverLicenceImg: "",
      carLicenseImg: "",
      profile: "",
      balance: "",
      birthday: null,
      car_license: "",
      car_type: "",
      createdAt: "",
      date: "",
      driver_license: "",
      feish: "",
      own_type: "",
      personal_card_id: "",
      updatedAt: "",
      profilefiles: undefined,
      is_online: "",
      already: undefined,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIwZjdkNDY4OWVmMGI0N2RiZDU3YTUiLCJpYXQiOjE2Mjk1NTA1OTh9.nQEuqGVIUR4TY1i6eYvnQKEwrxj-ZNbDp2p0siou0ww",
      // https://cdn.auth0.com/blog/vuejs/vue-logo.png
    };
  },
  methods: {
    async upload_profile(e) {
      let file = e.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.driverProfile = reader.result;
        console.log(this.driverProfile);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    upload_personal(e) {
      let file = e.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.driverPersonalId = reader.result;
        console.log("this.driverPersonalId");
        console.log(this.driverPersonalId);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    upload_license(e) {
      let file = e.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.driverLicense = reader.result;
        console.log("this.driverLicense");
        console.log(this.driverLicense);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    upload_car(e) {
      let file = e.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.driverCarLicense = reader.result;
        console.log("this.driverCarLicense");
        console.log(this.driverCarLicense);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    upload_feish(e) {
      let file = e.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.driverfeish = reader.result;
        console.log("this.driverFeish");
        console.log(this.driverfeish);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    // previewFile() {
    //   const preview = document.querySelector("img");
    //   const file = document.querySelector("input[type=file]").files[0];
    //   const reader = new FileReader();
    //   console.log(file);
    //   reader.addEventListener(
    //     "load",
    //     function () {
    //       // convert image file to base64 string
    //       preview.src = reader.result;
    //     },
    //     false
    //   );
    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    //   console.log(this.perview.src);
    // },
    // handleChange(data) {
    //   console.log(data);
    //   if (data.result) {
    //     let list = this.images.data;
    //     list.push(data);
    //     this.images = { data: list };
    //   } else {
    //     this.errors = data.messages;
    //   }
    // },
    // Modals
    add() {
      this.$refs.addDriverModal.open();
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
      console.log(row.own_typeSS);
      this.driverName = row.name;
      this.driverBalance = row.balance;
      this.driverStatus = row.is_online;
      this.driverPhone = row.phone;
      this.driverEmail = row.email;
      this.driverImg = row.profile_img;
      this.driverLicence = row.driver_license;
      this.driverCar = row.car_license;
      this.driverBirthday = row.birthday;
      this.driverCarType = row.car_type;
      this.driverFeish = row.feish;
      this.driverOwnType = row.own_type;
      this.driverCardId = row.personal_card_id;
      // console.log(this.driverStatus);
      this.id = row._id;
      this.$refs.editModal.open();
    },
    showViewProfile(row) {
      console.log(row);
      this.profile = row.profile_img;
      this.$refs.profileModal.open();
    },
    showWarningModal(row) {
      this.$refs.warningModal.open();
      this.id = row._id;
    },
    showdetils(row) {
      console.log(row);
      // this.balance = row.balance;
      this.birthday = row.birthday;
      this.car_type = row.car_type;
      this.car_license = row.car_license;
      this.createdAt = row.createdAt;
      this.date = row.date;
      this.driver_license = row.driver_license;
      this.feish = row.feish;
      this.own_type = row.own_type;
      this.personal_card_id = row.personal_card_id;
      this.updatedAt = row.updatedAt;
      this.$refs.detilsModal.open();
    },
    uploadImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      var files = [];
      reader.onload = (e) => {
        this.img = e.target.result;
        // this.img.toString()
        files.push(this.img);
        console.log(this.img);
      };
      reader.onerror = (error) => {
        alert(error);
      };
      reader.readAsDataURL(file);
    },
    getDrivers() {
      this.loading = true;
      axios
        .get("https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/driver/all", {
          headers: {
            Authorization: `token ${this.token}`,
          },
        })
        .then((response) => {
          this.loading = false;
          console.log(response.data.drivers);
          this.rows = response.data.drivers;
        })
        .catch((err) => {
          console.log(err.response);
          this.loading = false;
          this.reqError = err;
        });
    },
    // onSelectFile(event) {
    //   let reader = new FileReader();
    //   reader.onload = function () {
    //     let output = document.getElementById("blah");
    //     output.src = reader.result;
    //   };
    //   if (event.target.files[0]) {
    //     reader.readAsDataURL(event.target.files[0]);
    //   }
    // },
    changeStatus(row) {
      this.online = !row.is_online;
      this.id = row._id;
      console.log("the id", this.id, this.online, !row.is_online);
      axios
        .put(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/driver/change_availability_status/" +
            this.id,
          {
            is_online: this.online,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(this.is_online);
          this.getDrivers();
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addDriver() {
      this.isLoading = true;
      this.already = undefined;
      axios
        .post(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/driver/register",
          {
            name: this.formValues.name,
            email: this.formValues.email,
            password: this.formValues.password,
            is_online: this.formValues.status,
            phone: this.formValues.phone,
            birthday: this.formValues.birthday,
            personal_card_id: this.driverPersonalId,
            profile_img: this.driverProfile,
            driver_license: this.driverLicense,
            car_license: this.driverCarLicense,
            feish: this.driverfeish,
            own_type: this.formValues.own_type,
            car_type: this.formValues.car_type,
          }
        )
        .then((response) => {
          console.log(response);
          // this.rows.push({ name: this.formValues.name, value: this.formValues.value });
          this.success();
          this.getDrivers();
          this.$refs.addDriverModal.close();
          console.log(this.rows);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response);
          if (err) {
            if (err.response.status == 400) this.already = err.response.data.message;
            if (err.response.status == 500) this.already = "جدث خطأ غير متوقع";
            this.validationErrors = err.response.data.errors;
            this.isLoading = false;
          }
        });
    },
    editDriver() {
      this.isLoading = true;
      console.log(this.rowElments);
      console.log("driver id", this.id);
      axios
        .put(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/driver/update_driver/" +
            this.id,
          {
            name: this.rowElments.name,
            email: this.rowElments.email,
            is_online: this.driverStatus,
            balance: this.rowElments.balance,
            phone: this.rowElments.phone,
            birthday: this.rowElments.birthday,
            car_type: this.rowElments.car_type,
            own_type: this.rowElments.own_type,
            personal_card_id: this.driverPersonalId,
            profile_img: this.driverProfile,
            driver_license: this.driverLicense,
            car_license: this.driverCarLicense,
            feish: this.driverfeish,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          console.log(this.driverStatus);
          this.getDrivers();
          this.success();
          this.$refs.editModal.close();
          this.getDrivers();
          this.isLoading = false;
        })
        .catch((err) => {
          this.unsuccess();
          this.$refs.editModal.open();
          this.getDrivers();
          this.isLoading = false;
          console.log("the returned data", err);
          this.validationErrors = err.response.data.errors;
        });
    },
    deleteDriver() {
      this.isLoading = true;
      console.log(this.id);
      axios
        .delete(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/driver/delete_driver/" +
            this.id,
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          this.getDrivers();
          this.success();
          this.$refs.warningModal.close();
          this.getDrivers();
          this.isLoading = false;
        })
        .catch((err) => {
          this.unsuccess();
          this.$refs.warningModal.close();
          this.getDrivers();
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
.img {
  height: 4rem;
  width: 4rem;
  border-radius: 5rem;
}
.profile {
  height: 20rem;
  width: 20rem;
}
.image {
  width: 10rem;
  height: 5rem;
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
.load {
  padding-left: 30rem;
  padding-top: 10rem;
}
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}
</style>
