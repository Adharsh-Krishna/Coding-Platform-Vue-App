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
      <el-menu-item index="2-2" @click="logout">Logout</el-menu-item>

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
          <i class="el-icon-arrow-right"></i>
          <span>{{profileName}}</span>
        </el-menu-item>
        <el-menu-item index="2"  align="left">
          <i class="el-icon-arrow-right"></i>
          <span>{{department}}</span>
        </el-menu-item>
        <el-menu-item index="3"  align="left">
          <i class="el-icon-arrow-right"></i>
          <span>{{rollNumber}}</span>
        </el-menu-item>
        <el-menu-item index="4"  align="left">
          <i class="el-icon-arrow-right"></i>
          <span>{{year}}</span>
        </el-menu-item>
        <el-menu-item index="5"  align="left">
          <i class="el-icon-arrow-right"></i>
          <span>{{rank}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4">
      <el-table
        :data="nameData"
        style="width: 100%"
        height="500px" align="center">
        <el-table-column
          prop="Name"
          label="Name"
          width="209">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="14">
      <el-table
        :data="boardData"
        style="width: 100%"
      height="500px"
      align="center">

        <el-table-column
          prop="datastructures"
          label="Data Structures"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="algorithms"
          label="Algorithms"
          width="150">
        </el-table-column>

        <el-table-column
          prop="problemsolving"
          label="Problem Solving">
        </el-table-column>

      </el-table>
    </el-col>
  </el-row>
  </body>
</template>

<script>
  import axios from 'axios';
  import router from '../router/index'
  import store from '../../store/store'
  import url from '../../config/url.js'
  export default {
    name: 'Dashboard',
    data() {
      return {
        boardData:"",
        nameData:"",
        profileName: this.$cookies.get('user_name'),
        department: this.$cookies.get('user_dept'),
        points: this.$cookies.get('user_points'),
        rollNumber: this.$cookies.get('user_rollnumber'),
        year: this.$cookies.get('user_year'),
        rank: this.$cookies.get('user_rank'),
        user_id: this.$cookies.get('user_id'),
        cookie: this.$cookies.get('user_state')
      }
    },
    methods:{
    loadBoard:function () {
      let self=this
      axios.post(url.APP_URL+":2000/get",{id:"all",type:"info"}).then(function (result1) {
        if(result1){
          self.nameData=result1.data;
        }
      }).catch(function (err) {
        console.log(err.message);
      })
      for(let i=0;i<this.boardData.length;i++){
        this.boardData[i].name=this.nameData.Name;
      }
      axios.get(url.APP_URL+':2000/points').then(function (result) {
        if(result){
          self.boardData=result.data;
        }
      }).catch(function (err) {
        console.log(err.message);
      });
      // this.boardData.forEach(function (element) {
      //   element.name=this.nameData.Name;
      // })

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
    },
      getName:function (id) {
        let params={}
        params.user_id=id
        params.type="info"
        axios.get(url.APP_URL+':2000/get',params).then(function (result) {
          if(result){
            return result;
          }
        })
      }
  },
    mounted:function () {
      this.loadBoard()
    }

  }
</script>
