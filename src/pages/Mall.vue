<template>
  <div class="mall">
    <div class="searchHeader">
      <p @click="toSearch">
        <i class="icon-search">&#xe68f;</i>
        <span>搜索商品</span>
      </p>
    </div>
    <div class="mall-main">
      <div class="sidebar">
        <Sidebar @showId="getId"/>
      </div>
      <div class="list">
       <dl
       class="list-categroy"
       v-for="list of catelists"
       :key="list.id + +Math.random()"
       @click="toProList(list.title)"
       >
         <dt>
           <img :src='list.img' alt="图片加载失败">
         </dt>
         <dd>
           <span>{{list.title}}</span>
         </dd>
       </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Toast } from 'mint-ui'
import Sidebar from 'components/Sidebar'
import { mapMutations } from 'vuex'
export default {
  name: 'mall',
  components: {
    Search,
    Sidebar
  },
  data () {
    return {
      catelists: []
    }
  },
  methods: {
    getId (id) {
      this.$http.get(`http://rap2api.taobao.org/app/mock/118647/api/cateList/${id}`)
        .then(resp => {
          if (resp.data.code === 200 && resp.data.errorMsg === 'OK') {
            this.catelists = resp.data.data
          } else {
            Toast('网络出错，请稍后重试！')
          }
        })
    },
    toProList (title) {
      window.sessionStorage.setItem('list-title', title)
      this.$router.push('/productlist')
    },
    toSearch () {
      this.$router.push('/search')
    },
    ...mapMutations(['showTabbar'])
  },
  created () {
    this.getId(100)
  },
  mounted () {
    this.showTabbar()
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 940792 */
  src: url('//at.alicdn.com/t/font_940792_n9im4rl2fc.eot');
  src: url('//at.alicdn.com/t/font_940792_n9im4rl2fc.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_940792_n9im4rl2fc.woff') format('woff'),
  url('//at.alicdn.com/t/font_940792_n9im4rl2fc.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_940792_n9im4rl2fc.svg#iconfont') format('svg');
}
.mall{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  .searchHeader{
    height: 52px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #ffffff;
    p{
      box-sizing: border-box;
      width: 92%;
      margin: 10px auto;
      border: 1px solid #cfcece;
      border-radius: 10px;
      height: 35px;
      line-height: 35px;
      color: #999;
      .icon-search{
        font-family: 'iconfont';
        font-size: 22px;
        margin: 0 10px;
        float: left;
      }
      span{
        float: left;
        font-size: 14px;
      }
    }
  }
  &-main{
    width: 100%;
    flex: 1;
    display: flex;
    margin-top: 62px;
    overflow-x: hidden;
    color: #333;
    .sidebar{
      height: 100%;
      width: 80px;
      background: #eee;
    }
    .list{
      flex: 1;
      overflow-x: hidden;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      &-categroy{
        width: 80px;
        height: 110px;
        margin: 10px 9px;
        dt{
          text-align: center;
        }
        img{
          width: 70px;
          height: 70px;
          border-radius: 15px;
        }
        span{
          display: block;
          font-size: 14px;
          text-align: center;
          margin: 20px 5px 10px;
        }
      }
    }
  }
}
</style>
