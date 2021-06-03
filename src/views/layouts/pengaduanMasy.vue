<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Pengaduan</b></p>
              <p class="card-description float-right">
                <b-button
                  variant="success"
                  v-b-modal.modalpengaduan
                  v-on:click="Add"
                  ><i class="mdi mdi-cursor-pointer btn-icon-prepend"></i>
                  Lapor</b-button
                >
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(kategori)="data">
                    <b-badge variant="outline-primary">{{
                      data.item.kategori.nama_kategori
                    }}</b-badge>
                  </template>
                  <template v-slot:cell(tanggapan)="data">
                      {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                    </template>
                  <template v-slot:cell(status)="data">
                    <b-badge
                      variant="primary"
                      v-if="data.item.status === 'terkirim'"
                      >{{ data.item.status }}</b-badge
                    >
                    <b-badge
                      variant="warning"
                      v-if="data.item.status === 'proses'"
                      >{{ data.item.status }}</b-badge
                    >
                    <b-badge
                      variant="success"
                      v-if="data.item.status === 'selesai'"
                      >{{ data.item.status }}</b-badge
                    >
                    <b-badge
                      variant="danger"
                      v-if="data.item.status === 'tolak'"
                      >{{ data.item.status }}</b-badge
                    >
                  </template>
                  <template v-slot:cell(foto)="data">
                    <b-badge
                      class="btn"
                      variant="secondary"
                      v-on:click="getFoto(data.item.id_pengaduan)"
                      >Lihat Foto</b-badge
                    >
                  </template>
                  <!-- <template v-slot:cell(Aksi)="data"> -->
                  <!-- <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalPengaduan><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp; -->
                  <!-- <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)"><i class="mdi mdi-close btn-icon-prepend"></i> Batalkan</b-button> -->
                  <!-- </template> -->
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination"
                >
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

    <b-modal id="modalpengaduan" size="md" @ok="Save">
      <template v-slot:modal-title> Form Data Pengaduan </template>
      <form ref="form" enctype="multipart/form-data">
        <div class="form-group">
          <label for="tgl_pengaduan" class="form-control-label"
            >Tanggal Pengaduan</label
          >
          <input
            type="date"
            v-model="tgl_pengaduan"
            name="tgl_pengaduan"
            class="form-control"
            id="tgl_pengaduan"
            placeholder="Tanggal Pengaduan"
          />
        </div>
        <div class="form-group">
          <label for="isi_laporan" class="form-control-label"
            >Isi Laporan</label
          >
          <input
            type="text"
            v-model="isi_laporan"
            name="isi_laporan"
            class="form-control"
            id="isi_laporan"
            placeholder="Isi Laporan"
          />
        </div>
        <div class="form-group">
          <label for="id_kategori" class="col-form-label">Kategori</label>
          <b-form-select
            id="id_kategori"
            v-model="id_kategori"
            :options="kategori"
          ></b-form-select>
        </div>
        <div class="form-group">
          <label for="foto" class="form-control-label">Foto</label>
          <input
            type="file"
            id="foto"
            class="form-control"
            @change="uploadImage($event)"
            placeholder="Foto"
          />
        </div>
      </form>
    </b-modal>

    <b-modal id="modalFoto" size="md" hide-footer>
      <template v-slot:modal-title> Detail Foto </template>
      <div id="foto_detail">
        <img width="100%" :src="'http://localhost:8000/uploads/' + foto" />
      </div>
      <b-button
        class="mb-3 mt-3 bg-dark text-white"
        block
        @click="$bvModal.hide('modalFoto')"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      search: "",
      id_pengaduan: "",
      isi_laporan: "",
      tgl_pengaduan: "",
      id_kategori: "",
      status: "",
      foto: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      token: "",
      tanggapan: [],
      pengaduan: [],
      kategori: [],
      fields: [
        // "Aksi",
        "tgl_pengaduan",
        "isi_laporan",
        "kategori",
        "tanggapan",
        "foto",
        "status",
      ],
    };
  },

  methods: {
    getData: function () {
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.message = "Mohon tunggu...";
      this.axios
        .get("/masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
        .then((response) => {
          if (response.data.success == true) {
            this.message = "";
            this.pengaduan = response.data.data.pengaduan;
            this.rows = response.data.data.count;
          } else {
            this.message = "Gagal menampilkan data pengaduan.";
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ name: "login" });
        });
    },

    pagination: function () {
      if (this.search == "") {
        this.getData();
      } else {
        this.searching();
      }
    },

    getKategoriDropdown: function () {
      //ambil data kategori untuk dropdown
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.axios.get("/masyarakat/kategori/" + this.perPage + "/" + offset, conf).then((response) => {
        let list_kategori = [];
        let json_kategori = response.data.data.kategori;
        json_kategori.forEach((element) => {
          list_kategori.push({
            value: element.id_kategori,
            text: element.nama_kategori,
          });
        });
        this.kategori = list_kategori;
      });
    },

    getTanggapan: function (id) {
      //ambil data kategori untuk dropdown
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.axios.get("/masyarakat/pengaduan/" + id + "/" + this.perPage + "/" + offset, conf).then((response) => {
        let list_tanggapan = [];
        let json_tanggapan = response.data.data.pengaduan;
        json_tanggapan.forEach((element) => {
          list_tanggapan.push({
            value: element.id_pengaduan,
            text: element.tanggapan,
          });
        });
        this.tanggapan = list_tanggapan;
      });
    },

    uploadImage(e) {
      this.foto = e.target.files[0];
    },

    Add: function () {
      this.action = "insert";
      this.isi_laporan = "";
      this.tgl_pengaduan = "";
      this.id_kategori = "";
      this.foto = "";
      this.status = "";
      this.getKategoriDropdown(); 
    },

    Edit: function (id) {
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      this.axios
        .get("/pengaduan/" + id, conf)
        .then((response) => {
          if (response.data.success == true) {
            this.action = "update";
            this.id_pengaduan = response.data.data.pengaduan[0].id_pengaduan;
            this.status = response.data.data.pengaduan[0].status;
          } else {
            this.message = "Gagal menampilkan data kategori.";
            this.$router.push({ name: "kategori" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getFoto: function (id) {
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.axios
        .get(
          "/masyarakat/pengaduan/" + id + "/" + this.perPage + "/" + offset,
          conf
        )
        .then((response) => {
          if (response.data.success == true) {
            this.foto = response.data.data.pengaduan[0].foto;
            this.$bvModal.show("modalFoto");
          } else {
            this.message = "Gagal menampilkan data foto pengaduan.";
            this.$router.push({ name: "pengaduanMasy" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Lihat: function (id) {
      this.getKategoriDropdown();

      let conf = {
        headers: {
          Authorization: "Bearer " + this.token,
          "content-type": "multipart/form-data",
        },
      };
      this.axios
        .get("/pengaduan/" + id, conf)
        .then((response) => {
          if (response.data.success == true) {
            this.action = "update";
            this.id_kategori = response.data.data.pengaduan[0].id_kategori;
            this.isi_laporan = response.data.data.pengaduan[0].isi_laporan;
            this.tgl_pengaduan = response.data.data.pengaduan[0].tgl_pengaduan;
            this.foto = response.data.data.pengaduan[0].foto;
            this.status = response.data.data.pengaduan[0].status;
          } else {
            this.message = "Gagal menampilkan data pengaduan.";
            this.$router.push({ name: "pengaduan" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Save: function () {
      let conf = {
        headers: {
          Authorization: "Bearer " + this.token,
          "content-type": "multipart/form-data",
        },
      };
      if (this.action === "insert") {
        let form = new FormData();
        form.append("id_kategori", this.id_kategori);
        form.append("isi_laporan", this.isi_laporan);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("foto", this.foto);

        this.axios
          .post("/masyarakat/pengaduan", form, conf)
          .then((response) => {
            this.message = "Mohon tunggu...";
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = "";
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.action === "update") {
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("status", this.status);
        this.axios
          .post("/pengaduan/status", form, conf)
          .then((response) => {
            this.message = "Mohon tunggu...";
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = "";
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        let form = {
          isi_laporam: this.isi_laporam,
          tgl_pengaduan: this.tgl_pengaduan,
          id_kategori: this.id_kategori,
          foto: this.foto,
        };
        this.axios
          .put("/pengaduan/" + this.id_pengaduan, form, conf)
          .then((response) => {
            this.message = "Mohon tunggu...";
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    Drop: function (id) {
      let conf = { headers: { Authorization: "Bearer " + this.token } };
      if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
        this.message = "Mohon tunggu...";
        this.axios
          .delete("/pengaduan/" + id, conf)
          .then((response) => {
            this.getData();
            this.message = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>
