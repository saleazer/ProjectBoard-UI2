<template>
  <div id="app" class=" ">
    <br>
    <h1 class = "pt-3">About it all..</h1>
    <img alt="Vue logo" src="../assets/logo.png" height='185'>
    <img alt="Node logo" src="../assets/node-js.png" height='185'>
    <p>This project was designed and built in Vue.js and Node.js</p>
  </div>
</template>

<script>
export default {

  computed: {
    user () {
      return this.$store.state.currentUser
    }
  }
}

</script>

<style scoped>

</style>
