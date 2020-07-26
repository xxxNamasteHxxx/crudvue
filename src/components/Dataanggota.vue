<template>
  <div>
    <div id="nav">
      <router-link to="/utama">Beranda</router-link> |
      <router-link to="/dataanggota">Data Anggota</router-link> |
      <router-link to="/datatransaksi">Data Transaksi</router-link>
    </div>
    <router-view/>
    <hr>
    <h1>Input Data Anggota</h1>
    <div class="container">
    <form @submit.prevent="add">
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.id" placeholder="id">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.nama" placeholder="nama">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.alamat" placeholder="alamat">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.jenis_kelamin" placeholder="jenis kelamin">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.nik" placeholder="nik">
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
          <th>ALAMAT</th>
          <th>JENIS KELAMIN</th>
          <th>NIK</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.idd">
          <td>{{user.id}}</td>
          <td>{{user.nama}}</td>
          <td>{{user.alamat}}</td>
          <td>{{user.jenis_kelamin}}</td>
          <td>{{user.nik}}</td>
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
  name: 'Dataanggota',
  data(){
    return{
        form: {
          id: '',
          nama: '',
          alamat: '',
          jenis_kelamin: '',
          nik: ''
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
        axios.get('http://localhost:3000/data_anggota').then(res => {
        this.users = res.data
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://localhost:3000/data_anggota/', this.form).then(res => {
          this.load()
          this.form.id = ''
          this.form.nama = ''
          this.form.alamat = ''
          this.form.jenis_kelamin = ''
          this.form.nik = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id
        this.form.nama = user.nama
        this.form.alamat = user.alamat
        this.form.jenis_kelamin = user.jenis_kelamin
        this.form.nik = user.nik
    },
    update(form){ 
       return axios.put('http://localhost:3000/data_anggota/' + form.id , this.form).then(res => {
        this.load()
        this.form.id = ''
        this.form.nama = ''
        this.form.alamat = ''
        this.form.jenis_kelamin = ''
        this.form.nik = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
      })
    },
    del(user){
      axios.delete('http://localhost:3000/data_anggota/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(form.nama)
          let index1 = this.users.indexOf(form.alamat)
          let index2 = this.users.indexOf(form.jenis_kelamin)
          let index3 = this.users.indexOf(form.nik)
          this.users.splice(index,1)
          this.users.splice(index1,1)
          this.users.splice(index2,1)
          this.users.splice(index3,1)
      })
    }
  }
}
</script>