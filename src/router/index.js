import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Settings from '../components/Settings'
import  Otp from '../components/Otp'
import Algorithm from '../components/Algorithms'
import LeaderBoard from '../components/LeaderBoard'
import AlgorithmTopics from '../components/AlgorithmTopics'
import Visual from '../components/Visual'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:subject/:topic/:question',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path:'/visual',
      name:'Visual',
      component: Visual
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/leaderboard',
      name:'LeaderBoard',
      component:LeaderBoard
    },
    {
      path:'/dashboard',
      name:'Dashboard',
      component: Dashboard
    },
    {
      path:'/settings',
      name:'Settings',
      component: Settings
    },
    {
      path:'/resetpassword',
      name:'Otp',
      component: Otp
    },
    {
      path:'/:subject',
      name:'Algorithm',
      component: Algorithm
    },
    {
      path:'/:subject/:topic',
      name:'AlgorithmTopics',
      component: AlgorithmTopics
    }
  ]
})

