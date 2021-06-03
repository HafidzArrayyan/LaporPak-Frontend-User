<template>
    <!-- <div>
        <b-navbar toggleable="sm" type="light" variant="dark">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle> -->
            <!-- <b-navbar-brand>MyApps</b-navbar-brand> -->
            <!-- <img src="assets/img/logo.svg">
            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav class="ml-auto p-1 ">
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" href="index.html"> -->
                  <!-- <router-link to="/" class="nav-link">
                    <i class="mdi mdi-view-dashboard-outline menu-icon text-white"></i>
                    <span class="menu-title text-white">Beranda</span> -->
                  <!-- </a> -->
                  <!-- </router-link>
                </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" to="/petugasTatib"> -->
                  <!-- <router-link to="/petugasTatib" class="nav-link">
                    <i class="mdi mdi-account-settings menu-icon text-white"></i>
                     <span class="menu-title text-white">Petugas Tatib</span>
                     </router-link> -->
                  <!-- </a> -->
                <!-- </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" to="/petugasTatib"> -->
                  <!-- <router-link to="/dataSiswa" class="nav-link">
                    <i class="mdi mdi-file-document-box-outline menu-icon text-white"></i>
                     <span class="menu-title text-white">Data Siswa</span>
                     </router-link> -->
                  <!-- </a> -->
                <!-- </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" to="/petugasTatib"> -->
                  <!-- <router-link to="/dataPelanggaran" class="nav-link">
                    <i class="mdi mdi-codepen menu-icon text-white"></i>
                     <span class="menu-title text-white">Pelanggaran</span>
                     </router-link> -->
                  <!-- </a> -->
                <!-- </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" to="/petugasTatib"> -->
                  <!-- <router-link to="/inputPelanggaran" class="nav-link">
                    <i class="mdi mdi-puzzle-outline menu-icon text-white"></i>
                     <span class="menu-title text-white">Input Pelanggaran</span>
                     </router-link> -->
                  <!-- </a> -->
                <!-- </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" to="/petugasTatib"> -->
                  <!-- <router-link to="/poinSiswa" class="nav-link">
                    <i class="mdi mdi-image-filter menu-icon text-white"></i>
                     <span class="menu-title text-white">Poin Siswa</span>
                     </router-link> -->
                  <!-- </a> -->
                <!-- </li>
              </b-nav-item>
              <b-nav-item href="">
                <li class="nav-item"> -->
                  <!-- <a class="nav-link" href="/logout"> -->
                  <!-- <router-link to="/login" class="nav-link">
                    <i class="mdi mdi-logout text-primary"></i>
                    <span class="menu-title text-white">Logout</span> -->
                  <!-- </a> -->
                  <!-- </router-link>
                </li>
              </b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div> -->
    <div class="horizontal-menu">
      <nav class="navbar top-navbar col-lg-12 col-12 p-0 bg-dark">
        <div class="nav-top flex-grow-1">
          <div class="container d-flex flex-row h-100 align-items-center">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a class="navbar-brand brand-logo" href=""><img src="../../assets/img/logo4.png"></a>
              <a class="navbar-brand brand-logo-mini" href=""><img src="../../assets/img/logo4.png"></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1">
              <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                  <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                    Welcome!
                  </a>
                  <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <router-link to="/login" class="nav-link">
                      <a @click="logout" class="ml-4"><i class="mdi mdi-logout text-primary"></i> Logout</a>
                    </router-link>
                  </div>
                </li>
              </ul>
              <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                <span class="mdi mdi-menu"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav class="bottom-navbar">
        <div class="container">
          <ul class="nav page-navigation">
            <li class="nav-item">
              <router-link to="/pengaduanMasy" class="nav-link">
                <i class="mdi mdi-archive menu-icon"></i>
                <span class="menu-title">Pengaduan</span>
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/lapor" class="nav-link">
                <span class="menu-title btn btn-success"><i class="mdi mdi-cursor-pointer menu-icon text-white"></i>Lapor</span>
              </router-link>
            </li> -->
          </ul>
        </div>
      </nav>
    </div>
</template>
<script>
export default {
   name : 'header',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        username : function(){ return this.$store.getters.userDetail.name},
        role : function(){ return this.$store.getters.userDetail.role}
    },
    methods:{
      logout:function(){
        let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
        let form = new FormData();
        this.axios.post('/logout', form, conf).then(response => {
            if (response.data.success === true) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
        }).catch(error => {

        })
      },
  },
}
</script>
