<template>
  <div class="app">
    <!-- 头 -->
    <div class="header">
      <div class="title">
        <i class="fa fa-tv"></i> &nbsp;&nbsp;看点咨询精选</div>
    </div>
    <!-- 体 -->
    <div class="center">
      <!-- 左侧导航 -->
      <div class="left-nav">
        <ul>
          <li :class="{current:currentRoute=='/'}">
            <i class="fa fa-tv"></i>
            <router-link to='/'>首页</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
          <li :class="{current:currentRoute=='/category'}">
            <i class="fa fa-ticket"></i>
            <router-link to='/category'>栏目管理</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
          <li :class="{current:currentRoute=='/article'}">
            <i class="fa fa-upload"></i>
            <router-link to='/article'>文章管理</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
          <li :class="{current:currentRoute=='/user'}">
            <i class="fa fa-tree"></i>
            <router-link to='/user'>用户管理</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
          <li :class="{current:currentRoute.indexOf('/setting')>=0}">
            <i class="fa fa-cog"></i>
            <router-link to='/setting'>系统设置</router-link>
            <i class="fa fa-angle-right"></i>
          </li>
        </ul>

      </div>
      <!-- 右侧内容区 -->
      <div class="content">
        <div class="wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        currentRoute:'/'
      }
    },
    watch:{
      '$route':function(to,from){
        this.currentRoute = to.path;
      }
    }
  }
</script>
<style>
  html {
    font: normal normal 12px '微软雅黑','Microsoft YaHei';
    color: #666
  }
  body , ul ,ol,dl ,p, h1,h2,h3 {
    margin: 0;
    padding: 0
  }
  ul , ol {
    list-style: none;
  }
  a {
    color: #666;
    text-decoration: none;
  }
  div {
    box-sizing: border-box;
  }
  .el-dialog__body {
    padding: 2em 1em 0 1em;
  }

  .header {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    background-color: teal;   
    padding: 0 1em; 
  }
  .header .title {
    color: #ffffff;
    line-height: 60px;
    font-size: 18px;
  }

  .center {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;

  }
  .center > .left-nav {
    width: 180px;
    height: 100%;
    float: left;
  }
  .center > .left-nav > ul {

  }
  .center > .left-nav > ul > li{
    line-height: 2.6em;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
  }
  .center > .left-nav > ul > li i.fa {
    position: absolute;
    top: 50%;
    margin-top: -.5em;
  }
  .center > .left-nav > ul > li i.fa:last-child {
    right: 1em;
  }
  .center > .left-nav > ul > li i.fa:first-child {
    left: 3em;
  }
  .center > .left-nav > ul > li.current {
    background-color: #f0f0f0;
  }
  .center > .content {
    margin-left: 180px;
    height: 100%;
    background-color: #f0f0f0;
    padding: 1em 1em 0 1em;
    overflow-y: auto;
  }
  .center > .content > .wrapper {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    padding: .5em;
  }










</style>