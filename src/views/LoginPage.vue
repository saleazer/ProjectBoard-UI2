<template>
<div >
  <v-form>
    <v-row >
        <v-col cols="4">
          <v-text-field
          v-model="username"
          label="username"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
        <v-text-field
        v-model="password"
        :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPW ? 'text' : 'password'"
        @click:append="showPW = !showPW"
        label="password"
        >
        </v-text-field>
        </v-col>
    </v-row>
  <v-btn @click='loginUser'>Login</v-btn>
</v-form>

</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginPage',
  props: {
  },

  data () {
    return {
      showPW: false,
      username: '',
      password: ''
    }
  },
  methods: {
    loginUser: async function () {
      try {
        const response = await axios.post('//localhost:8089/users/login', { login: this.username, password: this.password })
        const token = response.data.token
        localStorage.setItem('user-token', token)
        const user = response.data.user
        this.$store.commit('setCurrentUser', user.name)
        this.$store.commit('setCurrentToken')
        this.$router.push('user-home')
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

</style>
