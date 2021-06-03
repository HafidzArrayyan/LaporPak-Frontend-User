<template>
<!-- <div class="container-scroller" id="container"> -->
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <!-- <div class="navbar-brand brand-logo">
                  <img height="auto" width="auto" class="my-3" src="../../public/img/Logo.png" alt="">
                </div> -->
                <h4>Selamat Datang!</h4>
                <h6 class="font-weight-light">Belum memiliki akun? Silahkan melakukan register</h6>
                <form class="pt-3" v-on:submit.prevent="Register">
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="nik" name="nik" placeholder="NIK" v-model="nik" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="nama" name="nama" placeholder="Nama Lengkap" v-model="nama" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="telp" name="telp" placeholder="Telepon" v-model="telp" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="username" name="username" placeholder="Username" v-model="username" required>
                    </div>
                  </div>
                 <!-- <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="level" name="level" placeholder="Ketik Masyarakat" v-model="level" required>
                    </div>
                  </div> -->
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="password" class="form-control form-control-lg border-left-0" name="password" id="password" placeholder="Password" v-model="password" required>                        
                    </div>
                  </div>
                  <div class="my-3">
                    <input type="submit" name="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" v-on:click="Register()" value="REGISTER" href="#pablo">
                  </div>
                </form>
                <a href="/login" align-text="center"><center>Klik disini untuk login</center></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: "register",
    data() {
      return {
        nik: '',
        nama: '',
        telp: '',
        username: '',
        level: '',
        password: ''
      }
    },
    methods: {
        Register : function(){
        let nik = this.nik;
        let nama = this.nama;
        let telp = this.telp;
        let username = this.username;
        let level = this.level;
        let password = this.password;
        this.$store
        .dispatch('register',{
        nik,
        nama,
        telp,
        username,
        level,
        password
       })
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err));
     }
    //  onFileChange(e) {
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length)
    //     return;
    //   this.createImage(files[0]);
    //   },
    //   createImage(file) {
    //     var foto = new Foto();
    //     var reader = new FileReader();
    //     var vm = this;

    //   reader.onload = (e) => {
    //     vm.foto = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
}
</script>