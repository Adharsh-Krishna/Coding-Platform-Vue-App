<template>
  <body>
  <el-dialog
    title="Upload Photo"
    :visible.sync="uploadDialog"
    width="40%"
    :before-close="handleClose">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
    <el-button @click="uploadDialog = false">Cancel</el-button>
    <el-button type="primary" @click="uploadPhoto">Confirm</el-button>
  </span>
  </el-dialog>
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
      <el-menu-item index="2-1" @click="leaderboard">Leader Board</el-menu-item>
      <el-menu-item index="2-2" @click="logout">Logout</el-menu-item>

    </el-submenu>
  </el-menu>
  <el-row>
    <el-col :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../assets/logo.png" class="image">
        <div style="padding: 14px;">
          <span @click="uploadDialog = true">Change Picture</span>
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
    <el-col :span="18" style="margin-top: 30px;">
      <h2 align="left" style="margin-left: 20px"><u>Credentials</u><span style="float:right"><el-button type="primary" icon="el-icon-edit"  @click="updateCred"></el-button>
</span></h2>
      <hr>
      <el-form  label-width="100px" >
        <el-form-item label="Password :">
          <el-input v-model="password" ></el-input>
        </el-form-item>
      </el-form>
      <hr>
      <h2 align="left" style="margin-left: 20px"><u>Information</u><span style="float:right"><el-button type="primary" icon="el-icon-edit" @click="updateInfo"></el-button>
</span></h2>
      <hr>
      <el-form  label-width="100px" >
        <el-form-item label="Name :">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="D.O.B :">
          <el-input v-model="dob" ></el-input>
        </el-form-item>
        <el-form-item label="Phone :">
          <el-input v-model="phone" ></el-input>
        </el-form-item>
      </el-form>
      <hr>
    </el-col>
    <!--<el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>-->

    <el-dialog
      title="Success"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>Your Information has been updated successfully.</span>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </el-row>
  </body>
</template>


<script>
  import store from '../../store/store'
  import axios from 'axios';
  import router from '../router/index'
  export default{
    name:'Settings',
    data(){
      return {
        uploadDialog:false,
        name:this.$cookies.get("user_name"),
        password:"",
        dob:this.$cookies.get('user_dob'),
        phone:this.$cookies.get('user_phone'),
        labelPosition: 'right',
        profileName:this.$cookies.get("user_name"),
        department:this.$cookies.get('user_dept'),
        points:this.$cookies.get('user_points'),
        rollNumber:this.$cookies.get('user_rollnumber'),
        year:this.$cookies.get('user_year'),
        rank:this.$cookies.get('user_rank'),
        user_id:store.state.user_id,
        dialogVisible:false

      }
    },
    methods:{
      getData:function () {
        console.log("something");
        let self=this
        let params={}
        params.id=self.$cookies.get('user_id')
        params.type="info"
        axios.post(url.APP_URL+":2000/get",params).then(function (result) {
          console.log(result.data);
          if(result.data!=="" && result.status===200)
          {
            console.log(result.data[0]);
            self.$cookies.set("user_phone",result.data[0].Phone)
            self.$cookies.set("user_dob",result.data[0].Dob);

          }
        }).catch(function (err) {
          console.log(err.message);
        })
      },
    updateCred:function () {
      let self=this
      let params={}
      params.id=this.$cookies.get("user_id");
      params.type='cred'
      params.data={password:this.password}
      axios.post(url.APP_URL+":2000/update",params).then(function (result) {
        if(result.data!=="" && result.status===200)
        {
          console.log(result.data);
          self.getData();
          self.password=""
          self.dialogVisible=true;
        }
      }).catch(function (err) {
        console.log(err.message);
      })
    },
          updateInfo:function () {
            let self=this
            let params={}
            params.id=this.$cookies.get("user_id");
            params.type='info'
            params.data={Name:this.name,Dob:this.dob,Phone:this.phone}
            axios.post(url.APP_URL+":2000/update",params).then(function (result) {
              if(result.data!=="" && result.status===200)
              {
                console.log(result.data);
                self.getData();
                self.password=""
                self.dialogVisible=true;

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
      leaderboard:function () {
        router.push('/leaderboard');
      },
      home:function () {
        router.push('/dashboard')
      },
      uploadPhoto:function () {
        this.uploadDialog=false
        let self=this

      }
    },
    created:function () {
      this.getData()
    }
  }
</script>
