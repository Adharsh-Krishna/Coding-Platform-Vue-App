<template>

  <div class="login-card">

    <h1>Reset Password</h1><br>

    <form>
      <input type="password" v-model="otp" placeholder="Enter your OTP" pattern=".{4,10}" required title="8 characters minimum"><br>
      <input v-on:click="check_otp" name="login" class="login login-submit" v-bind:value="button_text">
    </form>



    <div class="login-help">
      <br>

      <h3 v-if="flag" style="color: red;"><b>{{err}}</b></h3>
    </div>
  </div>

</template>


<script>
  import axios from 'axios';
  import router from '../router/index'
  import url from '../../config/url.js'
  export default {
    name:'Otp',
    data(){
      return {
          button_text:"check OTP",
        email:"adharshrp@gmail.com",
        otp:"",
        err:"",
        flag:false
      }
    },
    methods:{
      check_otp:function () {
        let self=this
        let params={}
        params.email=this.email
        axios.post(url.APP_URL+":4000/get-otp",params).then(function (result) {
          if(result.data!=="" && result.status!==200)
          {
            throw new Error("otp reception failed");
          }
          if(self.otp===result.data.otp)
          {
            console.log("correct otp");
            self.err="Correct OTP";
            self.flag=true
          }
        }).catch(function (err) {
          console.log(err.message);
          self.flag=false;
          self.err="Incorrect OTP"
        })
      }
    }
  }
</script>


<style scoped>
  @import url(http://fonts.googleapis.com/css?family=Roboto:400,100);

  body {
    background: url(https://dl.dropboxusercontent.com/u/23299152/Wallpapers/wallpaper-22705.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-family: 'Roboto', sans-serif;
  }

  .login-card {
    padding: 40px;
    width: 274px;
    background-color: #F7F7F7;
    margin: 0 auto 10px;
    border-radius: 2px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .login-card h1 {
    font-weight: 100;
    text-align: center;
    font-size: 2.3em;
  }

  .login-card input[type=submit] {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    position: relative;
  }

  .login-card input[type=text], input[type=password] {
    height: 44px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
    -webkit-appearance: none;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-top: 1px solid #c0c0c0;
    /* border-radius: 2px; */
    padding: 0 8px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .login-card input[type=text]:hover, input[type=password]:hover {
    border: 1px solid #b9b9b9;
    border-top: 1px solid #a0a0a0;
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .login {
    text-align: center;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    font-weight: 700;
    height: 36px;
    padding: 0 8px;
    /* border-radius: 3px; */
    /* -webkit-user-select: none;
      user-select: none; */
  }

  .login-submit {
    /* border: 1px solid #3079ed; */
    border: 0px;
    color: #fff;
    text-shadow: 0 1px rgba(0,0,0,0.1);
    background-color: #4d90fe;
    /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#4787ed)); */
  }

  .login-s {
    /* border: 1px solid #3079ed; */
    border: 0px;
    color: #fff;
    text-shadow: 0 1px rgba(0,0,0,0.1);
    background-color: #d348;
    /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#4787ed)); */
  }

  .login-submit:hover {
    /* border: 1px solid #2f5bb7; */
    border: 0px;
    text-shadow: 0 1px rgba(0,0,0,0.3);
    background-color: #357ae8;
    /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#357ae8)); */
  }

  .login-card a {
    text-decoration: none;
    color: #666;
    font-weight: 400;
    text-align: center;
    display: inline-block;
    opacity: 0.6;
    transition: opacity ease 0.5s;
  }

  .login-card a:hover {
    opacity: 1;
  }

  .login-help {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

</style>

