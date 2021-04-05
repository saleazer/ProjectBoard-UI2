<template>
    <v-app>
        <v-container>
            <h4>Welcome {{this.$store.state.currentUser}}, what will you accomplish today?</h4>
            <body>
                    <div v-for='project in allProjects' :key='project._id'>
                        <router-link :to='"project/" + project._id' class='router-link'>
                            <ProjectCard v-bind:item='project'/>
                        </router-link>
                    </div>
            </body>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
export default {
  name: 'UserHome',

  data () {
    return {

    }
  },
  components: {
    ProjectCard
  },
  computed: {
    allProjects () {
      return this.$store.getters.allUserProjects
    }
  },
  methods: {
    getUserProjects: async function () {
      try {
        const response = await axios.get('//localhost:8089/projects', {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        // console.log(response)
        this.$store.commit('setAllUserProjects', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.getUserProjects()
  }
}
</script>

<style scoped>

</style>
