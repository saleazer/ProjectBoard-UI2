<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <h2 style='text-align: center'>Login</h2>
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
        <v-btn @click='loginUser'>Login</v-btn>
        <br><br>
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
    <br>
    <div class='work-area2'>
          <p><i><b>Interested in taking a look around?</b></i><br>
          Login with the following credentials to see an account in action.</p>
          <p><b>Username:</b> janedoe<br><b>Password:</b> janelogin</p>
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
