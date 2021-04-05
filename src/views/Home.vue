<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginPage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/views/LoginPage.vue'

export default {
  name: 'Home',
  components: {
    LoginPage
  }
}
</script>

<style scoped>

</style>
