<template>
  <div class="login">
    <div class="title">
      <button
        class="icon"
        @click="handleBack"
      >&#xe60f;</button>
      <div>登录</div>
      <button
        class="regist"
        @click="handleRegister"
      >注册</button>
    </div>
    <template>
      <div class="page-navbar">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="1">账号登录</mt-tab-item>
          <mt-tab-item id="2">手机快捷登录</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="input">
              <input type="text" v-focus placeholder="手机号/邮箱/用户名" v-model="username">
              <input type="password" placeholder="密码" v-model="password">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="mobile">
              <input type="number" v-focus placeholder="请输入您的手机号码">
              <input type="text" placeholder="请输入验证码 " class="code">
              <span @click="sendCode">获取验证码</span>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </template>
    <div
      class="button"
      @click="login"
    >登录</div>
    <div class="select">
      <div class="forget">忘记密码?</div>
    </div>
    <div class="other">
      第三方账号快速登录
    </div>
    <div class="option">
      <div class="icon">&#xe63b;</div>
      <div class="icon">&#xe87c;</div>
      <div class="icon">&#xe643;</div>
    </div>
    <div class="service">
      <div class="list">全场包邮</div>
      <div class="list">100%人工质检</div>
      <div class="list">7天放心退</div>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      selected: '1',
      username: '',
      password: ''
    }
  },
  watch: {
    user (val) {
      if (val.isLogin === true) {
        const { redirect = '/home' } = this.$route.params
        this.$router.push(redirect)
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleRegister () {
      this.$router.push('/register')
    },
    sendCode () {
      Toast({
        message: '就不给你发(๑╹◡╹)ﾉ"""',
        duration: 1000
      })
    },
    login () {
      const {
        username,
        password
      } = this
      // const isCorrect = password.matches('^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[\\W].*))[\\W0-9A-Za-z]{8,16}$')
      if (!username || !password) {
        Toast({
          message: '用户名或密码不对噢',
          duration: 1000
        })
        return
      } else if (password !== '') {
        var reg = /^[A-Za-z0-9]{6,16}$/
        if (!reg.test(password)) {
          Toast({
            message: '密码必须由数字和字母组成，必须为6~16位',
            duration: 2000
          })
          return
        }
      } else {
        return
      }
      this.$http.post('http://rap2api.taobao.org/app/mock/87295/api/jp/user', {
        username,
        password
      })
        .then((resp) => {
          if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
            /* console.log(this.$route)
            this.$router.push(this.$route.params) */
            const user = {
              username: resp.data.data.username,
              token: resp.data.data.token,
              isLogin: true
            }
            this.loginSuccess(user)
            window.localStorage.setItem('user-info', JSON.stringify(user))
          }
        })
    },
    ...mapMutations(['hideTabbar', 'loginSuccess', 'getUserinfo'])
  },
  mounted () {
    this.hideTabbar()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 931782 */
  src: url('//at.alicdn.com/t/font_931782_pl6c0cdpfu.eot');
  src: url('//at.alicdn.com/t/font_931782_pl6c0cdpfu.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_931782_pl6c0cdpfu.woff') format('woff'),
  url('//at.alicdn.com/t/font_931782_pl6c0cdpfu.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_931782_pl6c0cdpfu.svg#iconfont') format('svg');
}
.login{
  .title {
    font-size: 20px;
    color:#fff;
    background: rgba(218, 59, 1, .8);
    display: flex;
    height: 40px;
    .icon, .regist{
      font-family: 'iconfont';
      width: 50px;
      border: none;
      font-size: 20px;
      background: none;
      color:#fff;
    }
    .icon{
      float: left;
      font-size: 30px;
      font-weight: bold;
    }
    .regist{
      float: right;
      font-size: 14px;
    }
    div{
      flex: 1;
      text-align: center;
      line-height: 40px;
    }
  }
  .input{
    height: 110px;
    input{
      width: 94%;
      border: 1px solid #ccc;
      height: 40px;
      border-radius: 5px;
      margin-top: 10px;
      padding: 0 10px;
      outline: none;
    }
  }
  .button{
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    background: rgba(218, 59, 1, .8);
  }
  .select{
    height: 30px;
    font-size: 12px;
    margin-top: 10px;
    color: #666;
    .forget{
      width: 50%;
      float: right;
      height: 25px;
      line-height: 25px;
      text-align: right;
      &:hover{
        color: #0fe;
      }
    }
  }
  .mobile{
    height: 110px;
    font-size: 14px;
    input{
      height: 40px;
      width: 94%;
      margin-top: 10px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .code{
      width: 74%;
    }
    span{
      width: 30%;
      color: #999;
      cursor: pointer;
    }
  }
  .other{
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #666;
    font-size: 12px;
    margin: 20px 0;
  }
  .option{
    height: 50px;
    display: flex;
    text-align: center;
    justify-content: space-around;
    .icon{
      flex: 1;
      font-family: 'iconfont';
      font-size: 30px;
    }
    div:nth-child(1){
      color: #0fe;
    }
    div:nth-child(2){
      color: #f40;
    }
    div:nth-child(3){
      color: #f00;
    }
  }
  .service{
    height: 20px;
    display: flex;
    text-align: center;
    font-size: 12px;
    color: #ccc;
    margin-top: 20px;
    justify-content: space-around;
    .list{
      flex: 1;
    }
  }
}
.mint-navbar .mint-tab-item.is-selected{
  border-bottom: 3px solid rgba(218, 59, 1, .8);
  color: rgba(218, 59, 1, .8);
  margin-bottom: 0;
}
</style>
