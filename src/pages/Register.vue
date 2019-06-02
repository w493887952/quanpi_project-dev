<template>
  <div class="register">
    <div class="title">
      <button
        class="icon"
        @click="handleBack"
      >&#xe60c;</button>
      <div>注册</div>
    </div>
     <div class="input">
      <input type="text" v-focus placeholder="手机号/邮箱/用户名" v-model="username">
      <input type="password" placeholder="密码" v-model="password">
      <input type="password" placeholder="请确认密码" v-model="confirmPassword">
    </div>
    <div
      class="button"
      @click="register"
    >注册</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    register () {
      const {
        username,
        password,
        confirmPassword
      } = this
      if (!username) {
        Toast('拜托！！用户名不能为空！！')
        return
      }
      if (!password) {
        Toast('输密码鸭！！！')
        return
      } else {
        var reg = /^[A-Za-z0-9]{6,16}$/
        if (!reg.test(password)) {
          Toast({
            message: '密码必须由数字和字母组成，必须为6~16位',
            duration: 2000
          })
          return
        }
      }
      if (!confirmPassword) {
        Toast('请再次确认密码')
        return
      }
      if (password !== confirmPassword) {
        Toast('Tips:密码不一样噢~~')
        return
      }

      this.$http.post('http://rap2api.taobao.org/app/mock/87295/api/jp/register', {
        username,
        password,
        confirmPassword
      })
        .then((resp) => {
          if (resp.data.code === 200 && resp.data.errorMsg === 'SUCCESS' && resp.data.data.registate === 1) {
            Toast('登录成功')
            this.$router.push('/home')
            const user = {
              username: resp.data.data.username,
              token: resp.data.data.token,
              isLogin: true
            }
            this.loginSuccess(user)
            window.localStorage.setItem('user-info', JSON.stringify(user))
          } else {
            Toast('注册失败了…再试一下吧')
          }
        })
    },
    ...mapMutations(['hideTabbar', 'loginSuccess'])
  },
  mounted () {
    this.hideTabbar()
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 931782 */
  src: url('//at.alicdn.com/t/font_931782_xrhy6v6f51q.eot');
  src: url('//at.alicdn.com/t/font_931782_xrhy6v6f51q.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_931782_xrhy6v6f51q.woff') format('woff'),
  url('//at.alicdn.com/t/font_931782_xrhy6v6f51q.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_931782_xrhy6v6f51q.svg#iconfont') format('svg');
}
.register{
  .title {
    font-size: 20px;
    color:#fff;
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
  .tips{
    font-size: 12px;
    color: #999;
    width: 100%;
    margin-left: 20%;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
  }
  .input{
    height: 170px;
    font-size: 14px;
    text-align: center;
    input{
      height: 40px;
      width: 94%;
      padding-left: 10px;
      margin-top: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
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
}
</style>
