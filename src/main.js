import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import Result from "./components/Result.vue";
import Main from "./components/Main.vue";
Vue.use(VueRouter)
Vue.use(VModal)
Vue.use(VueFire)


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: "", component: Main },
    { path: "/result/:id", component: Result }
  ]
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
