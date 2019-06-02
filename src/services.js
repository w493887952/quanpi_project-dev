import axios from 'axios'
import { Indicator } from 'mint-ui'

const $http = axios.create()

$http.interceptors.request.use(config => {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config
})

$http.interceptors.response.use(resp => {
  Indicator.close()
  return resp
})

export default $http
