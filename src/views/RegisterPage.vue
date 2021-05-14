<template>
<div id='app' class='background'>
<div class='work-area'>
  <h2 style='text-align: center'>Register Below</h2>
  <v-form class='form'>
    <v-row>
        <v-col>
            <v-text-field
            v-model='user.givenName'
            label='name'
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
          <v-text-field
          v-model='user.username'
          label='username'
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
        <v-text-field
        v-model="user.password"
        :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPW ? 'text' : 'password'"
        @click:append='showPW = !showPW'
        label='password'
        >
        </v-text-field>
        </v-col>
    </v-row>
    <v-row class='bottom-line'>
        <v-btn @click='createUser'>Create</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click='toLoginPage'>back to Login</v-btn>
    </v-row>
</v-form>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RegisterPage',
  props: {
  },

  data () {
    return {
      showPW: false,
      user: {
        givenName: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    createUser: async function () {
      try {
        const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/users', { name: this.user.givenName, username: this.user.username, password: this.user.password })
        const token = response.data.token
        localStorage.setItem('user-token', token)
        const user = response.data.user
        this.$store.commit('setCurrentUser', user.name)
        this.$store.commit('setCurrentToken')
        this.$router.push('user-home')
      } catch (e) {
        console.log(e)
      }
    },
    toLoginPage: function () {
      this.$router.push('/')
    }

  }
}
</script>

<style scoped>

.form {
  padding: 40px 0px 10px 0px;
}

.bottom-line {
  padding: 20px 10px 0px 10px;
  font-weight: 600;
  font-style: italic;
  font-size: 13pt;
}

</style>
