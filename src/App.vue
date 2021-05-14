<template>
  <v-app>
    <div id='nav'>
      <NavBar/>
    </div>
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link {
  text-decoration: none;

}

.background {
  background-image: url('./assets/teal.jpg');
  background-size: cover;
  height: 100vh;
  padding: 30px;
}
.work-area {
  background-color: lightgrey;
  opacity: 0.93;
  border-radius: 15px;
  padding: 30px 30px;
}
.padding {
    padding: 5px;
}
.padding2 {
    padding: 10px;
}

</style>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  },

  data () {
    return {
    }
  }
}
</script>
