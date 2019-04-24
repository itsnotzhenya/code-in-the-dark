import Vue from 'vue'
import App from './App.vue'
import VueCodemirror from 'vue-codemirror'
import VueFire from 'vuefire'
import VModal from 'vue-js-modal'
import store from './store/index.js'

Vue.use(VModal)
Vue.use(VueFire)

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
