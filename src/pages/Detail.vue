<template>
  <div class="detail">
    <span class="header" @click="goBack">&#xe622;</span>
    <div class="detail-banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item
        v-for="img of detailInfo.imgs"
        :key="img.id"
        >
          <img src="https://goods4.juancdn.com/goods/180929/7/3/5baf2fcf33b0891af208731b_800x800.jpg?imageMogr2/quality/88!/format/jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="detail-title">
      <div>
        <span class="price">￥{{detailInfo.price}}</span>
        <b>￥{{detailInfo.oldprice}}</b>
        <span class="by">包邮</span>
        <strong><i>{{detailInfo.person}}</i>人已购</strong>
      </div>
      <h2>{{detailInfo.title}}<span class="icon">&#xe662;</span></h2>
    </div>
    <div class="message">
      <i class="dot">&#xec1e;</i>
      <span>24小时发货</span>
      <i class="dot">&#xec1e;</i>
      <span>7天包邮</span>
      <i class="dot">&#xec1e;</i>
      <span>售后补贴</span>
    </div>
    <div class="type">
      <p>
        颜色：<span>图片色</span>
      </p>
      <p>
        尺码：<span>均码</span>
      </p>
    </div>
    <div class="img-detail">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">图文详情</mt-tab-item>
        <mt-tab-item id="2">商品参数</mt-tab-item>
        <mt-tab-item id="3">咨询与售后</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="select-context" v-for="img of detailInfo.imgs" :key="img.id">
            <img src="https://goods6.juancdn.com/goods/180929/a/1/5baf2ca033b089250f66f169_790x760.jpg" alt="图片丢失">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="pro-param">
            <li><span>常用快递</span>{{detailInfo.kuaidi}}</li>
            <li><span>面料</span>{{detailInfo.mianliao}}</li>
            <li><span>运费</span>{{detailInfo.yunfei}}</li>
            <li><span>厚薄</span>{{detailInfo.houbao}}</li>
            <li><span>图案</span>{{detailInfo.tuan}}</li>
            <li><span>上市年份</span>{{detailInfo.nianfen}}</li>
            <li><span>衣长</span>{{detailInfo.yichang}}</li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="shouhou">
            <img src="./shouhou.png" alt="ddd">
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="footer">
      <p @click="toHome">
        <span class="footer-icon">&#xe605;</span>
        <b>首页</b>
      </p>
      <p @click="toCart">
        <span class="cartCount">{{totalCount}}</span>
        <span class="footer-icon">&#xe6b8;</span>
        <b>购物车</b>
      </p>
      <button @click="buyHandle">立即购买</button>
      <button class="add-cart" @click="addCartLists(detailInfo)">加入购物车</button>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
  mapGetters,
  mapState
} from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'detail',
  data () {
    return {
      selected: '1',
      detailInfo: {}
    }
  },
  methods: {
    getInfo () {
      this.$http.get('http://rap2api.taobao.org/app/mock/118647/api/detail/:id')
        .then(resp => {
          if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
            this.detailInfo = resp.data.data
          } else {
            Toast({
              message: '网络出错，请稍后重试！',
              duration: 1000
            })
          }
        })
    },
    toHome () {
      this.$router.push('/home')
    },
    toCart () {
      this.$router.push('/cart')
    },
    goBack () {
      this.$router.back()
    },
    addCartLists (proInfo) {
      if (this.user.isLogin === false) {
        this.$router.push('/login')
        return false
      } else {
        const detailInfo = {
          id: proInfo.id,
          title: proInfo.title,
          price: proInfo.price,
          oldprice: proInfo.oldprice,
          count: 1,
          isChecked: false
        }
        this.addCart(detailInfo)
      }
    },
    buyHandle () {
      Toast({
        message: '假的，还不能点哦！',
        duration: 1000
      })
    },
    ...mapMutations(['hideTabbar', 'addCart'])
  },
  computed: {
    ...mapGetters(['totalCount']),
    ...mapState(['user'])
  },
  created () {
    this.getInfo()
  },
  mounted () {
    this.hideTabbar()
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 934982 */
  src: url('//at.alicdn.com/t/font_934982_8h5z98mbpa.eot');
  src: url('//at.alicdn.com/t/font_934982_8h5z98mbpa.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_934982_8h5z98mbpa.woff') format('woff'),
  url('//at.alicdn.com/t/font_934982_8h5z98mbpa.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_934982_8h5z98mbpa.svg#iconfont') format('svg');
}
.header{
  font-family: 'iconfont';
  position: fixed;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 25px;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  text-align: center;
  border-radius: 50%;
  top: 10px;
  left: 10px;
}
.detail{
  width: 100%;
  height: 100%;
  background: #f4f4f8;
  &-banner{
    width: 100%;
    height: 300px;
    img{
      width: 100%;
      height: 300px;
    }
  }
  &-title{
    width: 100%;
    height: 80px;
    background: #fff;
    div{
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      .price{
        float: left;
        font-size: 20px;
        color: #ff464e;
      }
      b{
        float: left;
        font-size: 12px;
        color: #bbbbbb;
        text-decoration: line-through;
        padding: 0 10px;
      }
      .by{
        display: inline-block;
        height: 22px;
        line-height: 25px;
        width: 35px;
        font-size: 14px;
        background: #ff464e;
        text-align: center;
      }
      strong{
        float: right;
        color: #999;
        font-size: 12px;
      }
    }
    h2{
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      padding-bottom: 10px;
      font-size: 20px;
      color: #333;
      .icon{
        font-family: 'iconfont';
        float: right;
        font-weight: bolder;
        font-size: 25px;
      }
      .icon:hover{
        color: #ff464e;
      }
    }
  }
  .message{
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    .dot{
      float: left;
      font-family: 'iconfont';
      color: #ff464e;
      font-size: 18px;
    }
    span{
      float: left;
      color: #666;
      font-size: 12px;
      margin-right: 10px;
    }
  }
  .type{
    height: 90px;
    line-height: 40px;
    font-size: 18px;
    color: #333;
    p{
      height: 40px;
      background: #fff;
      margin-top: 8px;
      padding: 0 20px;
      span{
        margin-left: 10px;
        font-size: 12px;
        display: inline-block;
        height: 25px;
        width: 50px;
        line-height: 25px;
        text-align: center;
        border-radius: 8px;
        background: #ff464e;
        color: #fff;
      }
    }
  }
  .img-detail{
    margin-top: 10px;
    background: #f4f4f8;
    margin-bottom: 50px;
    .select-context{
      margin-top: 15px;
      text-align: center;
      background: #fff;
      img{
        width: 90%;
        height: 200px;
      }
    }
  }
  .shouhou{
    width: 100%;
    height: 535px;
    text-align: center;
    img{
      width: 98%;
      height: 100%;
    }
  }
  .pro-param{
    margin-top: 15px;
    li{
      height: 40px;
      background: #fff;
      font-size: 14px;
      span{
        display: inline-block;
        color: #bbb;
        width: 100px;
        padding: 10px 10px 10px 30px;
      }
    }
  }
  .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0 !important;
    border-bottom: 3px solid #ff464e !important;
    color: #ff464e !important;
  }
}
.footer{
  width: 99%;
  height: 50px;
  background: #f4f4f8;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  p{
    height: 50px;
    width: 100px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    position: relative;
    .footer-icon{
      font-family: 'iconfont';
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 10px;
    }
    .cartCount{
      position: absolute;
      top: -6px;
      right: 25px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background: #ff464e;
      color: #fff;
      text-align: center;
    }
  }
  button{
    height: 50px;
    width: 99px;
    background: #f4f4f8;
    border: none;
    outline: none;
  }
  .add-cart{
    background: #ff464e;
    color: #fff;
  }
}
</style>
