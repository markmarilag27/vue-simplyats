export default {
  namespaced: true,

  // initial state
  state: {
    list: [],
    links: {},
    meta: {},
    filter: {
      page: 1,
      per_page: 15,
      title: null,
      sort: 'desc'
    },
    errors: {},
    isLoading: false
  },

  // getters
  getters: {
    querySearchParams: state => {
      const filter = Object.entries(state.filter).reduce((preValue, [key, value]) => {
        if (value) {
          preValue[key] = value
        }
        return preValue
      }, {})
      return new URLSearchParams(filter)
    }
  },

  // mutations
  mutations: {
    SET_JOB: (state, payload) => {
      const cloneList = [...state.list]
      let newList = []

      if (payload.isSearch) {
        newList = payload.data
      } else if (payload.uuid) {
        newList = [payload, ...cloneList]
      } else {
        newList = [...cloneList, ...payload.data]
      }

      if (payload.links && payload.meta) {
        state.links = payload.links
        state.meta = payload.meta
      }

      state.list = newList
    },
    UPDATE_JOB: (state, payload) => {
      const cloneList = [...state.list]
      const updatedList = cloneList.map(job => {
        if (payload.uuid === job.uuid) {
          return payload
        }
        return job
      })
      state.list = updatedList
    },
    DELETE_JOB: (state, payload) => {
      const cloneList = [...state.list]
      const newList = cloneList.filter(job => payload !== job.uuid)
      state.list = newList
    },
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_ERRORS: (state, payload) => (state.errors = payload),
    SET_LOADING: (state, payload) => (state.isLoading = payload)
  },

  // actions
  actions: {
    setJob: ({ commit }, payload) => (commit('SET_JOB', payload)),
    updateJob: ({ commit }, payload) => (commit('UPDATE_JOB', payload)),
    deleteJob: ({ commit }, payload) => (commit('DELETE_JOB', payload)),
    setFilter: ({ commit }, payload) => (commit('SET_FILTER', payload)),
    setErrors: ({ commit }, payload) => (commit('SET_ERRORS', payload)),
    setLoading: ({ commit }, payload) => (commit('SET_LOADING', payload))
  }
}
