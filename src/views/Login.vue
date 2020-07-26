<template>
<div class="container">
    <div class="alert alert-danger" v-if="pesan != ''">{{pesan}}</div>\
    <div class="container">
        <h1>Sign In</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" required autofocus v-model="email"/>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" required v-model="sandi"/>

        <div class="clearfix">
        <button type="submit" class="signupbtn" v-on:click="masuk">Sign In</button>
        </div>
    </div>
</div>
</template>

<script>
const axios = require('axios').default
export default {
  name: 'Login',
  data: function () {
    return {
      email: 'galihadiwijaya2@gmail.com',
      sandi: 'galih',
      pesan: ''
    }
  },
  methods: {
    masuk: function () {
      axios.get('http://localhost:3000/user', {
        params: {
          email: this.email,
          sandi: this.sandi
        }
      })
        .then(function (resp) {
          console.log('resp axios ', resp)
          const arrpg = resp.data

          if (arrpg.length === 1) {
            const pg = arrpg[0]
            if (pg.email === this.email && pg.sandi === this.sandi) {
              this.$router.push({ name: 'Utama' })
            } else {
              this.pesan = 'nama atau sandi salah'
            }
          } else {
            this.pesan = 'pengguna tidak ada'
          }
        }.bind(this))
    }
  }
}
</script>

<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
}
</style>
