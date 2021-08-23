<template>
  <section class="register-form">
    <!-- Modals -->
    <sweet-modal icon="success" ref="suc">
      تم تسجيل الحساب بنجاح
    </sweet-modal>
    <div class="container">
      <div class="md">
        <div class="row">
          <div class="col-lg-12 col-md-9 col-sm-9">
            <h2>
              تسجيل سائق
            </h2>
            <div class="form">
              <div class="validation-errors" v-if="validationErrors">
                <div v-for="(error, index) in validationErrors" :key="index">
                  {{ error.msg }}
                </div>
              </div>
              <FormulateForm
                name="addNewDriver"
                v-model="addNewDriver"
                @submit="sendRequest"
              >
                <FormulateInput
                  type="text"
                  label="الاسم"
                  name="name"
                  v-model="driverName"
                  validation="required"
                />

                <FormulateInput
                  type="email"
                  name="email"
                  label="البريد"
                  validation="required"
                />

                <FormulateInput
                  type="tel"
                  name="phone"
                  label="رقم الهاتف"
                  validation="required"
                />
                <FormulateInput
                  label="كلمة السر"
                  type="password"
                  name="password"
                  validation="required"
                />

                <FormulateInput
                  type="image"
                  name="profile_img"
                  label="صورة البروفايل"
                  help="قم برفع صورة واضحة تظهر فيها معالم الوجه"
                  validation="mime:image/jpeg,image/png,image/gif|required"
                  @change="upload_profile"
                />

                <!-- <input type="file" @change="upload_image" accept="image/*" /> -->

                <FormulateInput
                  type="image"
                  name="personal_id"
                  label="اثبات شحصية"
                  help="جواز - رقم وطني - بطافة فومية"
                  validation="mime:image/jpeg,image/png|required"
                  @change="upload_personal"
                />

                <FormulateInput
                  type="date"
                  name="birthday"
                  label="تاريخ الميلاد"
                  validation="required"
                />

                <FormulateInput
                  type="image"
                  name="driver_license"
                  label="رخصة القيادة"
                  validation="mime:image/jpeg,image/png,image/gif|required"
                  @change="upload_license"
                />

                <FormulateInput
                  type="image"
                  name="car_license"
                  label="رخصة المركبة"
                  validation="mime:image/jpeg,image/png,image/gif|required"
                  @change="upload_car"
                />

                <FormulateInput
                  type="text"
                  label="نوع السيارة"
                  name="car_type"
                  validation="required"
                />
                <p v-if="already" class="alredy">
                  {{ already }}
                </p>
                <FormulateInput type="submit" name="تسجيل" :disabled="isLoading"/>
              </FormulateForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      addNewDriver: {},
      driverName: "",
      driverProfile: "",
      driverLicense: "",
      driverCarLicense: "",
      driverPersonalId: "",
      validationErrors: undefined,
      imgCode: undefined,
      imgSrc: undefined,
      iconBase64: undefined,
      isLoading: false,
      already: undefined,
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
      reader.onerror = function(error) {
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
      reader.onerror = function(error) {
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
      reader.onerror = function(error) {
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
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },
    sendRequest() {
      this.isLoading = true
      this.already = undefined
      console.log("register");
      axios
        .post("http://localhost:3000/api/mobile/driver/register", {
          name: this.addNewDriver.name,
          email: this.addNewDriver.email,
          phone: this.addNewDriver.phone,
          password: this.addNewDriver.password,
          birthday: this.addNewDriver.birthday,
          car_type: this.addNewDriver.car_type,
          own_type: "private",
          personal_card_id: this.driverName,
          profile_img: this.driverProfile,
          driver_license: this.driverLicense,
          car_license: this.driverCarLicense,
          feish: this.driverCarLicense,
        })
        .then((response) => {
          this.isLoading = false
          console.log(response);
          this.$refs.suc.open();
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error.response);
          if (error) {
            if ((error.response.status == 400))
              this.already = error.response.data.message;
            if ((error.response.status == 500))
              this.already = "جدث خطأ غير متوقع";
            // this.error = error;
            this.validationErrors = error.response.data.errors;
            // console.log("this.validationErrors");
            // console.log(this.validationErrors);
            // console.log(error.response);
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.register-form {
  direction: rtl;
  text-align: start;
}
.register-form {
  padding: 10px;
}
.register-ill {
  padding: 10px;
  img {
    height: 100%;
    width: 100%;
  }
}
.md {
  margin: 0 auto;
  width: 700px;
}
.validation-errors {
  margin-bottom: 1rem;
  div {
    color: $danger;
  }
}
.already {
  color: $danger;
}
.form {
  width: 100%;
}
.container {
  padding: 1rem;
}
</style>
