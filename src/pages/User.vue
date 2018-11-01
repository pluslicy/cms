<template>
	<div class="user">
		<!-- 按钮区 -->
		<div class="btns">
			<el-button size='mini' @click='toAddUser'>添加</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 数据区 -->
		<div class="user_tbl">
			<ul class="user_list">
				<li v-for='u in users'>
					<div class="icons">
						<i class="fa fa-edit" @click="toUpdateUser(u)"></i>
						<i class="fa fa-close" @click="deleteUser(u.id)"></i>
					</div>
					<div class="photo">
						<img v-if='u.userface && u.userface.indexOf("http")>=0' :src="u.userface" alt="">
						<img v-else :src='"http://39.108.81.60:8888/group1/"+u.userface' alt="">
					</div>
					<div class="info"> 
						<div>用户名</div> <div>{{u.username}}</div>
					</div>
					<div class="info"> 
						<div>真实姓名</div> <div>{{u.nickname}}</div> 
					</div>
					<div class="info"> 
						<div>email</div> <div>{{u.email}}</div> 
					</div>
				</li>
			</ul>
		</div>
		<!-- 数据区结束 -->
		<!-- 模态框 -->
		<el-dialog :title="userDialog.title" :visible.sync="userDialog.visible">
			{{userDialog.form}}
		  <el-form status-icon ref="userForm" :rules='rules' :model="userDialog.form" label-position='left' size='small'>
		    <el-form-item label="用户名" label-width="100px" prop="username">
		      <el-input v-model="userDialog.form.username" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" label-width="100px" prop="password">
		      <el-input v-model="userDialog.form.password" type="password"></el-input>
		    </el-form-item>
		    <el-form-item label="真实姓名" label-width="100px" prop="nickname">
		      <el-input v-model="userDialog.form.nickname"></el-input>
		    </el-form-item>
				<el-form-item label="email" label-width="100px" prop="email">
		      <el-input v-model="userDialog.form.email" ></el-input>
		    </el-form-item>
		    <el-form-item label="头像" label-width="100px">
		      <el-upload
					  action="http://47.107.71.18:8099/manager/file/upload"
					  :limit='1'
					  :file-list="userDialog.fileList"
					  :on-remove='handleUploadRemove'
					  :on-success='handlerUploadSuccess'
					  list-type="picture">
					  <el-button size="mini" type="text">点击上传</el-button>
					</el-upload>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click='closeUserDialog'>取 消</el-button>
		    <el-button size='mini' type="primary" @click='saveOrUpdateUser'>确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 模态框结束 -->

	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				users:[],
				userDialog:{
					title:'',
					visible:false,
					form:{

					},
					fileList:[]
				},
				rules:{
					username:[{
						required: true, 
						message: '请输入用户名',
						trigger: 'blur' 
					}],
					password:[{
						required: true, 
						message: '请输入密码',
						trigger: 'blur' 
					}],
					email:[{
						required: true, 
						message: '请输入email',
						trigger: 'blur' 
					}],
					nickname:[{
						required: true, 
						message: '请输入真实姓名',
						trigger: 'blur' 
					}]
				}
			}
		},
		created(){
			this.findAllUsers();
		},
		methods:{
			handleUploadRemove(){

			},
			handlerUploadSuccess(response){
				this.userDialog.form.userface = response.data.id;
			},
			deleteUser(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
        	let url = '/manager/user/deleteUserById';
        	axios.get(url,{params:{id }})
        	.then(({data:result})=>{
        		this.$notify({
		          title: '成功',
		          message: result.message,
		          type: 'success'
		        });
		        this.findAllUsers();
        	})
        	.catch(()=>{
        		this.$notify.error({
		          title: '错误',
		          message: '删除异常'
		        });
        	});
        })
        .catch(()=>{});
			},
			saveOrUpdateUser(){
				this.$refs.userForm.validate((valid)=>{

					for(let key in this.userDialog.form){
						let val = this.userDialog.form[key]
						if(!val){
							delete this.userDialog.form[key]
						}
					}

					if(valid){
						let url = '/manager/user/saveOrUpdateUser'
						axios.post(url,this.userDialog.form)
						.then(({data:result})=>{
							if(result.status = 200){
								//1. 关闭模态框
								this.closeUserDialog();
								//2. 提示成功
								this.$notify({title: '成功', message: result.message, type: 'success'});
				        //3. 刷新
								this.findAllUsers();
							} else {
								this.$notify.error({title: '错误', message: result.message });
							}
						})
						.catch((error)=>{
							this.$notify.error({title: '错误', message: '网络异常'});
						});
					}
				})
			},
			closeUserDialog(){
				this.$refs.userForm.resetFields()
				this.userDialog.form = {};
				this.userDialog.visible = false;
			},
			toUpdateUser(u){
				this.userDialog.form = u;
				if(u.userface){
					if(u.userface.indexOf('http')>=0){
						this.userDialog.fileList = [{
							name:u.userface,
							url:u.userface
						}]
					} else {
						this.userDialog.fileList = [{
							name:u.userface,
							url:'http://39.108.81.60:8888/group1/'+u.userface
						}]
					}
				}

				

				this.userDialog.title = '修改用户';
				this.userDialog.visible = true;
			},
			toAddUser(){
				this.userDialog.title = '添加用户';
				this.userDialog.fileList = [];
				this.userDialog.visible = true;
			},
			findAllUsers(){
				let url = '/manager/user/findAllUser';
				axios.get(url).then(({data:result})=>{
					// 将查询到的数据绑定到模型中
					this.users = result.data;
				}).catch((error)=>{
					this.$notify.error({title: '错误', message: result.message });
				})
			}
		}
	}
</script>

<style>
	.btns {
		margin-bottom: .5em;
	}
	.user_list {

	}
	.user_list > li {
		box-sizing: border-box;
		width: 24.25%;
		float: left;
		margin-right:1%;
		border:1px solid #ededed;
		margin-bottom: .5em;
		height: 200px;
		padding: .5em;
		border-radius: 3px;
		position: relative;
		overflow-x:hidden;
	}
	.user_list > li:nth-child(4n){
		margin-right: 0;
	}

	.user_list > li .icons {
		position: absolute;
		right: .5em;
		top: .5em;
		display: none;
	}
	.user_list > li:hover .icons{
		display: block;
	}
	i.fa {
		margin: 0 .3em;
		cursor: pointer;;
	}
	.user_list .photo {
		width: 80px;
		height: 80px;
		margin:0 auto;
		border-radius: 50%;
		overflow: hidden;
	}
	.user_list .photo img {
		width: 100%;
	}
	.user_list .info {
	}
	.user_list .info::after {
		content: '';
		display: block;
		clear: both;
	}
	.user_list .info > div {
		float: left;
		width: 50%;
		padding: 0 2em;
		line-height: 2em;
	}
	.user_list .info > div:first-child{
		text-align: right;
	}
	.user_list .info > div:last-child{
		text-align: left;
	}
	.user {
		min-width: 800px;
		
	}
	

</style>



