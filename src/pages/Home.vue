<template>
  <div tag="div" class="home" v-cloak>
    <div class="home-search">
      <div class="searchHeader">
        <p @click="toSearch">
          <i class="icon-search">&#xe614;</i>
          <span>搜索</span>
        </p>
      </div>
    </div>
    <div class="main">
      <div class="swipe">
        <Swipe
        :auto="4000"
        >
          <SwipeItem
            v-for="img in imgs"
            :key="img.id"
          >
            <img  @click="handleSpecial" :src="img.img" alt="" />
          </SwipeItem>
        </Swipe>
      </div>
      <div class="entry">
        <ul>
          <li @click="handleSpecial">
            <span class="icon">&#xe61b;</span>
            <span>最后疯抢</span>
          </li>
          <li @click="handleSpecial">
            <span class="icon">&#xe658;</span>
            <span>限时秒杀</span>
          </li>
          <li @click="handleSpecial">
            <span class="icon">&#xe600;</span>
            <span>品牌特卖</span>
          </li>
          <li @click="toProductList">
            <span class="icon">&#xe601;</span>
            <span>生活超市</span>
          </li>
        </ul>
      </div>
      <div class="nav">
        <div
          v-for="navImg in nav"
          :key="navImg.id"
          @click="handleSpecial"
        >
          <img :src="navImg.navImg" alt="">
        </div>
      </div>
      <div class="hot">
        <div class="left">
          <img @click="handleSpecial" :src="hot" alt="">
        </div>
        <div
          class="right"
          v-for="classImg in sort"
          :key="classImg.id"
          @click="handleSpecial"
        >
          <img :src="classImg.classImg" alt="">
        </div>
      </div>
      <div class="brand">
        <img @click="handleSpecial" :src="brand" alt="">
      </div>
      <div class="title">
        <span>精选口碑好货 买过的都说好</span>
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
      <!-- 根据条件渲染相应的组件 -->
      <div class="products">
        <template v-if ="name === '精选专场'">
          <dl
            v-for="prod of special"
            :key="prod.id"
          >
            <router-link to="/special">
              <img
              :src="prod.prodImg"
              alt=""
            >
            </router-link>
            <dt>
              <span class="discount">{{prod.discount}}</span>
              <span>{{prod.desc}}</span>
            </dt>
          </dl>
        </template>
        <template v-else-if="name === '精选单品'">
          <dl
            v-for="prod of product"
            :key="prod.id"
            v-show="true"
          >
            <dd>
              <img @click="toDetail" :src="prod.prodImg" alt="">
            </dd>
            <dt>
              <span class="discount">￥{{prod.price}}</span>
              <span>{{prod.desc}}</span>
            </dt>
          </dl>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      imgs: [],
      nav: [],
      hot: '',
      sort: [],
      brand: '',
      special: {},
      product: {},
      title: [{
        id: 1,
        select: '精选专场',
        isChecked: true
      }, {
        id: 2,
        select: '精选单品',
        isChecked: false
      }],
      name: ''
    }
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
    toDetail () {
      this.$router.push('/detail')
    },
    handleSpecial () {
      this.$router.push('/special')
    },
    toSearch () {
      this.$router.push('/search')
    },
    toProductList () {
      window.sessionStorage.setItem('list-title', '生活超市')
      this.$router.push('/productlist')
    },
    ...mapMutations(['showTabbar'])
  },
  mounted () {
    this.showTabbar()
  },
  components: {
    Search,
    Swipe,
    SwipeItem
  },
  created () {
    this.$http
      .get('http://rap2api.taobao.org/app/mock/87295/api/home')
      .then(resp => {
        if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
          this.imgs = resp.data.data.swiper
          this.nav = resp.data.data.nav
          this.hot = resp.data.data.hot
          this.sort = resp.data.data.class
          this.brand = resp.data.data.brand
          this.special = resp.data.data.special
          this.product = resp.data.data.product
        } else {
          Toast('网络出错，请稍后重试！')
        }
      })
    this.changeState(this.title[0])
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 940827 */
  src: url('//at.alicdn.com/t/font_940827_myqj0pgg6vr.eot');
  src: url('//at.alicdn.com/t/font_940827_myqj0pgg6vr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_940827_myqj0pgg6vr.woff') format('woff'),
  url('//at.alicdn.com/t/font_940827_myqj0pgg6vr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_940827_myqj0pgg6vr.svg#iconfont') format('svg');
}
[v-cloak]{
  display: none;
}
.active{
  border-bottom: 3px solid #ff464e;
  color: #ff464e;
}
.unactive{
  border: none;
  color: #001;
}
.home {
  height: 100%;
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  &-search {
    width: 100%;
    height: 52px;
    background: #fff;
    .searchHeader{
      height: 52px;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      p{
        box-sizing: border-box;
        width: 92%;
        margin: 10px auto;
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        color: #999;
        background: #f2f2f2;
        .icon-search{
          font-family: 'iconfont';
          font-size: 20px;
          margin: 0 10px;
          float: left;
        }
        span{
          float: left;
          font-size: 14px;
        }
      }
    }
  }
  .main {
    flex: 1;
    overflow: auto;
    margin-top: 5px;
    .swipe {
      width: 100%;
      height: 200px;
      .mint-swipe-item {
        width: 100%;
        height: 0;
        padding-bottom: 54%;
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: block;
        }
      }
    }
    .entry {
      height: 84px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      ul {
        display: flex;
        flex: 1;
        li {
          flex: 1;
          height: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon {
            font-family: 'iconfont';
            font-size: 30px;
            color: #ff464e;
            margin-bottom: 5px;
          }
        }
      }
    }
    .nav {
      width: 100%;
      height: 0;
      padding-bottom: 30%;
      position: relative;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        display: block;
      }
    }
    .hot {
      height: 227px;
      .left {
        float: left;
        width: 50%;
        height: 0;
        padding-bottom: 61%;
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: block;
        }
      }
      .right {
        float: left;
        width: 50%;
        height: 0;
        padding-bottom: 30.5%;
        position: relative;
        img {
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
    }
    .brand {
      // height: 97px;
      width: 100%;
      height: 0;
      padding-bottom: 26%;
      position: relative;
      img {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
    .title {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .container {
        height: 40px;
        width: 49%;
        line-height: 40px;
        margin-bottom: 20px;
        float: left;
        span{
          display: block;
        }
      }
    .products{
      height: 100%;
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
}
</style>
