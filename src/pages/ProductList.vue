<template>
  <div class="prolist">
    <div class="prolist-header">
      <span class="icon" @click="goBack">&#xe627;</span>
      <h3>{{title}}</h3>
      <span class="search" @click="toSearch">搜索</span>
      <span class="home" @click="toHome">首页</span>
    </div>
    <div class="prolist-list">
      <span @click="getList">综合</span>
      <span @click="getList">价格</span>
      <span @click="getList">销量</span>
      <span @click="getList">新品</span>
    </div>
    <div class="prolist-catagroy">
      <dl
      class="catgroy-list"
      v-for="prolist of prolists"
      :key="prolist.id"
      @click="toDetail(prolist.id)"
      >
        <dd>
          <img src='https://goods8.juancdn.com/goods/181025/f/6/5bd1c9a1b6f8ea644f169606_800x800.jpg?imageMogr2/thumbnail/310x310!/quality/88!/format/jpg' alt="图片可能去外星了">
        </dd>
        <dt>
          <div class="price">
            <span>￥{{prolist.price}}</span>
            <b>￥{{prolist.oldprice}}</b>
            <i>上新</i>
          </div>
          <h2>{{prolist.title}}</h2>
        </dt>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'productlist',
  data () {
    return {
      prolists: [],
      title: '标题'
    }
  },
  methods: {
    getList () {
      this.$http.get('http://rap2api.taobao.org/app/mock/118647/api/prolist')
        .then(resp => {
          if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
            this.prolists = resp.data.data
          } else {
            Toast({
              message: '网络出错，请稍后重试！',
              duration: 1000
            })
          }
        })
    },
    goBack () {
      this.$router.back()
    },
    toDetail (id) {
      this.$router.push(`/detail/${id}`)
    },
    toSearch () {
      this.$router.push('/search')
    },
    toHome () {
      this.$router.push('/home')
    },
    ...mapMutations(['hideTabbar'])
  },
  created () {
    this.getList()
    this.title = window.sessionStorage.getItem('list-title')
  },
  mounted () {
    this.hideTabbar()
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 934782 */
  src: url('//at.alicdn.com/t/font_934782_rt21z6c73a7.eot');
  src: url('//at.alicdn.com/t/font_934782_rt21z6c73a7.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_934782_rt21z6c73a7.woff') format('woff'),
  url('//at.alicdn.com/t/font_934782_rt21z6c73a7.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_934782_rt21z6c73a7.svg#iconfont') format('svg');
}
.prolist{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    color: #333;
    padding: 0 5px;
    border-bottom: 1px solid #9e9e9e;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    .icon{
      font-family: 'iconfont';
      display: inline-block;
      width: 30px;
      padding: 0 5px;
    }
    .search{
      font-size: 14px;
      width: 40px;
      margin-right: 10px;
      color: #333;
    }
    .home{
      font-size: 14px;
      width: 40px;
      margin-right: 10px;
      color: #333;
    }
    .home:hover{
      color: #ff464e;
    }
    h3{
      width: 280px;
      text-align: center;
    }
  }
  &-list{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    color: #666;
    margin-top: 40px;
    span:hover{
      color: #ff464e;
    }
  }
  &-catagroy{
    width: 100%;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    justify-content: space-between;
    .catgroy-list{
      width: 45%;
      height: 40%;
      margin-left: 3px;
      margin-top: 10px;
      padding: 0 2px;
      dd{
        width: 100%;
        height: 70%;
        text-align: center;
      }
      img{
        width: 90%;
        height: 100%;
      }
      .price{
        width: 100%;
        height: 30px;
        line-height: 30px;
        span{
          font-size: 16px;
          float: left;
          color: #ff464e;
        }
        b{
          font-size: 12px;
          float: left;
          color: #bbb;
          text-decoration: line-through;
        }
        i{
          font-size: 12px;
          float: right;
          color: #bbb;
        }
      }
      h2{
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
