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

    <el-col :span="18" style="" >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
             <el-breadcrumb separator="/" >
      <el-breadcrumb-item :to="{ path: '/' }" ><b>{{this.$route.params.subject}}</b></el-breadcrumb-item>

    </el-breadcrumb>
          </span>
        </div>
        <div v-for="items in topicsData"  @click="goToTopic(items.topic)" style="height: 40px;width: 100%;text-align: left;font-size: 25px;">
          <p ><span><i class="el-icon-d-arrow-right" v-model="selected" style="padding-right: 15px;"></i>
</span>{{ items.topic }}     </p>

        </div>
      </el-card>

    </el-col>
  </el-row>
  </body>
</template>


<script>
  import axios from 'axios'
  import router from '../router/index'
  import url from '../../config/url.js'
  export default {
    name:'Algorithms',
    data() {
      return {
        dob:this.$cookies.get('user_dob'),
        phone:this.$cookies.get('user_phone'),
        labelPosition: 'right',
        department:this.$cookies.get('user_dept'),
        points:this.$cookies.get('user_points'),
        rollNumber:this.$cookies.get('user_rollnumber'),
        year:this.$cookies.get('user_year'),
        rank:this.$cookies.get('user_rank'),
        topicsData: "",
        profileName:this.$cookies.get("user_name"),
        selected:""
      }
    },
    methods:{
     loadTopics:function () {
       let self=this
       axios.get(url.APP_URL+":5500/"+self.$route.params.subject).then(function (result) {
         if(result.status===200 && result.data!=="")
         {
           self.topicsData=result.data
           console.log(result.data);
         }
       }).catch(function (err) {
         console.log(err.message);
       })
     },
      goToTopic:function (url) {
        let self=this
        console.log("here"+url)
        router.push('/algorithms/'+url)
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
      home:function () {
        router.push('/dashboard')
      }
    },
    mounted:function () {
      this.loadTopics()
    }
  }
</script>
