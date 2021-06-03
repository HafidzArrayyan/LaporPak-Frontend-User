<template>
  <!-- <div>
        <div class="container">
            <form v-on:submit.prevent="Login">
                <b-form-group
                id="lbl_email"
                label="email"
                label-for="input_email"
                >
                <b-form-input id="input_email" v-model="email" trim></b-form-input>
                </b-form-group>

                <b-form-group
                id="lbl_password"
                label="Password"
                label-for="input_password"
                >
                <b-form-input type="password" id="input_password" v-model="password" trim></b-form-input>
                </b-form-group>

                <button
                    type="submit"
                    href="#pablo"
                    class="btn btn-primary btn-round btn-lg btn-block"
                    tabindex="4"
                    pill
                    >LOGIN
                </button>
            </form>
        </div>
    </div> -->
  <div class="container-scroller" id="container">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto" id="form-login">
              <div class="auth-form-light text-left p-5">
                <div class="navbar-brand brand-logo text-center">
                  <img src="../assets/img/logo.png">
                </div>
                <h4 class="">Selamat datang!</h4>
                <h6 class="font-weight-light">
                  Login untuk menyamapaikan aspirasi.
                </h6>
                <form class="pt-3" v-on:submit.prevent="Login">
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span
                          class="input-group-text bg-transparent border-right-0"
                        >
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="username"
                        type="text"
                        class="form-control form-control-lg border-left-0"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span
                          class="input-group-text bg-transparent border-right-0"
                        >
                          <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control form-control-lg border-left-0"
                        name="password"
                        id="password"
                        placeholder="Kata Sandi"
                        required
                      />
                    </div>
                  </div>
                  <div class="my-3">
                    <input
                      type="submit"
                      name="submit"
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      value="MASUK"
                    />
                  </div>
                  <h6 class="font-weight-light ml-3">Belum punya akun?</h6>
                  <router-link to="/register" class="nav-link">
                    <span class="menu-title">Register</span>
                  </router-link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<style media="screen">
/* #container{
  background-image: url('../assets/background.png');
  width: 100%;
  height: 700px;
  background-size: cover;
} */
/* #form-login{
    border-radius: 25px;
    margin-top: 10px;
  } */
</style>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    Login: function () {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/pengaduanMasy"))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    //jika posisi sudah login tidak bisa menampilkan halaman login lagi
    window.onpopstate = (event) => {
      if (
        window.localStorage.getItem("Authorization") !== null &&
        this.$route.path == "/login"
      ) {
        this.$router.push("/pengaduanMasy"); // redirect to home, for example
      }
    };
  },
};
</script>
