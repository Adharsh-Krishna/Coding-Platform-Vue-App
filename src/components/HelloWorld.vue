<template>

  <body style="margin-top: 0px;">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="home"><b>Coding Platform</b></el-menu-item>
      <el-menu-item index="2"><b>Problem Solving</b></el-menu-item>
      <el-menu-item index="3"><b>Algorithms</b></el-menu-item>
      <el-menu-item index="4"><b>Data Structures</b></el-menu-item>

      <el-submenu index="2" style="float:right">
        <template slot="title">{{profileName}}</template>
        <el-menu-item index="2-1" @click="settings">Settings</el-menu-item>
        <el-menu-item index="2-2" @click="logout">Logout</el-menu-item>

      </el-submenu>
    </el-menu>
    <p>
    <el-breadcrumb separator="/" >
      <el-breadcrumb-item @click="subject"><b>{{this.$route.params.subject}}</b></el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.params.topic}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.params.question}}</el-breadcrumb-item>
      <!--<el-breadcrumb-item>{{this.$route.params.topic}}</el-breadcrumb-item>-->

    </el-breadcrumb></p>

    <h3 ><u>Max Score</u> :  {{total_points}}</h3>
    <h3 ><u>Current Score</u> :  {{current_points}}</h3>


    <h2 style="float: left" ><b>{{heading}}</b></h2>
   <el-row>
     <el-col :span="24"><div class="grid-content " style="background-color: lightgrey;text-align: justify;
     padding-left:30px;padding-top:10px;padding-bottom: 10px;padding-right: 30px;font-size:15px;" >{{question}}</div></el-col>
   </el-row>

   <el-row>
     <el-col :span="12">
       <el-card class="box-card">
         <div slot="header" class="clearfix">
           <span>Constraints</span>
         </div>
         <div  class="text item">
           {{constraints}}
         </div>
       </el-card>
     </el-col>
     <el-col :span="12">
       <el-card class="box-card">
         <div slot="header" class="clearfix">
           <span>Sample Input/Output</span>
         </div>
         <div  class="text item">
          {{sample}}
         </div>
       </el-card>
     </el-col>
   </el-row>


    <div style="float:right">
    <el-select v-model="value" placeholder="Select" style="padding-bottom: 10px;">
      <el-option style=""
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </div>
    <p>{{saving}}</p>
    <editor v-model="content" @init="editorInit" v-bind:lang="value"  theme="dracula"  style="width: 100%;position: center;height: 500px;"></editor>
   <br>
   <el-row >
     <el-col :span="24" style="background-color: white;padding-top: 5px;border-bottom: aqua;border-bottom-width: 2px;"><div class="grid-content " style=""><b><i>Test Cases</i></b></div></el-col>

     <el-col :span="24" style="background-color: white;padding-top: 5px;"><div class="grid-content " >
       <el-row>
         <!--<el-col :span="12" ><div class="grid-content " >{{tests}}</div></el-col>-->
         <!--<el-col :span="12" ><div class="grid-content " ></div>{{tests}}</el-col>-->

         <el-col :span="24">
           <div v-for="items in tests"  style="height: 40px;width: 100%;text-align: left;font-size: 25px;">

           <p ><span>TEST CASE ({{items.number}})   </span>{{ items.output }}  <span ><i class="el-icon-success" ></i></span></p>
           </div>
         </el-col>
       </el-row>
     </div></el-col>

   </el-row>
    <el-row>
      <el-col :span="24" v-if="errorFlag"  style="width: 100%;height: 150px;background-color: aquamarine">{{err_message}}</el-col>
    </el-row>
  <!-- <div>
     <el-checkbox v-model="checked" style="float: left">Custom Input</el-checkbox>
     <br>

   </div>-->

  <!-- <el-input
     type="textarea"
     autosize
     placeholder="Please input"
     v-model="textarea2" v-if="checked">
   </el-input>-->
   <br>

   <el-button type="primary" @click="codeExecutor" :loading="button_load" style="float:right">{{status}}</el-button>

  </body>
</template>

