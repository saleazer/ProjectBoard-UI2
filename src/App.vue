<template>
  <v-app>
    <div id='nav'>
      <NavBar/>
    </div>
    <v-main>
    <router-view></router-view>
    </v-main>
    <Footer/>
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
.item.Low {
  border-left: 4px solid lightblue;
}
.item.Normal {
  border-left: 4px solid green;
}
.item.High {
  border-left: 4px solid red;
}
.cardSizing {
  min-height: 60px;
}
.app-bar {
  background-color: grey;
}
.drag-column {
  min-height: 50vh
}
.form {
  padding: 40px 0px 40px 0px;
}
.signup-line {
  padding: 10px 30px 10px 30px;
  font-weight: 600;
  font-style: italic;
  font-size: 13pt;
}
.project-page {
    margin-top: 20px;
    margin-left: 30px;
}
.drag-column {
  min-height: 30vh
}
.project-box {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}
.bottom-line {
  padding: 20px 10px 0px 10px;
  font-weight: 600;
  font-style: italic;
  font-size: 13pt;
}
/* I need to learn approrpriate inline css so I don't have to use these =( */
.padding {
    padding: 5px;
}
.padding2 {
    padding: 10px;
}
.titleSpacing {
  margin-left: 16px;
}/*  -------------------  */
</style>

<script>
import NavBar from './components/navigation/NavBar'
import Footer from './components/navigation/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>
