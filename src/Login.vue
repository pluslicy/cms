<template>
	<div class="login">
		<h2>登录页面</h2>
		{{form}}
		 <el-form :model="form" label-position='left' size='small'>
		    <el-form-item label="用户名" label-width="100px">
		      <el-input v-model="form.username" ></el-input>
		    </el-form-item>
		    <el-form-item label="密码" label-width="100px">
		      <el-input v-model="form.password" type="password"></el-input>
		    </el-form-item>
		  </el-form>

			<el-button @click='login'>登录</el-button>

	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				form:{

				}
			}
		},
		methods:{
			login(){
				axios.post('/login',this.form)
				.then((result)=>{
					console.log('success',result);
					this.$root.currentComponent = 'App';
				})
				.catch((error)=>{
					console.log('error',error);
				});

				//this.$root.currentComponent = 'App';
			}
		}
	}
</script>

<style>
	.login {
		width: 400px;
		margin: 0 auto;
	}
</style>