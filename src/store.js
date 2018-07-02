import Vue from 'vue'
import Vuex from 'vuex'
import {
  getField,
  updateField,
  pushArray,
  setArray,
  removeArray
} from './vuex-map-fields/index'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: 1,
    meta: ['川端康成', '小説', '近代文学'],
    author: {
      name: '川端康成',
    },
    posts: [
      {
        id: 1,
        title: '雪国',
        text: '国境の長いトンネルを抜けると雪国であった。',
        keywords: ['近代文学', '雪国']
      },
      {
        id: 2,
        title: '伊豆の踊子',
        text: '道がつづら折りになって、いよいよ天城峠に近づいたと思う頃、雨脚が杉の密林を白く染めながら、すさまじい早さで麓から私を追って来た。',
        keywords: ['近代文学', '伊豆の踊子']
      }
    ]
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,

    pushArray,
    setArray,
    removeArray
  },
})

export default store
