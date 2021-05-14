<template>
  <nav>
    <v-app-bar app clipped-left color='#d5d5d5'>
        <v-row class='pl-2' align='center'>
          <div v-if='this.$store.getters.isAuthenticated'>
              <v-icon v-if='!drawer' @click='drawer = !drawer' large color='teal'>mdi-menu</v-icon>
              <v-icon v-if='drawer' @click='drawer = !drawer' large color='teal'>mdi-backburger</v-icon>
          </div>
          <v-col md='10' sm='8' xs='2'>
            <h3>Project Board</h3><small>v1.0</small>
              <small> built by Steph</small>
          </v-col>
          <v-col v-if='this.$store.getters.isAuthenticated'>
            <v-btn @click='logoutUser'>Logout</v-btn>
          </v-col>
        </v-row>
    </v-app-bar>
    <v-navigation-drawer app
      v-if='this.$store.getters.isAuthenticated'
      clipped
      left
      v-model='drawer'
      color='#1c1c1c'
      width='185px'>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
          <v-icon color='teal'>{{item.icon}}</v-icon>
            <v-list-item>
              <label style='color:#dedede'>
              {{item.title}}
              </label>
            </v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>

</template>

<script>
import axios from 'axios'
export default {
  name: 'NavBar',
  components: {
  },
  props: {
  },

  computed: {
  },

  data () {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', link: '/user-home' },
        { title: 'Backlog', icon: 'mdi-image', link: '/backlog' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' }
      ]
    }
  },

  methods: {
    logoutUser: async function () {
      await axios.post('https://whispering-cliffs-53295.herokuapp.com/users/logout', {}, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.currentToken
        }
      })
      localStorage.removeItem('user-token')
      this.$store.commit('logout', null)
      this.toLoginPage()
    },
    toLoginPage: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.app-bar {
  background-color: grey;
}
</style>
