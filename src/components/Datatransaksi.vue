<template>
  <div>
    <div id="nav">
      <router-link to="/utama">Beranda</router-link> |
      <router-link to="/dataanggota">Data Anggota</router-link> |
      <router-link to="/datatransaksi">Data Transaksi</router-link>
    </div>
    <router-view/>
    <hr>
    <h1>Input Data Transaksi</h1>
    <div class="container">
    <form @submit.prevent="add">
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.id" placeholder="id">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.nama" placeholder="nama">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.deskripsi" placeholder="deskripsi">
      </div>
      <div class="form-group">
        <input type="number" class="form-control" v-model="form.nilai" placeholder="nilai">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.tanggal" placeholder="tanggal">
      </div>
      <button type="submit" class="btn btn-success" v-show="!updateSubmit">Tambah Data</button>
      <button type="button" class="form-control btn btn-primary" v-show="updateSubmit" @click="update(form)">Update</button>
    </form>
    </div>
    <hr>
    <table class="table table-bordered container" border="solid 1px" align="center">
      <thead class="table thead-dark">
        <tr>
          <th>ID</th>
          <th>NAMA</th>
          <th>DESKRIPSI</th>
          <th>NILAI</th>
          <th>TANGGAL</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.idd">
          <td>{{user.id}}</td>
          <td>{{user.nama}}</td>
          <td>{{user.deskripsi}}</td>
          <td>{{user.nilai}}</td>
          <td>{{user.tanggal}}</td>
          <td><button @click="edit(user)">Edit</button>
          <button @click="del(user)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */ 
import axios from 'axios'
export default {
  name: 'Datatransaksi',
  data(){
    return{
        form: {
          id: '',
          nama: '',
          deskripsi: '',
          nilai: '',
          tanggal: ''
        },
        users: '',
        updateSubmit: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:3000/data_transaksi').then(res => {
        this.users = res.data
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://localhost:3000/data_transaksi/', this.form).then(res => {
          this.load()
          this.form.id = ''
          this.form.nama = ''
          this.form.deskripsi = ''
          this.form.nilai = ''
          this.form.tanggal = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id
        this.form.nama = user.nama
        this.form.deskripsi = user.deskripsi
        this.form.nilai = user.nilai
        this.form.tanggal = user.tanggal
    },
    update(form){ 
       return axios.put('http://localhost:3000/data_transaksi/' + form.id , this.form).then(res => {
        this.load()
        this.form.id = ''
        this.form.nama = ''
        this.form.deskripsi = ''
        this.form.nilai = ''
        this.form.tanggal = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
      })
    },
    del(user){
      axios.delete('http://localhost:3000/data_transaksi/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(form.nama)
          let index1 = this.users.indexOf(form.deskripsi)
          let index2 = this.users.indexOf(form.nilai)
          let index3 = this.users.indexOf(form.tanggal)
          this.users.splice(index,1)
          this.users.splice(index1,1)
          this.users.splice(index2,1)
          this.users.splice(index3,1)
      })
    }
  }
}
</script>