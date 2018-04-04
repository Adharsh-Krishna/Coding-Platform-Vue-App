<template>
  <body>
  <el-menu
    :default-active="2"
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
    <el-col :span="10" style="margin-left: 10px;">
      <bar :data="{ labels: ['Algorithms', 'Data Structures', 'Problem Solving'],
      datasets: [
        {
          label: 'User Info',
          backgroundColor: '#f87979',
          data:[barData1,barData2,barData3]
        }
      ]}"
           :options="{responsive: true, maintainAspectRatio: false}"
           style="height: 500px"
      ></bar>
    </el-col>
    <el-col :span="5" style="margin-top: 20px;">
      <el-input
        placeholder="Please input"
        v-model="roll"
        clearable>
      </el-input>
    </el-col>
    <el-col :span="3" style="margin-top: 20px;">
      <el-button type="primary" icon="el-icon-search" @click="getUserData">Search</el-button>
    </el-col>
  </el-row>
  </body>
</template>

<script>
import bar from '../assets/bar'
import axios from 'axios';
import router from '../router/index'
import url from '../../config/url.js'

export default {
  name : 'Visual',
  data(){
    return {
      roll:"",
      barData1:0,
      barData2:0,
      barData3:0,
      profileName:this.$cookies.get('user_name'),
      department:this.$cookies.get('user_dept'),
      rollNumber:this.$cookies.get('user_rollnumber'),
      year:this.$cookies.get('user_year'),
      rank:this.$cookies.get('user_rank'),
      user_id:this.$cookies.get('user_id'),
      cookie:this.$cookies.get('user_state')
    }
  },
  components: {
    bar
  },
  methods:{
    getUserData:async function () {
      let self=this
      let params={}
      params.roll=self.roll
      params.type="info"
      await axios.post(url.APP_URL+':2000/points',params).then(function (result) {
        console.log(JSON.stringify(result));
        if(result.data!=="" && result.status===200)
        {
          console.log("result"+JSON.stringify(result.data));
          console.log("self"+self.barData1+barData2+barData3)
          self.barData1=result.data[0].algorithms;
          self.barData2=result.data[0].datastructures;
          self.barData3=result.data[0].problemsolving;
          console.log("BAR"+self.barData1+barData2+barData3);
        }
      }).catch(function (err) {
        console.log(err.message);
      })
    },
  settings:function () {
    router.push('/settings')
  },
  leaderboard:function () {
    router.push('/leaderboard')
  },
  home:function () {
    router.push('/dashboard')
  },
    logout:function () {
      this.$cookies.remove("user_id");
      this.$cookies.remove('user_name');
      this.$cookies.remove('user_dept');
      this.$cookies.remove('user_year');
      this.$cookies.remove('user_rollnumber');
      this.$cookies.remove('user_points');
      router.push('/login');
    }
  }
}
</script>

