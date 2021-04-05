import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      currentUser: null,
      currentProject: null,
      currentProjectId: null,
      allUserProjects: null,
      token: null
    }
  },
  // Prevents store from clearing during browser refresh
  plugins: [createPersistedState()],

  getters: {
    isAuthenticated: state => !!state.token,
    currentToken (state) {
      return state.token
    },
    allUserProjects (state) {
      return state.allUserProjects
    },
    currentProject (state) {
      return state.currentProject
    },
    currentProjectId (state) {
      return state.currentProjectId
    }
  },

  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    },
    setCurrentToken (state) {
      state.token = localStorage.getItem('user-token')
    },
    setCurrentProject (state, id) {
      state.currentProject = state.allUserProjects.find(project => project._id === id)
      state.currentProjectId = id
    },
    setAllUserProjects (state, projects) {
      state.allUserProjects = projects
    },
    clearCurrentUser (state) {
      state.currentUser = null
      state.token = null
      state.allUserProjects = null
    }
  },
  actions: {
  }
})

export default store
