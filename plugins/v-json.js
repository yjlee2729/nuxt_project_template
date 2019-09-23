import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'

const VueJson = {
  install(Vue, options) {
    Vue.component('vue-json-pretty', VueJsonPretty)
  }
}

Vue.use(VueJson)

export default VueJson;