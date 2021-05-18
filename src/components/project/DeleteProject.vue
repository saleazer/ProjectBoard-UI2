<template>
  <v-btn color='red darken-1' text @click='deleteProject'>Delete</v-btn>
</template>

<script>
import projectServices from '../../services/projectServices'

export default {
  name: 'DeleteProject',
  mixins: [projectServices],
  computed: {
    currentProjectID () {
      return this.$store.getters.currentProject._id
    }
  }
}
</script>
