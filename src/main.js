// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './Login'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  data:{
  	currentComponent:'Login'
  },
  created(){
  	let user = JSON.parse(localStorage.getItem('user'));
  	if(user&& user.id){
  		this.currentComponent = 'App'
  	} else{
  		this.currentComponent = 'Login'
  	}
  },
  router,
  components: { App,Login },
  template: `
		<component v-bind:is="currentComponent"></component>
  `
})

window.vm = vm;



