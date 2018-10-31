import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Category from '@/pages/Category'
import Article from '@/pages/Article'
import User from '@/pages/User'
import Setting from '@/pages/setting'
import SettingInfo from '@/pages/setting/Info'
import SettingAuth from '@/pages/setting/Auth'
import SettingAdv from '@/pages/setting/Adv'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      component: Test
    },{
      path: '/',
      component: HelloWorld
    },{
      path: '/category',
      component: Category
    },{
      path: '/article',
      component: Article
    },{
      path: '/user',
      component: User
    },{
      path:'/setting',
      component:Setting,
      children:[{
        path:'info',  /* /setting/info -> SettingInfo */
        component:SettingInfo
      },{
        path:'auth',  
        component:SettingAuth
      },{
        path:'adv',  
        component:SettingAdv
      }]
    }
  ]
})









