<template>
  <nav>
    <v-app-bar app clipped-left color='teal lighten-4' dense>
        <v-row class='pl-2'>
          <v-col cols='1'>
            <v-btn @click='drawer = !drawer' v-if='this.$store.getters.isAuthenticated'></v-btn>
          </v-col>
          <v-col cols='9'>
            <h4>Project Board</h4><small>v1.0</small>
              <small> built by Steph</small>
          </v-col>
          <v-col>
            <v-btn @click='logoutUser'>Logout</v-btn>
          </v-col>
        </v-row>
    </v-app-bar>
    <v-navigation-drawer app clipped
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
        { title: 'Help', icon: 'mdi-help-box', link: '/help' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' }
      ]
    }
  },

  methods: {
    logoutUser: async function () {
      await axios.post('//localhost:8089/users/logout', {}, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.currentToken
        }
      })
      localStorage.removeItem('user-token')
      this.$store.commit('clearCurrentUser', null)
      this.toLoginPage()
    },
    toLoginPage: function () {
      this.$router.push('/')
    }
  }
}

</script>
