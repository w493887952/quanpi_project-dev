const Home = () => import('pages/Home')
const Mall = () => import('pages/Mall')
const Cart = () => import('pages/Cart')
const Cartdel = () => import('pages/Cartdel')
const Mine = () => import('pages/Mine')
const Detail = () => import('pages/Detail')
const Login = () => import('pages/Login')
const Register = () => import('pages/Register')
const Special = () => import('pages/Special')
const ProductList = () => import('pages/ProductList')
const Search = () => import('pages/Search')

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  title: '首页',
  isNav: true,
  icon: '&#xe6bf;',
  component: Home
}, {
  path: '/special',
  name: 'special',
  component: Special,
  props: true
}, {
  path: '/mall',
  title: '列表',
  isNav: true,
  icon: '&#xe6bb;',
  component: Mall,
  redirect: '/mall/100',
  children: [
    {
      path: ':catelist',
      name: 'catelist',
      component: Mall,
      props: true
    }
  ]
}, {
  path: '/cart',
  title: '购物车',
  name: 'cart',
  isNav: true,
  icon: '&#xe6b8;',
  meta: {
    isAuthor: true
  },
  component: Cart
}, {
  path: '/cartdel',
  title: '编辑购物车',
  name: 'cartdel',
  component: Cartdel
}, {
  path: '/mine',
  title: '我的卷皮',
  isNav: true,
  icon: '&#xe6c5;',
  component: Mine
}, {
  path: '/detail',
  component: Detail,
  children: [
    {
      path: ':id',
      name: 'detail',
      component: Detail,
      props: true
    }
  ]
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/register',
  component: Register
}, {
  path: '/productlist',
  component: ProductList
}, {
  path: '/search',
  component: Search
}]

export default routes
