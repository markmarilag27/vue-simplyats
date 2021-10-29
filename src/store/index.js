import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import auth from './modules/auth'
import job from './modules/job'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    ui,
    auth,
    job
  }
})
