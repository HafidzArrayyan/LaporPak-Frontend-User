<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <p class="card-title float-left ml-4 mt-3"><b>Form Pengaduan</b></p>
            <div class="card-body">
              <!-- <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalPengaduan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
              </p> -->
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
                  <label for="id_kategori" class="col-form-label"
                    >Kategori</label
                  >
                  <b-form-select
                    id="id_kategori"
                    v-model="id_kategori"
                    v-on:input="Add"
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
                <b-button type="submit" variant="primary">Submit</b-button>
              </form>
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
      kategori: [],
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
      this.axios.get("/kategori", conf).then((response) => {
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
          .post("/pengaduan", form, conf)
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
