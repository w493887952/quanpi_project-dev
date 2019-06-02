<template>
  <div class="special">
    <div class="title">
      <button
        class="icon"
        @click="handleBack"
      >&#xe60c;</button>
      <div>LYLSYA专场</div>
      <button>···</button>
    </div>
    <div class="name">
      <div class="logo">
        <img src="#" alt="">
      </div>
      <div class="entry">
        <dl>
          <dt>
            <div>LILSYA美妆专场</div>
            <div class="amount">共68件商品</div>
          </dt>
          <dd>
            <span class="icon">&#xe662;</span>
          </dd>
        </dl>
      </div>
    </div>
    <div class="time">
      <div class="tip">距离结束还剩</div>
      <count-down
        v-on:end_callback="countDownE_cb(1)"
        :currentTime="new Date().getTime()"
        :startTime="new Date().getTime()"
        :endTime="new Date('2018-12-02').getTime()"
        :dayTxt="'天'"
        :hourTxt="'小时'"
        :minutesTxt="'分钟'"
        :secondsTxt="'秒'"
      ></count-down>
    </div>
    <div
      class="container"
      v-for="item in title"
      :key="item.id"
    >
      <span
        @click="changeState( item )"
        :class="{ active : item.isChecked }"
      >{{ item.select }}</span>
    </div>
    <div class="products">
      <template v-if ="name === '79元3件'">
        <dl
          v-for="prod of product"
          :key="prod.id"
        >
          <router-link to="/detail">
            <img
            :src="prod.prodImg"
            alt=""
            >
          </router-link>
          <dt>
            <span class="discount">￥{{prod.price * 0.5}}</span>
            <span>{{prod.desc}}</span>
          </dt>
        </dl>
      </template>
      <template v-else-if="name === '五折区'">
        <dl
          v-for="prod of product"
          :key="prod.id"
          v-show="true"
        >
          <router-link to="/detail">
            <img
            :src="prod.prodImg"
            alt=""
            >
          </router-link>
          <dt>
            <span class="discount">￥{{prod.price}}</span>
            <span>{{prod.desc}}</span>
          </dt>
        </dl>
      </template>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import CountDown from 'vue2-countdown'
export default {
  name: 'special',
  data () {
    return {
      product: {},
      title: [{
        id: 1,
        select: '79元3件',
        isChecked: true
      }, {
        id: 2,
        select: '五折区',
        isChecked: false
      }],
      name: ''
    }
  },
  components: {
    CountDown
  },
  methods: {
    // 点击切换title
    changeState (item) {
      this.name = item.select
      this.title.forEach(bar => {
        if (bar.id === item.id) {
          if (item.isChecked) {
            item.isChecked = true
          } else {
            item.isChecked = true
          }
        } else {
          bar.isChecked = false
        }
      })
    },
    countDownE_cb: function (x) {
      Toast({
        message: '计时结束啦',
        duration: 1000
      })
    },
    handleBack () {
      this.$router.go(-1)
    },
    ...mapMutations(['hideTabbar'])
  },
  created () {
    this.$http
      .get('http://rap2api.taobao.org/app/mock/87295/api/home')
      .then(resp => {
        if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
          this.product = resp.data.data.product
        } else {
          Toast({
            message: '网络出错，请稍后重试！',
            duration: 1000
          })
        }
      })
    this.changeState(this.title[0])
  },
  mounted () {
    this.hideTabbar()
  }
}
</script>

<style lang="scss" scoped>
html,body::-webkit-scrollbar {
  opacity: 0;
  width: 0;
  height: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 931782 */
  src: url('//at.alicdn.com/t/font_931782_30tbn3thl0l.eot');
  src: url('//at.alicdn.com/t/font_931782_30tbn3thl0l.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_931782_30tbn3thl0l.woff') format('woff'),
  url('//at.alicdn.com/t/font_931782_30tbn3thl0l.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_931782_30tbn3thl0l.svg#iconfont') format('svg');
}
.active{
  color: #ff464e;
  border-bottom: 2px solid #ff464e;
}
.special {
  .title {
    width: 100%;
    font-size: 20px;
    color :#666;
    background: none;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #ebebeb;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    button{
      width: 50px;
      border: none;
      font-size: 20px;
      background: none;
      font-weight: bolder;
      color: #999;
      outline: none;
    }
    .icon{
      font-family: 'iconfont';
      font-size: 30px;
    }
    div{
      flex: 1;
      text-align: center;
      line-height: 40px;
    }
  }
  .name {
    height: 100px;
    margin: 15px 0;
    padding: 0 20px;
    margin-top: 50px;
    .logo{
      width: 20%;
      height: 50%;
      margin-top: 8%;
      background: #ff0;
      float: left;
    }
    .entry{
      float: left;
      width: 75%;
      margin-left: 5%;
      margin-top: 10%;
      dl{
        dt{
          float: left;
          .amount{
            font-size: 14px;
            color: #999;
            margin-top: 8%;
          }
        }
        dd{
          float: right;
          margin-top: 3%;
          .icon{
            font-family: 'iconfont';
            font-size: 30px;
          }
        }
      }
    }
  }
  .time{
    height: 50px;
    font-size: 14px;
    color: #666;
    text-align: center;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    .tip{
      padding-top: 5px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #ff464e;
    }
    .daojishi{
      margin-left: 41%;
      margin-top: 10px;
    }
  }
  .container {
    height: 40px;
    width: 49%;
    line-height: 40px;
    margin-bottom: 15px;
    float: left;
    span{
      display: block;
      text-align: center;
    }
  }
  .products{
    dl{
      float: left;
      height: 243px;
      margin-bottom: 10px;
      width: 50%;
      dd{
        width: 100%;
        margin-bottom: 100%;
        height: 0;
        position: relative;
        img{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: block;
        }
      }
      span{
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .discount{
        font-size: 16px;
        color: #ff464e;
      }
    }
  }
}
</style>
