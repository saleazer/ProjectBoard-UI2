<template>
  <div id='app'>
    <div id='nav'>
      <NavBar/>
    </div>
    <v-main>
    <router-view></router-view>
    </v-main>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link {
  text-decoration: none;

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
