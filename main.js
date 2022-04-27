import App from './App'
import {myRequest} from "./util/request.js"
import uniAsync from "./util/async.js"
import Vue from 'vue'

Vue.prototype.$request = myRequest
Vue.prototype.$uniAsync = uniAsync


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()