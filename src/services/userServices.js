import axios from 'axios'

export default {
  methods: {
    reRouteAuthenticated: function () {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('user-home')
      }
    },
    loginUser: async function () {
      try {
        const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/users/login', { username: this.user.username, password: this.user.password })
        const token = response.data.token
        localStorage.setItem('user-token', token)
        const user = response.data.user
        this.$store.commit('setCurrentUser', user)
        this.$store.commit('setCurrentToken')
        this.$router.push('user-home')
      } catch (e) {
        alert('Please enter valid credentials')
      }
    },
    createUser: async function () {
      try {
        const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/users', { name: this.user.givenName, username: this.user.username, password: this.user.password })
        const token = response.data.token
        localStorage.setItem('user-token', token)
        const user = response.data.user
        this.$store.commit('setCurrentUser', user)
        this.$store.commit('setCurrentToken')
        this.$router.push('user-home')
      } catch (e) {
        console.log(e)
      }
    },
    toRegisterPage: function () {
      this.$router.push('/register')
    },
    toLoginPage: function () {
      this.$router.push('/')
    }
  }
}
