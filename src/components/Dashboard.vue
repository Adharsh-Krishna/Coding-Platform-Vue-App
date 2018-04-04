<template>
  <body>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" @click="home"><b>Coding Platform</b></el-menu-item>
   <!-- <el-menu-item index="2"><b>Problem Solving</b></el-menu-item>
    <el-menu-item index="3"><b>Algorithms</b></el-menu-item>
    <el-menu-item index="4"><b>Data Structures</b></el-menu-item>-->

    <el-submenu index="2" style="float:right">
      <template slot="title">{{profileName}}</template>
      <el-menu-item index="2-1" @click="settings">Settings</el-menu-item>
      <el-menu-item index="2-2" @click="leaderboard">Leader Board</el-menu-item>
      <el-menu-item index="2-3" @click="logout">Logout</el-menu-item>
    </el-submenu>
  </el-menu>
  <el-row>
    <el-col :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../assets/logo.png" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <time class="time"></time>
          </div>
        </div>
      </el-card>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"

        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-menu-item index="1" align="left">
            <i class="el-icon-caret-right"></i>
            <span>{{profileName}}</span>
          </el-menu-item>
        <el-menu-item index="2"  align="left">
          <i class="el-icon-caret-right"></i>
          <span>{{department}}</span>
        </el-menu-item>
        <el-menu-item index="3"  align="left">
          <i class="el-icon-caret-right"></i>
          <span>{{rollNumber}}</span>
        </el-menu-item>
        <el-menu-item index="4"  align="left">
          <i class="el-icon-caret-right"></i>
          <span>{{year}}</span>
        </el-menu-item>
        <el-menu-item index="5"  align="left">
          <i class="el-icon-caret-right"></i>
          <span>{{rank}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="7" style="padding-top: 20px;padding-left: 50px;" @click="gotoAlgo">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../assets/algorithms.png" class="image" width="200px" @click="gotoAlgo">
            <div style="padding: 14px;">
              <span  >ALGORITHMS</span>
              <div class="bottom clearfix">
                <time class="time"></time>
              </div>
            </div>
          </el-card>
        </el-col>
      <el-col :span="7" style="padding-top: 20px;padding-left: 50px;" >
        <el-card :body-style="{ padding: '0px' }" >
          <img src="../assets/ds.png" class="image" width="200px" @click="gotoDS">
          <div style="padding: 14px;">
            <span>DATA STRUCTURES</span>
            <div class="bottom clearfix">
              <time class="time"></time>
            </div>
          </div>
        </el-card>
      </el-col>
  <el-col :span="7" style="padding-top: 20px;padding-left: 50px;" >
    <el-card :body-style="{ padding: '0px' }" >
      <img src="../assets/math.png" class="image" width="200px" @click="gotoPS">
      <div style="padding: 14px;">
        <span>PROBLEM SOLVING</span>
        <div class="bottom clearfix">
          <time class="time"></time>
        </div>
      </div>
    </el-card>
  </el-col>
      </el-row>
    </el-col>
  </el-row>
  </body>
</template>

<script>
  import axios from 'axios';
  import router from '../router/index'
  import store from '../../store/store'
  import url from '../../config/url.js'

  export default{
    name : 'Dashboard',
    data(){
      return {
        profileName:this.$cookies.get('user_name'),
        department:this.$cookies.get('user_dept'),
        points:this.$cookies.get('user_points'),
        rollNumber:this.$cookies.get('user_rollnumber'),
        year:this.$cookies.get('user_year'),
        rank:this.$cookies.get('user_rank'),
        user_id:this.$cookies.get('user_id'),
        cookie:this.$cookies.get('user_state')
      }
    },
    methods:{
      getData:function () {
        console.log("something");
        let self=this
        let params={}
        params.id=self.$cookies.get('user_id')
        params.type="info"
        console.log(params)
        axios.post(url.APP_URL+":2000/get",params).then(function (result) {
          console.log(result.data);
          if(result.data!=="" && result.status===200)
          {
            self.profileName=result.data[0].Name
            self.department=result.data[0].Department
            self.rollNumber=result.data[0].Roll_Number
            self.year=result.data[0].Year
            console.log(result.data);
            self.$cookies.set("user_rollnumber",self.rollNumber)
            self.$cookies.set("user_name",self.profileName)
            self.$cookies.set("user_dept",self.department)
            self.$cookies.set("user_year",self.year)
            self.$cookies.set("user_dob",result.data.Dob)
            self.$cookies.set("user_phone",result.data.Phone)
          }
        }).catch(function (err) {
          console.log(err.message);
        })
      },
      logout:function () {
        this.$cookies.remove("user_id");
        this.$cookies.remove('user_name');
        this.$cookies.remove('user_dept');
        this.$cookies.remove('user_year');
        this.$cookies.remove('user_rollnumber');
        this.$cookies.remove('user_points');
        router.push('/login');
      },
      settings:function () {
        router.push('/settings')
      },
      leaderboard:function () {
        router.push('/leaderboard')
      },
      gotoAlgo:function () {
        console.log("hereal")
        router.push('/algorithms')
      },
      gotoDS:function () {
        router.push('/data-structures')
      },
      gotoPS:function () {
        router.push('/problem-solving')
      },
      home:function () {
        router.push('/dashboard')
      }
    },
    mounted:function () {

      if(this.$cookies.get('user_state'))
      {
        // this.$cookies.set("user_id",store.state.user_id)
        // this.$cookies.set("user_state",store.state.isLoggedIn)
        this.getData()

      }
      else {
        console.log(this.$cookies.get('user_state'));
        router.push('/login')
      }

    }
  }
</script>
