<template>
  <div class="mine">
    <div class="title">
      <button class="icon" @click="goBack">&#xe60f;</button>
      <div>个人中心</div>
    </div>
    <div class="person" v-if="isLogin === false">
      <div
        class="login"
        @click="handleLogin"
      >登录<span>|</span></div>
      <div
        class="register"
        @click="handleRegister"
      >注册</div>
    </div>
    <div class="hasperson" v-if="isLogin === true">
      <div class="name">
        <span class="icon">&#xe7b2;</span>
        <span class="myname">Hi~{{username}}</span>
      </div>
      <div
        class="logout"
        @click="dropOut"
      >退出</div>
    </div>
    <div class="order">
      <span class="me">我的订单</span>
      <span class="all">全部订单</span>
    </div>
    <div class="userItem">
      <dl>
        <dt class="icon">&#xe60a;</dt>
        <dd>待付款</dd>
      </dl>
      <dl>
        <dt class="icon">&#xe62f;</dt>
        <dd>待成团</dd>
      </dl>
      <dl>
        <dt class="icon">&#xe820;</dt>
        <dd>待收货</dd>
      </dl>
      <dl>
        <dt class="icon">&#xe631;</dt>
        <dd>售后/退款</dd>
      </dl>
    </div>
    <div class="list">
      <ul>
        <li>我的优惠券</li>
        <li>我的收藏</li>
        <li>我的拼团</li>
        <li>我的免单券<span>0张</span></li>
        <li>借钱<span>新用户免费领1000元</span></li>
        <li>客服中心</li>
        <li>关于卷皮</li>
      </ul>
    </div>
    <div class="footer">
      <div @click="toHome">返回首页</div>
      <div>客户端</div>
      <div>电脑版</div>
    </div>
    <div class="copyright">copyright © 武汉奇米网络科技有限公司</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  Toast,
  MessageBox
} from 'mint-ui'
export default {
  name: 'mine',
  data () {
    return {
      username: '',
      isLogin: false
    }
  },
  methods: {
    handleLogin () {
      this.$router.push('/login')
    },
    handleRegister () {
      this.$router.push('/register')
    },
    goBack () {
      this.$router.back()
    },
    toHome () {
      this.$router.push('/home')
    },
    dropOut () {
      MessageBox.confirm('确定退出吗?').then(action => {
        this.logout()
        Toast('退出成功！')
        this.$router.push('/home')
      }).catch(() => {
      })
    },
    ...mapMutations(['hideTabbar', 'logout'])
  },
  mounted () {
    this.hideTabbar()
    const userInfo = JSON.parse(window.localStorage.getItem('user-info')) || {}
    this.username = userInfo.username ? userInfo.username : ''
    this.isLogin = userInfo.isLogin ? userInfo.isLogin : false
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 931782 */
  src: url('//at.alicdn.com/t/font_931782_kdv0loa309m.eot');
  src: url('//at.alicdn.com/t/font_931782_kdv0loa309m.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_931782_kdv0loa309m.woff') format('woff'),
  url('//at.alicdn.com/t/font_931782_kdv0loa309m.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_931782_kdv0loa309m.svg#iconfont') format('svg');
}
.mine{
  .title {
    font-size: 20px;
    color:#fff;
    background: none;
    display: flex;
    height: 40px;
    background: rgba(218, 59, 1, .8);
    .icon{
      font-family: 'iconfont';
      font-size: 30px;
      width: 50px;
      border: none;
      font-size: 20px;
      font-weight: bold;
      background: none;
      color:#fff;
      float: left;
    }
    div{
      flex: 1;
      text-align: center;
      line-height: 40px;
      margin-left: -10%;
    }
  }
  .person{
    height: 110px;
    background: rgba(218, 59, 1, .8);
    color: #fff;
    font-size: 20px;
    user-select: none;
    .login{
      float: left;
      width: 22%;
      margin-left: 28%;
      line-height: 110px;
      cursor: pointer;
      span{
        float: right;
      }
    }
    .register{
      float: left;
      margin-left: 11%;
      width: 39%;
      line-height: 110px;
      cursor: pointer;
    }
  }
  .hasperson{
    height: 110px;
    font-size: 20px;
    line-height: 110px;
    position: relative;
    color: #666;
    .name{
      height: 100%;
      padding-left: 9%;
      .icon{
        font-family: 'iconfont';
        font-size: 50px;
        padding-right: 10px;
        color: #666;
      }
    }
    .logout{
      position: absolute;
      right: 10px;
      top: -68%;
      font-size: 12px;
      color: #fff;
    }
  }
  .order{
    border-top: 1px solid #ccc;
    height: 55px;
    line-height: 55px;
    margin: 0 20px;
    .me{
      display: block;
      float: left;
    }
    .all{
      display: block;
      float: right;
      color: #999;
    }
  }
  .userItem{
    height: 60px;
    display: flex;
    color: #666;
    dl{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      .icon{
        font-family: 'iconfont';
        font-size: 24px;
        margin-top: 5px;
      }
      dd{
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  .list{
    margin-bottom: 65px;
    li{
      height: 50px;
      line-height: 50px;
      margin: 0 20px;
      color: #666;
      font-size: 14px;
      span{
        float: right;
        display: block;
        color: #999;
      }
    }
  }
  .footer{
    height: 40px;
    width: 100%;
    color: #666;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    display: flex;
    position: fixed;
    bottom: 20px;
    background: #fff;
    div{
      flex: 1;
      width: 33%;
    }
  }
  .copyright{
    height: 20px;
    width: 100%;
    margin-left: 20%;
    margin-top: 20px;
    color: #999;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
}
</style>
