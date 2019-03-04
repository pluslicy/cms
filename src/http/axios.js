import axios from 'axios'
import qs from 'qs'

// 全局配置
axios.defaults.headers.post['Content-Type'] 	= 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://134.175.154.93:8099';
// axios.defaults.baseURL = 'http://127.0.0.1:8099';


axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data,{arrayFormat: 'repeat' });
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	if(response.data.status == 500 && response.data.message == '尚未登录，请登录!'){
		//获取根vue实例，然后进行跳转
    window.vm.currentComponent = 'Login';
	}
  return response;
});


export default axios;