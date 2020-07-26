<template>
  <div>
    <div id="nav">
      <router-link to="/utama">Beranda</router-link> |
      <router-link to="/dataanggota">Data Anggota</router-link> |
      <router-link to="/datatransaksi">Data Transaksi</router-link>
    </div>
    <router-view/>
    <hr>
    <h1>Input Data User</h1>
    <div class="container">
    <form @submit.prevent="add">
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.id" placeholder="id">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.email" placeholder="email">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.namadepan" placeholder="nama depan">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.namabelakang" placeholder="nama belakang">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="form.sandi" placeholder="sandi">
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
          <th>EMAIL</th>
          <th>NAMA DEPAN</th>
          <th>NAMA BELAKANG</th>
          <th>SANDI</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.idd">
          <td>{{user.id}}</td>
          <td>{{user.email}}</td>
          <td>{{user.namadepan}}</td>
          <td>{{user.namabelakang}}</td>
          <td>{{user.sandi}}</td>
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
  name: 'Utama',
  data(){
    return{
        form: {
          id: '',
          email: '',
          namadepan: '',
          namabelakang: '',
          sandi: ''
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
        axios.get('http://localhost:3000/user').then(res => {
        this.users = res.data
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://localhost:3000/user/', this.form).then(res => {
          this.load()
          this.form.id = ''
          this.form.email = ''
          this.form.namadepan = ''
          this.form.namabelakang = ''
          this.form.sandi = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id
        this.form.email = user.email
        this.form.namadepan = user.namadepan
        this.form.namabelakang = user.namabelakang
        this.form.sandi = user.sandi
    },
    update(form){ 
       return axios.put('http://localhost:3000/user/' + form.id , this.form).then(res =>{
        this.load()
        this.form.sandi = ''
        this.form.email = ''
        this.form.namadepan = ''
        this.form.namabelakang = ''
        this.form.id = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
      })
    },
    del(user){
      axios.delete('http://localhost:3000/user/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(form.email)
          let index1 = this.users.indexOf(form.namadepan)
          let index2 = this.users.indexOf(form.namabelakang)
          let index3 = this.users.indexOf(form.sandi)
          this.users.splice(index,1)
          this.users.splice(index1,1)
          this.users.splice(index2,1)
          this.users.splice(index3,1)
      })
    }
  }
}
</script>