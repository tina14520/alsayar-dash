<template>
  <center>
    <sweet-modal ref="successModal" icon="success"> signed up successfully! </sweet-modal>
    <sweet-modal ref="unsuccessModal" icon="error">
      <div class="validation-errors">
        <div class="validation-error">
          {{ validationErrors }}
        </div>
      </div>
    </sweet-modal>

    <FormulateForm ref="myform" class="login-form" v-model="formValues" @submit="signup">
      <h2 class="form-title">Sign Up</h2>
      <p></p>
      <FormulateInput
        @change="uploadImage"
        accept="image/*"
        type="image"
        name="profile_img"
        label="Select an image to upload"
        help="Select a png, jpg or gif to upload."
        validation="mime:image/jpeg,image/png,image/gif"
      />
      <FormulateInput
        name="name"
        type="text"
        label="Your name"
        placeholder="Your name"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <FormulateInput
        validation="required|number"
        type="tel"
        name="phone"
        label="Your phone"
        placeholder="your phone number"
      />
      <div class="double-wide">
        <FormulateInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
        />
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        />
      </div>
      <!-- <div class="validation-errors">
        <div class="validation-error" v-for="err in validationErrors" :key="err.param">
          {{ err.msg }}
        </div>
      </div>-->
      <FormulateInput
        class="submit-btn"
        type="submit"
        label="Sign Up"
        :disabled="isLoading"
      />
      <pre class="code" />
    </FormulateForm>
  </center>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      image: "",
      remoteUrl: "",
      formValues: {},
      isLoading: false,
      validationErrors: [],
      img: "",
    };
  },
  methods: {
    success() {
      this.$refs.successModal.open();
    },
    clear() {
      this.$refs.anyName.clear();
    },
    unsuccess() {
      this.$refs.unsuccessModal.open();
    },

    //   handleImage(e) {
    //     const selectedImage = e.target.files[0]; // get first file
    //     this.createBase64Image(selectedImage);
    //   },
    //   createBase64Image(fileObject) {
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //       this.image = e.target.result;
    //       this.uploadImage();
    //     };
    //     reader.readAsDataURL(fileObject);
    //   },
    //   uploadImage() {
    //     const { image } = this;
    //     axios
    //       .post("http://localhost:3000/captain/upload", { image })
    //       .then((response) => {
    //         this.remoteUrl = response.data.url;
    //       })
    //       .catch((err) => {
    //         return new Error(err.message);
    //       });
    //   },
    // },

    uploadImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.img = JSON.stringify(e.target.result);
        // this.img.toString()
        console.log(this.img);
      };
      reader.onerror = (error) => {
        alert(error);
      };
      reader.readAsDataURL(file);
    },

    signup() {
      this.isLoading = true;
      console.log("request sent");
      console.log(this.img);
      axios
        .post("http://localhost:3000/admin/signup", {
          // headers: { "Access-Control-Allow-Origin": "*" },
          // body: {
          name: this.formValues.name,
          email: this.formValues.email,
          phone: this.formValues.phone,
          password: this.formValues.password,
          password_confirm: this.formValues.password_confirm,
          profile_img: this.img,
          // },
        })
        .then((response) => {
          console.log(this.profile_img, this.img);
          console.log(response);
          this.isLoading = false;
          //process...
          // event.target.reset();
          this.success();
          this.formValues = {};
        })
        .catch((err) => {
          console.log(this.profile_img, this.img);
          console.log(this.formValues);
          if (err) console.log(err.response);
          this.validationErrors = err.response.data.msg;
          this.isLoading = false;
          this.unsuccess();
        });

      // handleFileUpload() {
      //   this.file = this.$refs.file.files[0];
      //   let reader = new FileReader();

      //   reader.addEventListener(
      //     "load",
      //     function () {
      //       this.html = reader.result;
      //     }.bind(this),
      //     false
      //   );
      //   reader.readAsText(this.file);
      // },

      // imageToBase64(file) {
      //   var reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = () => {
      //     console.log("file to base64 result:" + reader.result);
      //     this.iconBase64 = reader.result;
      //   };
      //   reader.onerror = function (error) {
      //     console.log("Error: ", error);
      //   };
      // },
    },
  },
};
</script>

<style scoped>
.login-form {
  margin-top: 100px;
  padding: 10px;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 2px;
  display: flex;
  justify-content: flex-start;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}
.validation-errors {
  color: red;
}
.submit-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
