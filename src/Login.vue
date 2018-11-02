<template>
	<div class="login">
		<h2 class="title"> <i class="fa fa-tv"></i> 看点资讯精选后台系统</h2>
		<el-form ref='userForm' :rules="rules" :model="form" label-position='left' size='small'>
		    <el-form-item prop='username' label="用户名" label-width="80px">
		      <el-input v-model="form.username" ></el-input>
		    </el-form-item>
		    <el-form-item prop='password' label="密码" label-width="80px">
		      <el-input v-model="form.password" type="password"></el-input>
		    </el-form-item>
		</el-form>
		<div class="btns">
			<el-button @click='login' size="small">登录</el-button>
		</div>
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				form:{

				},
				rules:{
					username:[{
						required:true,
						message:'请输入用户名',
						trigger:'blur'
					}],
					password:[{
						required:true,
						message:'请输入密码',
						trigger:'blur'
					}]
				}
			}
		},
		methods:{
			login(){
				//在登录前校验
				this.$refs.userForm.validate((valid)=>{
					if(valid){
						axios.post('/login',this.form)
						.then(({data:result})=>{
							console.log(result);
							if(result.status == 200 && result.message=='登录成功'){
								//1. 跳转到后台管理页面
								window.vm.currentComponent = 'App';
								//2. 将登录成功的用户信息保存到浏览器中
								localStorage.setItem('user',JSON.stringify(result.data));
							}
						})
						.catch((error)=>{
							console.log('error',error);
						});
					}
				});


				

				//this.$root.currentComponent = 'App';
			}
		}
	}
</script>

<style>
	input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
	}
	html,body {
		height: 100%;
		background-color: #f9f9f9;
		margin: 0;
		padding: 0;
	}
	.login {
		position: absolute;
		width: 400px;
		top: 120px;
		left: 50%;
		margin-left: -200px;
		background-color: #fff;
		padding: 30px 20px;
		border-radius: 5px;
		border:1px solid #d8dee2;
	}
	.login .title {
		/*line-height: 3em*/;
		margin-bottom: 20px;
		text-align: center;
	}
	.login .btns {
		text-align: right;
	}
</style>