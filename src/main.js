import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
new Vue({
  el: '#app',
  render: h => h(App),
  store
})
