<template>
  <div class="cart">
    <div class="header">
      <span></span>
      <h2>购物车</h2>
      <strong @click="goBack">取消</strong>
    </div>
    <div class="nav">
      <p>
        <i>&#xe733;</i>
        <b>跨店促销</b>
      </p>
      <strong @click="toHome">去凑单&nbsp;&#xe61f;</strong>
    </div>
    <div class="cart-detail">
      <ul
        class="list"
        v-for="list of cartList"
        :key="list.id"
        v-if="cartList.length !== 0"
      >
        <li>
          <label class="input-radio" @change="watchChecked(list.id)">
            <input
            type="checkbox"
            :name="list.id"
            class="listBut"
            :checked='list.isChecked'
            ><span></span>
          </label>
        </li>
        <li>
          <img src="https://goods3.juancdn.com/goods/170911/5/d/59b64e77a9fcf80de8037346_800x800.jpg?iopcmd=thumbnail&type=11&height=310&width=310%7Ciopcmd=convert&Q=88&dst=jpg" alt="图片丢失">
        </li>
        <li>
          <h1>{{list.title}}</h1>
          <p class="size">
            <span>图片色</span>
            <span>均码</span>
          </p>
          <p class="list-price">
            <span class="price">￥{{list.price}}</span>
            <span class="oldprice">￥{{list.oldprice}}</span>
          </p>
        </li>
        <li class="number">
          <span @click="reduceCount(list.id)">-</span>
          <b>{{list.count}}</b>
          <span @click="addCount(list.id)">+</span>
        </li>
      </ul>
      <div
        class="empty"
        v-if="cartList.length === 0"
      >
        <img src="./cart.png" alt="图片丢失了">
        <p>购物车空空如也，去<b @click="toHome">逛逛</b>吧！</p>
      </div>
    </div>
    <div class="footer">
      <p class="p-all">
        <label class="input-radio">
          <input
          type="checkbox"
          name="checkall"
          @change="checkAll($event)"
          :checked="changeAllState"
          ><span>全选</span>
        </label>
      </p>
      <p class="buy">
        <span>合计<i>￥{{totalPrice.toFixed(2)}}</i></span>
        <button @click="cartDelete">删除</button>
      </p>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
  mapState,
  mapGetters
} from 'vuex'
export default {
  name: 'cart',
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back()
    },
    watchChecked (id) {
      this.changeState(id)
    },
    ...mapMutations([
      'hideTabbar',
      'reduceCount',
      'addCount',
      'changeState',
      'checkAll',
      'deleteCart'
    ]),
    cartDelete () {
      this.deleteCart()
    }
  },
  mounted () {
    this.hideTabbar()
  },
  computed: {
    ...mapState(['cartList', 'isDelete']),
    ...mapGetters(['totalCheckCount', 'totalPrice', 'changeAllState'])
  }
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: 'iconfont';  /* project id 936467 */
  src: url('//at.alicdn.com/t/font_936467_vrkaqjsf7ck.eot');
  src: url('//at.alicdn.com/t/font_936467_vrkaqjsf7ck.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_936467_vrkaqjsf7ck.woff') format('woff'),
  url('//at.alicdn.com/t/font_936467_vrkaqjsf7ck.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_936467_vrkaqjsf7ck.svg#iconfont') format('svg');
}
.cart{
  background: #f4f4f8;
  height: 100%;
  display: flex;
  flex-direction: column;
    .input-radio {
      cursor: pointer;
    }
    .input-radio span {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      padding-left: 20px;
      position: relative;
    }
    .input-radio span:before {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      border: 2px solid #bebebe;
      box-sizing: border-box;
      border-radius: 50%;
      left: 0;
      top: 2px
    }
    .input-radio span:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #ff464e;
      box-sizing: border-box;
      border-radius: 50%;
      left: 4px;
      top: 6px;
      opacity: 0;
    }
    .input-radio input {
      display: none;
    }
    .input-radio input:checked ~ span:before {
      border-color: #ff464e;
      transition: border-color 0.4s ease-in;
    }
    .input-radio input:checked ~ span:after {
      opacity: 1;
      transition: opacity 0.2s ease-in;
    }
  .header{
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid #ebebeb;
    color: #333;
    position: fixed;
    top: 0;
    left: 0;
    width: 92%;
    span{
      font-family: 'iconfont';
      font-size: 25px;
    }
    h2{
      font-size: 20px;
    }
  }
  .nav{
    width: 92%;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #ebebeb;
    padding: 0 15px;
    color: #666;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 51px;
    left: 0;
    p{
      height: 40px;
      line-height: 40px;
      label{
        margin-top: 20px;
      }
    }
    i{
      font-family: 'iconfont';
      font-size: 20px;
      margin-right: 10px;
    }
    b{
      font-size: 14px;
    }
    strong{
      font-family: 'iconfont';
      font-size: 14px;
      color: #ff464e;
    }
  }
  .cart-detail{
    margin-bottom: 50px;
    margin-top: 93px;
    flex: 1;
    overflow-x: hidden;
  }
  .list{
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    background: #fff;
    position: relative;
    .delete{
      position: absolute;
      top: 5px;
      right: 10px;
      color: #bebebe;
      font-size: 20px;
    }
    li{
      margin-left: 10px;
    }
    img{
      height: 75px;
      width: 75px;
    }
    h1{
      height: 35px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
    }
    p{
      height: 25px;
    }
    .size{
      color: #bbb;
      font-size: 14px;
    }
    .list-price{
      line-height: 30px;
      font-size: 14px;
      .price{
        color: #ff464e;
      }
      .oldprice{
        color: #999999;
        text-decoration: line-through;
      }
    }
    .number{
      width: 80px;
      color: #666;
      span{
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #cfcece;
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .empty{
    background: #f4f4f8;
    width: 100%;
    text-align: center;
    height: 150px;
    line-height: 150px;
    color: #666;
    font-size: 20px;
    text-align: center;
    b{
      color: #ff464e;
    }
    img{
      display: block;
      height: 150px;
      width: 150px;
      margin: 15px auto;
    }
    p{
      height: 80px;
      line-height: 80px;
    }
  }
  .footer{
    width: 96%;
    height: 50px;
    background: #fff;
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    position: fixed;
    left: 0;
    bottom: 0;
    button{
      border: none;
      height: 50px;
      width: 120px;
      background: #ff464e;
      font-size: 17px;
      color: #fff;
    }
    .p-all{
      color: #333;
      font-size: 14px;
    }
    .buy{
      span{
        color: #666;
        font-size: 14px;
        margin-right: 5px;
        i{
          color: #ff464e;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
