<template>
  <div class="home">
    <div class="container-scroller">
      <!-- partial:partials/_horizontal-navbar.html -->
      <div class="horizontal-menu">
        <nav class="bottom-navbar">
          <div class="container">
            <!-- <ul class="nav page-navigation">
              <li class="nav-item">
                <a class="nav-link" href="index.html">
                  <i class="mdi mdi-view-dashboard-outline menu-icon"></i>
                  <span class="menu-title">Beranda</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="petugas_tatib.html">
                  <i class="mdi mdi-account-settings menu-icon"></i>
                  <span class="menu-title">Petugas Tatib</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="data_siswa.html">
                  <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                  <span class="menu-title">Data Siswa</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="data_pelanggaran.html" class="nav-link">
                  <i class="mdi mdi-codepen menu-icon"></i>
                  <span class="menu-title">Pelanggaran</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="input_pelanggaran.html" class="nav-link">
                  <i class="mdi mdi-puzzle-outline menu-icon"></i>
                  <span class="menu-title">Input Pelanggaran</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="poin_siswa.html" class="nav-link">
                  <i class="mdi mdi-image-filter menu-icon"></i>
                  <span class="menu-title">Poin Siswa</span>
                </a>
              </li>
            </ul> -->
          </div>
        </nav>
      </div>

      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                <div class="row">
                  <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                    <div class="card bg-gradient-primary text-white text-center card-shadow-primary">
                      <div class="card-body" :items="beranda">
                        <h6 class="font-weight-normal">Data Siswa</h6>
                        <h2 class="mb-0"></h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                    <div class="card bg-gradient-warning text-white text-center card-shadow-warning">
                      <div class="card-body">
                        <h6 class="font-weight-normal">Data Petugas</h6>
                        <h2 class="mb-0">8</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                    <div class="card bg-gradient-danger text-white text-center card-shadow-danger">
                      <div class="card-body">
                        <h6 class="font-weight-normal">Data Pelanggaran</h6>
                        <h2 class="mb-0">120</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                    <div class="card bg-gradient-success text-white text-center card-shadow-success">
                      <div class="card-body">
                        <h6 class="font-weight-normal">Siswa Melanggar Hari Ini</h6>
                        <h2 class="mb-0">12</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h6 class="card-title"><i class="mdi mdi-finance menu-icon"></i> Poin Tertinggi</h6>
                    </div>
                    <div class="list d-flex align-items-center border-bottom pb-3">
                      <div class="wrapper w-100">
                        <p><b>George Bambang Prakoso</b> <span class="badge badge-danger">300</span></p>
                        <small class="text-muted">XI RPL 2</small>
                      </div>
                    </div>
                    <div class="list d-flex align-items-center border-bottom py-3">
                      <div class="wrapper w-100">
                        <p><b>John Fikri Santoso</b> <span class="badge badge-danger">280</span></p>
                        <small class="text-muted">XII TKJ 3</small>
                      </div>
                    </div>
                    <div class="list d-flex align-items-center border-bottom py-3">
                      <div class="wrapper w-100">
                        <p><b>Peter Sudarmono Pambudi</b> <span class="badge badge-danger">260</span></p>
                        <small class="text-muted">X RPL 6</small>
                      </div>
                    </div>
                    <div class="list d-flex align-items-center border-bottom py-3">
                      <div class="wrapper w-100">
                        <p><b>Nateila Ayu Rahmawati</b> <span class="badge badge-danger">200</span></p>
                        <small class="text-muted">X TKJ 2</small>
                      </div>
                    </div>
                    <div class="list d-flex align-items-center pt-3">
                      <div class="wrapper w-100">
                        <p><b>Ahmad Tom Jerry</b> <span class="badge badge-danger">187</span></p>
                        <small class="text-muted">3 hours ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <footer class="footer">
            <div class="w-100 clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2021 </span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Layanan Pengaduan Masyarakat & Made With <i class="mdi mdi-heart-outline text-danger"></i></span>
            </div>
          </footer>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'home',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          let form = new FormData();
          this.axios.post('/logout', form, conf).then(response => {
            if (response.data.logged === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },
  },
}
</script>
