<!-- 评论管理 -->
<template>
	<div class="comment">
		<!-- 按钮区 -->
		<div class="btns">
		  <el-input
		  	style="width:130px"
		  	size="small"
			  placeholder="请输入关键字"
			  v-model="params.keywords"
			  clearable>
			</el-input>

			<el-button size='small'>批量审核</el-button>
			<el-button size='small'>批量删除</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 数据区 -->
		<!-- {{multipleSelection}} -->
		<div class="comment_tbl" v-loading='loading'>
			<el-table :border='true' size='small' :data="comments" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" fixed></el-table-column>
	      <el-table-column prop="content" label="评论内容"></el-table-column>
	      <el-table-column prop="status" label="状态" width="100" align='center'> </el-table-column>
	       <el-table-column prop="commenttime" label="评论时间" width="180" align='center'></el-table-column>
	      <el-table-column label="操作" width='80' fixed="right" align='center'>
	      	<template slot-scope='{row}'>
	      		<i class="fa fa-trash" @click='deleteComment(row.id)'></i>
	      		<i class="fa fa-pencil" @click='toUpdateComment(row)'></i>
	      	</template>
	      </el-table-column>
	    </el-table>
		</div>
		<!-- 数据区结束 -->
		<!-- 分页 -->
		<div class="page"  v-if="total >= params.pageSize">
			<el-pagination
		    layout="prev, pager, next"
		    @current-change='handleCurrentChange'
		    :page-size='params.pageSize'
		    :total="total">
		  </el-pagination>
		</div>
		<!-- 分页结束 -->
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				loading:false,
				multipleSelection:[],
				total:0,
				comments:[],
				params:{
					page:0,
					pageSize:10,
				},
				commentDialog:{
					title:'',
					visible:false,
					form:{
						liststyle:'style-one',
						fileIds:[]
					},
					fileList:[]
				},
				rules:{
					title:[{
						required: true, 
						message: '请输入标题',
						trigger: 'blur' 
					}],
					categoryId:[{
						required: true, 
						message: '请选择栏目',
						trigger: 'change' 
					}]
				}
			}
		},
		watch:{
			// 只要params中的任意参数发生改变，就要刷新页面
			params:{
				handler:function(){
					this.findAllComments();
				},
				deep:true
			}
		},
		created(){
			this.findAllCategories();
			this.findAllComments();
		},
		methods:{
			

			
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			
			
			// 查询所有栏目
			findAllCategories(){
				let url = '/manager/category/findAllCategory';
				axios.get(url).then(({data:result})=>{
					this.categories = result.data;
				}).catch((error)=>{
					this.$notify.error({
						title:'错误',
						message:'网络异常'
					})
				})
			},
			handleCurrentChange(page){
				this.params.page = page-1;
			},
			// 查询所有文章
			findAllComments(){
				this.loading = true;
				let url = '/manager/comment/findComment';
				axios.get(url,{
					params:this.params
				})
				.then(({data:result})=>{
					// 将查询到的数据绑定到模型中
					console.log(result);
					this.total = result.data.total;
					this.comments = result.data.list;
				}).catch((error)=>{
					this.$notify.error({
						title:'错误',
						message:'网络异常'
					})
				}).finally(()=>{
					this.loading = false;
				});
			},
			deleteComment(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
        	let url = '/manager/comment/deleteCommentById';
        	axios.get(url,{params:{id }})
        	.then(({data:result})=>{
        		this.$notify({
		          title: '成功',
		          message: result.message,
		          type: 'success'
		        });
		        this.findAllComments();
        	})
        	.catch(()=>{
        		this.$notify.error({
		          title: '错误',
		          message: '删除异常'
		        });
        	});
        })
        .catch(()=>{});
			}
		}
	}
</script>

<style scoped>
	.list_style {

	}
	.list_style > div {
		width: 200px;
		height: 80px;
		overflow-y: hidden;
		border:1px solid #ededed;
		padding: .5em;
		border-radius: 5px;
	}
	.list_style > div.current{
		border-color: #419fff;
	}
	.list_style img {
		width: 100%;
	}
	.list_style > div.list_one {
		float: left;
	}
	.list_style > div.list_two {
		margin-left: 220px;
	}
</style>


