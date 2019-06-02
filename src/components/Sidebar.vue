<template>
  <div class="sidebar-menus">
    <router-link
    :to="/mall/+ menu.id"
    v-for='menu of menus'
    :key='menu.id'
    tag='div'
    @click.native="$emit('showId',menu.id )"
    >
      {{menu.text}}
    </router-link>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Sidebar',
  data () {
    return {
      menus: [],
      menuId: 100
    }
  },
  created () {
    this.$http.get('http://rap2api.taobao.org/app/mock/118647/api/sidebar')
      .then(resp => {
        if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
          this.menus = resp.data.data
          return resp
        } else {
          Toast({
            message: '网络出错，请稍后重试！',
            duration: 1000
          })
        }
      })
  }
}
</script>

<style lang='scss' scoped>
.sidebar-menus{
  min-height: 400px;
}
  .sidebar-menus >div{
    height: 50px;
    text-align: left;
    line-height: 50px;
    padding-left: 10px;

  }
  .router-link-exact-active{
    background: #fff;
    padding-left: 10px;
    height: 40px;
    text-align: left;
    line-height: 40px;
    border-left: 2px solid #ff464e;
  }
  .active{
    background: #fff;
    padding-left: 10px;
    height: 40px;
    text-align: left;
    line-height: 40px;
    border-left: 2px solid #ff464e;
  }
</style>
