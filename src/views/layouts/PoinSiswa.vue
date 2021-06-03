<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Poin Siswa</b></p>
              <p class="card-description float-right">
                <!-- <b-button variant="success" v-b-modal.modalDetail><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button> -->
              </p>
              <div class="table-responsive">
                <!-- <b-nav-form> -->
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Pencarian siswa..." v-model="search" v-on:keyup.enter="Cari"></b-form-input>
                  <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="success" v-on:click="Cari(data.item.id)">Search</b-button> -->
                <!-- </b-nav-form> -->
                <b-table striped hover :items="data_poin" :fields="fields">
                  <template v-slot:cell(total_poin)="data">
                    <h5><b-badge variant="primary">{{ data.item.total_poin }}</b-badge></h5>
                  </template>
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="warning" v-on:click="Detail(data.item.id)" v-b-modal.modalPoin><i class="mdi mdi-file-document-box-outline btn-icon-prepend"></i> Detail</b-button>&nbsp;
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modalPoin"
      hide-footer="true"
    >
      <template v-slot:modal-title>
        Detail Poin Siswa
      </template>
          <b-table striped hover :items="detail_poin" :fields="fields_detail">
            <template v-slot:cell(poin)="data">
              <h5><b-badge variant="primary">{{ data.item.poin }}</b-badge></h5>
            </template>
          </b-table>
    </b-modal>

  </div>
</template>


<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      id_siswa: "",
      id_pelanggaran: "",
      total_poin:"",
      kelas:"",
      nis:"",
      poin:"",
      keterangan: "",
      tanggal: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      data_poin: [],
      detail_poin: [],
      fields: ["nis", "nama_siswa", "kelas", "total_poin", "Aksi"],
      fields_detail: ["tanggal", "nama_pelanggaran", "kategori", "keterangan", "poin"],
      nama_siswa: [],
      nama_pelanggaran: []
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/poin_siswa/"+this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.data_poin = response.data.poin;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pelanggaran."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }

      })

      .catch(error => {
        console.log(error);
      });
    },

    Detail : function(id){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      this.axios.get("/poin_siswa/" +id, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.detail_poin = response.data.detail;
          // this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data detail poin."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }

      })
    },

    Cari : function(id){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      let form = new FormData();
      form.append("find", this.search)
      this.axios.post("/poin_siswa/" +this.perPage + "/" + offset,form,conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.data_poin = response.data.poin;
          this.rows = response.data.count;
        }else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data detail poin."
          this.$bvToast.show("message");
        }
      })
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>