<script>
  import axios from 'axios';
  import store from '../../store/store'
  import router from '../router/index'
  import url from '../../config/url.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      total_points:"",
      current_points:0,
      saving:"",
      status:"Submit",
      tests:"",
      sample:"",
      errorFlag:false,
      profileName:this.$cookies.get("user_name"),
      language:"",
      heading:"",
      question:"",
      input:"",
      output:"",
      constraints:"",
      msg: "hello"+store.state.isLoggedIn+store.state.user_id,
      content:"",
      options: [{
        value: 'c',
        label: 'C'
      }, {
        value: 'java',
        label: 'JAVA'
      }, {
        value: 'py',
        label: 'PYTHON'
      }],
      value: 'java',
      activeIndex: '1',
      activeIndex2: '2',
      textarea: '',
      button_load:false,
      checked:false,
      err_message:"err",
      prob_id:this.$cookies.get("prob_id"),
      counts:"",
      code_file:""
    }
  },
  components: {
    editor:require('vue2-ace-editor')
  },
  methods: {
    editorInit: function () {
      require('vue2-ace-editor/node_modules/brace/mode/c_cpp')
      require('vue2-ace-editor/node_modules/brace/mode/python')
      require('vue2-ace-editor/node_modules/brace/mode/java')
      require('vue2-ace-editor/node_modules/brace/theme/dracula')

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    buttonLoadChange:function(){
      this.button_load=!this.button_load;
    },
    codeExecutor:async function(){
      if(this.value==='c'){
        console.log("c here");
        this.executeCodeForC()
      }
      else if(this.value==='py'){
        this.executeCodeForPython()
      }
      /*else if (this.options.includes('JAVA')){
        this.executeCodeForJava();
      }
      else{
        this.executeCodeForPython();*/

    },executeCodeForPython:async function(){
      let params={}
      params.user_id=this.$cookies.get("user_id");
      params.prob_id=4/*this.$cookies.get("prob_id")*/;
      params.filename=this.$cookies.get("filename");
      params.program_type='py'
      let self=this
      if(this.status==="Submit"){
        self.errorFlag=false;
        self.err_message="";
        this.button_load=!this.button_load;
        this.status="Running"
        await axios.get(url.APP_URL+":3000/test/"+params.prob_id).then(function (result) {
          if(result.status===200){
            self.counts=result.data
          }
        }).catch(function () {

        });
        params.counts=self.counts
        await axios.post(url.APP_URL+":7500/gettest",params).then(async function (result) {
          if(result.status===200 && result.data.type==="error"){
            throw new Error(result.data.message)
          }
          else{
            params.problem_id=self.$cookies.get("prob_id");
            self.button_load=!self.button_load;
            params.counts=self.counts;
            await axios.post(url.APP_URL+":7500/",params).then(async function (result) {
              if(result.status===200 /*&& result.data.type==="output"*/)
              {

                self.tests=result.data
                self.button_load=!self.button_load;
                self.status="Submit"
                // this.updatePoints()
                params.is_attended="true";
                let each_point=parseInt(self.total_points)/parseInt(self.counts);
                console.log("each:"+each_point);

                console.log("each:tot"+self.total_points);

                let p=0;
                for(let i=0;i<self.counts;i++){
                  console.log(self.tests[i]);
                  if(self.tests[i].output===true){
                    p=p+each_point;
                  }
                }
                console.log("each:p"+p);
                self.current_points=p;
                params.point_scored=p;
                if(p===parseInt(self.total_points)){
                  params.is_solved="true"
                }else{
                  params.is_solved="false"
                }
                await axios.post(url.APP_URL+":2000/postpoints",params).then(function (data) {
                  if(data){
                    self.current_points=p;
                  }
                }).catch(function (err) {
                  console.log("updation error"+err.message);
                })
                console.log(result.data);
              }
              else if(result.data.type="error" && result.status===200)
              {
                self.user_output=""
                self.actual_output=""
                self.err_message=result.data.message
                self.button_load=!self.button_load;
                self.status="Submit"
                self.errorFlag=true
                console.log(result.data);
              }
              else {

              }
            }).catch(function (err) {
              console.log(err.message);
            })
            self.button_load=!self.button_load
            self.status="Submit"
          }

        }).catch(function (err) {
          self.tests=""
          self.button_load=!self.button_load
          self.status="Submit"
          self.errorFlag=true;
          self.err_message=err.message;
          console.log("error : "+err.message);
        })
      }

    },
    executeCodeForC:async function () {
      let params={}
      params.user_id=this.$cookies.get("user_id");
      params.prob_id=this.$cookies.get("prob_id");
      params.filename=this.$cookies.get("filename");
      params.program_type='c'
      let self=this
      if(this.status==="Submit"){
        self.errorFlag=false;
        self.err_message="";
        this.button_load=!this.button_load;
        this.status="Compiling"
        // self.errorFlag=false
        // params.type=this.value
        // params.code=this.content
        // params.user_id=this.$cookies.get("user_id");

        await axios.get(url.APP_URL+":3000/test/"+params.prob_id).then(function (result) {
          if(result.status===200){
            self.counts=result.data
          }
        }).catch(function () {

        });
        params.counts=self.counts
        await axios.post(url.APP_URL+":7500/gettest",params).then(function (result) {
          if(result.status===200 && result.data.type==="error"){
            throw new Error(result.data.message)
          }
          else{
            self.button_load=!self.button_load
            self.status="Run"
          }

        }).catch(function (err) {
          self.tests=""
          self.button_load=!self.button_load
          self.status="Submit"
          self.errorFlag=true;
          self.err_message=err.message;
          console.log("error : "+err.message);
        })
      }
      else if(this.status==="Run"){
        params.problem_id=this.$cookies.get("prob_id");
        self.button_load=!self.button_load;
        params.counts=self.counts;
        await axios.post(url.APP_URL+":7500/",params).then(async function (result) {
          if(result.status===200 /*&& result.data.type==="output"*/)
          {
            self.tests=result.data
            self.button_load=!self.button_load;
            self.status="Submit"
            // this.updatePoints()
            params.is_attended="true";
            let each_point=parseInt(self.total_points)/parseInt(self.counts);
            console.log("each:"+each_point);

            console.log("each:tot"+self.total_points);

            let p=0;
            for(let i=0;i<self.counts;i++){
              console.log(self.tests[i]);
              if(self.tests[i].output===true){
                p=p+each_point;
              }
            }
            console.log("each:p"+p);
            self.current_points=p;
            params.point_scored=p;
            if(p===parseInt(self.total_points)){
              params.is_solved="true"
            }else{
              params.is_solved="false"
            }
            await axios.post(url.APP_URL+":2000/postpoints",params).then(function (data) {
            if(data){
              self.current_points=p;
            }
          }).catch(function (err) {
            console.log("updation error"+err.message);
          })
            console.log(result.data);
          }
          else if(result.data.type="error" && result.status===200)
          {
            self.user_output=""
            self.actual_output=""
            self.err_message=result.data.message
            self.button_load=!self.button_load;
            self.status="Submit"
            self.errorFlag=true
            console.log(result.data);
          }
          else {

          }
        }).catch(function (err) {
          console.log(err.message);
        })
      }

    }/*,
    updatePoints:async function(){
        let self=this;
        let params={}
        params.user_id=this.$cookies.get("user_id");
        params.problem_id=this.$cookies.get("prob_id");
        params.is_attempted="true";
        let each_point=parseInt(self.total_points)/parseInt(self.counts);
        let p=0;
        for(let i=0;i<self.counts;i++){
          if(self.tests[i].output==="true"){
            p=p+each_point;
          }
        }
        params.points_scored=p;
        if(p===self.total_points){
          params.is_solved="true"
        }else{
          params.is_solved="false"
        }
        await axios.post(url.APP_URL+":2000/postpoints",params).then(function (data) {
          if(data){
              self.current_points=p;
          }
        }).catch(function (err) {
          console.log("updation error"+err.message);
        })

    }*/,
    loadQuestion:async function(){
      let self=this
      await axios.get(url.APP_URL+":5500/"+self.$route.params.subject+"/"+
        self.$route.params.topic+"/"+self.$route.params.question).then(function (result) {
        if(result.status===200)
        {
          self.heading=result.data[0].problem_name
          self.question=result.data[0].problem_description
          self.sample=result.data[0].sample_input+result.data[0].sample_output
          self.constraints=result.data[0].constraints
          self.prob_id=result.data[0]._id
          self.$cookies.set("prob_id",self.prob_id)
          self.total_points=result.data[0].points
          console.log(self)
        }
      }).catch(function (err) {
        console.log(err.message);
      })

    },
    loadUserInfo:async function(){
      let self=this;
      let params={};
      params.user_id=this.$cookies.get("user_id");
      params.problem_id=this.$cookies.get("prob_id");
      await axios.get(url.APP_URL+":2000/getpoint/"+params.problem_id+"/"+params.user_id).then(function (result) {
        if(result.status===200){
          console.log("result"+result.data);
          self.current_points=result.data.point_scored
        }
      }).catch(function (err) {
        console.log("nooooo"+err.message);
      });
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
    home:function () {
      router.push('/dashboard')
    },
    subject:function () {
      console.log("algo...")
      router.push('/'+this.$route.params.subject);
    }
  },
  mounted:function () {
    this.loadQuestion()
    this.loadUserInfo()
  },
  watch:{
    value:async function(){
      let self=this
      let params={}
      params.user_id=this.$cookies.get("user_id");
      params.problem_id=this.$cookies.get("prob_id");
      params.type=this.value
      axios.post(url.APP_URL+":7500/get",params).then(function (result) {
        self.content=result.data.code;
        self.code_file=result.data.info._id
      }).catch(function (err) {
        console.log(err.message);
      })
    },
    content:async function () {
      let self=this
      this.saving="saving..."
      let params={}
      params.type=this.value
      params.code=this.content
      params.user_id=this.$cookies.get("user_id");
      params.prob_id=this.$cookies.get("prob_id");
      params.code_id=this.code_file
      await axios.post(url.APP_URL+":7500/save",params).then(function (result) {
       if(result.status===200 && result.data.filename!==undefined)
       {
         self.saving="saved."
         self.$cookies.set("filename",result.data.filename);
         console.log("saving...")
       }
      }).catch(function (err) {
        console.log(err.message);
      })
    }
  }
}

</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
