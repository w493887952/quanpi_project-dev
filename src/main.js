// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'

import router from './router'
import $http from './services'
import store from './store'
import App from './App'

Vue.use(Mint)

Vue.prototype.$http = $http
Vue.config.productionTip = false
// 未登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuthor & store.state.user.isLogin === false) {
    next({
      name: 'login',
      params: {
        redirect: to.path
      }
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
