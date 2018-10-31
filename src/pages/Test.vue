<template>
	<div class="test">
		<el-upload
		  class="upload-demo"
		  :action="url"
		  :file-list="fileList"
		  list-type="picture">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				fileList:[{name:"",url:""}],
				url:"http://120.78.164.247:8099/manager/file/upload"
			}
		},
		methods:{

		}
	}
</script>