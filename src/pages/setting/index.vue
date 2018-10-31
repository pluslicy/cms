<template>
	<div class="setting">
		<ul class="setting-nav">
			<li :class="{current:currentRoute=='/setting/info'}">
				<router-link to='/setting/info'>基础设置</router-link>
			</li>
			<li :class="{current:currentRoute=='/setting/auth'}">
				<router-link to='/setting/auth'>权限设置</router-link>
			</li>
			<li :class="{current:currentRoute=='/setting/adv'}">
				<router-link to='/setting/adv'>广告设置</router-link>
			</li>
		</ul>

		<div class="setting-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				currentRoute:'/setting/info'
			}
		},
		watch:{
			'$route':function(to,from){
				this.currentRoute = to.path;
			}
		},
		mounted(){
			this.$router.push(this.currentRoute);
		}
	}
</script>
<style>
	.setting-nav {
		border-bottom: 1px solid #f0f0f0;
		height: 30px;
	}
	
	.setting-nav > li {
		line-height: 30px;
		float: left;
		width: 120px;
		text-align: center;
	}
	.setting-nav > li.current  {
		border-bottom: 1px solid teal;
	}
	.setting-content {
		padding: .5em 0;
	}
</style>