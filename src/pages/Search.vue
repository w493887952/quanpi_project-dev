<template>
  <div class="search">
    <div class="header">
      <p class="input-search">
        <i @click="searchHandle">&#xe669;</i>
        <input v-focus type="text" placeholder="搜索商品" v-model="searchText"/>
        <b @click="clearText">&#xe645;</b>
      </p>
      <span @click="goBack">取消</span>
    </div>
    <div class="host-search">
      <h1>热搜</h1>
      <p>
        <span @click="toProductList">羽绒服女</span>
        <span @click="toProductList">马丁靴女</span>
      </p>
    </div>
    <div class="history-search" v-show="searchLists.length !== 0">
      <h2>历史记录<span @click="clearSearch">&#xe68e;</span></h2>
      <p>
        <span @click="toProductList" v-for="list of searchLists" :key="list.id">{{list.text}}</span>
      </p>
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
  name: 'search',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapMutations(['hideTabbar', 'addHistory', 'clearHistory']),
    goBack () {
      this.$router.back()
    },
    searchHandle () {
      if (this.searchText.length === 0) {
        window.sessionStorage.setItem('list-title', '热门商品')
        this.$router.push('/productlist')
        return
      }
      var reg = /^[\u4e00-\u9fa5]{1,100}$/
      if (reg.test(this.searchText)) {
        window.sessionStorage.setItem('list-title', this.searchText)
        const list = {
          id: Math.random() * 10000,
          text: this.searchText
        }
        this.$router.push('/productlist')
        this.addHistory(list)
        this.searchText = ''
      } else {
        Toast({
          message: '请输入正确的商品名称',
          duration: 1000
        })
      }
    },
    clearText () {
      this.searchText = ''
    },
    clearSearch () {
      this.clearHistory()
    },
    toProductList (e) {
      window.sessionStorage.setItem('list-title', e.srcElement.innerText)
      this.$router.push('/productlist')
    }
  },
  mounted () {
    this.hideTabbar()
  },
  computed: {
    ...mapState(['searchLists'])
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 941192 */
  src: url('//at.alicdn.com/t/font_941192_xshs4wofane.eot');
  src: url('//at.alicdn.com/t/font_941192_xshs4wofane.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_941192_xshs4wofane.woff') format('woff'),
  url('//at.alicdn.com/t/font_941192_xshs4wofane.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_941192_xshs4wofane.svg#iconfont') format('svg');
}
.search{
  height: 100%;
  width: 100%;
  .header{
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    line-height: 50px;
    .input-search{
      height: 30px;
      line-height: 30px;
      width: 75%;
      float: left;
      background: #f4f4f8;
      border-radius: 10px;
      margin: 10px;
      color: #999;
      i{
        font-family: 'iconfont';
        font-size: 16px;
        margin: 0 5px;
        float: left;
        width: 25px;
        height: 30px;
        text-align: center;
      }
      input{
        font-size: 14px;
        float: left;
        border: none;
        background: #f4f4f8;
        height: 28px;
        line-height: 28px;
        width: 70%;
        outline: none;
      }
      b{
        font-family: 'iconfont';
        font-size: 22px;
        float: right;
        margin-right: 3px;
        height: 30px;
        width: 25px;
        text-align: center;
      }
    }
    span{
      float: right;
      color: #333;
      margin-right: 10px;
      height: 50px;
      font-size: 18px;
    }
  }
  .host-search{
    margin-top: 15px;
    padding: 10px;
    h1{
      color: #999;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
    }
    p{
      min-height: 30px;
      color: #ff464e;
      span{
        font-size: 12px;
        float: left;
        background: #f4f4f4;
        margin: 5px;
        height: 25px;
        line-height: 25px;
        min-width: 70px;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
  .history-search{
    padding: 10px;
    h2{
      width: 100%;
      height: 24px;
      line-height: 24px;
      color: #999;
      font-size: 14px;
      span{
        float: right;
        font-family: 'iconfont';
        font-size: 18px;
      }
    }
    p{
      min-height: 30px;
      span{
        font-size: 12px;
        float: left;
        margin: 5px;
        background: #f4f4f4;
        height: 25px;
        line-height: 25px;
        min-width: 60px;
        border-radius: 10px;
        text-align: center;
        color: #666;
      }
    }
  }
}
</style>
