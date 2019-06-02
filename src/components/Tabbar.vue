<template>
  <div class="tabbar">
    <router-link
      v-for='menu of menus'
      :key='menu.name'
      :to='menu.path'
      tag='div'
      class='tabbar-menu'
    >
      <span v-show="menu.name === 'cart'" class="cartTotal">{{totalCount}}</span>
      <span class="icon" v-html="menu.icon"></span>
      <span class="title">{{menu.title}}</span>
    </router-link>
  </div>
</template>

<script>
import routes from '@/router/routes'
import { mapGetters } from 'vuex'
export default {
  name: 'Tabbar',
  data () {
    return {
      menus: routes.filter(router => router.isNav === true)
    }
  },
  computed: {
    ...mapGetters(['totalCount'])
  }
}
</script>

<style lang='scss' scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 931796 */
    src: url('//at.alicdn.com/t/font_931796_sj3len414ig.eot');
    src: url('//at.alicdn.com/t/font_931796_sj3len414ig.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_931796_sj3len414ig.woff') format('woff'),
    url('//at.alicdn.com/t/font_931796_sj3len414ig.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_931796_sj3len414ig.svg#iconfont') format('svg');
  }
  .tabbar{
    width: 100%;
    height: 60px;
    display: flex;
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    background: #fff;
    &-menu{
      flex: 1;
      line-height: 20px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 5px;
      color: #9E9E9E;
      position: relative;
      .icon{
        font-family: 'iconfont';
        font-size: 30px;
        margin-top: 5px;
      }
      .title{
        font-size: 14px;
        margin-top: 7px;
      }
    }
    &.router-link-exact-active,.router-link-active{
      color: #ff464e;
    }
    .cartTotal{
      position: absolute;
      top: -5px;
      right: 23px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      border-radius: 50%;
      background: #ff464e;
      color: #fff;
      text-align: center;
    }
  }
</style>
