import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      currentUser: null,
      currentProject: null,
      allUserProjects: null,
      token: null
    }
  },
  // Prevents store from clearing during browser refresh
  plugins: [createPersistedState()],

  // Options to get data from the store
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
      if (state.currentProject == null) {
        return null
      } else {
        return state.currentProject._id
      }
    },
    currentUser (state) {
      return state.currentUser
    },
    currentUserID (state) {
      if (state.currentUser == null) {
        return null
      } else {
        return state.currentUser._id
      }
    }
  },

  // Options to change the data in the store
  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    },
    setCurrentToken (state) {
      state.token = localStorage.getItem('user-token')
    },
    setCurrentProject (state, id) {
      state.currentProject = state.allUserProjects.find(project => project._id === id)
    },
    setNewCurrentProject (state, project) {
      state.currentProject = project
    },
    clearCurrentProject (state) {
      state.currentProject = null
    },
    setAllUserProjects (state, projects) {
      state.allUserProjects = projects
    },
    logout (state) {
      state.currentUser = null
      state.currentProject = null
      state.allUserProjects = null
      state.token = null
    }
  },
  actions: {
  }
})

export default store
