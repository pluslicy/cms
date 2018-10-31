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
						<i class="fa fa-edit"></i>
						<i class="fa fa-close"></i>
					</div>
					<div class="photo">
						<img src="@/assets/tx.jpg" alt="">
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

	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				users:[]
			}
		},
		created(){
			this.findAllCategories();
		},
		methods:{
			toAddUser(){

			},
			findAllCategories(){
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



