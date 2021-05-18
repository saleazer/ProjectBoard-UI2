<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <h2 style='text-align: center'>Register Below</h2>
      <v-form class='form'>
        <v-row>
          <v-col>
            <v-text-field v-model='user.givenName' label='name'></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model='user.username' label='username'></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="user.password" :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPW ? 'text' : 'password'" @click:append='showPW = !showPW' v-on:keyup.enter="createUser" label='password'>
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
// import axios from 'axios'
import userServices from '../services/userServices'

export default {
  name: 'Register',
  mixins: [userServices],
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
  }
}
</script>
