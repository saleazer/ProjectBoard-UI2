<template>
  <div id='app' class='background'>
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
  },
  methods: {
    reRouteAuthenticated: function () {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('user-home')
      }
    }
  },
  beforeMount () {
    this.reRouteAuthenticated()
  }
}
</script>

<style scoped>

</style>
