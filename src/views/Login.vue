<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <h2 style='text-align: center'>Login</h2>
      <v-form class='form'>
        <v-row>
          <v-col>
            <v-text-field v-model='user.username' label='username'></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model='user.password' :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'" :type="showPW ? 'text' : 'password'"
              @click:append='showPW = !showPW' v-on:keyup.enter='loginUser' label='password'
            ></v-text-field>
          </v-col>
        </v-row>
        <br>
        <v-btn @click='loginUser'>Login</v-btn>
      </v-form>
      <v-divider></v-divider>
      <v-row class='signup-line'>
        <v-col>
          <p style='text-align: right; padding-top:8px'>Not a member?  Register in just a few clicks!</p>
        </v-col>
        <v-col cols='2'>
          <v-btn @click='toRegisterPage'>Sign Up</v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import userServices from '../services/userServices'

export default {
  name: 'Login',
  mixins: [userServices],
  components: {
  },
  data () {
    return {
      showPW: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  beforeMount () {
    this.reRouteAuthenticated()
  }
}
</script>
