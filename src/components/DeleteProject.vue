<template>
    <v-btn color="red darken-1" text @click="deleteProject">
        Delete
    </v-btn>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DeleteProject',
  props: {
  },
  computed: {
    currentProjectID () {
      return this.$store.getters.currentProject._id
    }
  },
  methods: {
    deleteProject: async function () {
      try {
        await axios.delete('https://whispering-cliffs-53295.herokuapp.com/projects/' + this.currentProjectID, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        await axios.delete('https://whispering-cliffs-53295.herokuapp.com/board-item/byParent/' + this.currentProjectID, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
      } catch (e) {
        console.log(e)
      }
      this.$store.commit('clearCurrentProject')
      this.$router.push('/user-home')
    }
  }
}
</script>
