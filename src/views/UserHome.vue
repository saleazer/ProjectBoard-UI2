<template>
    <div id='app' class='background'>
        <div class='work-area'>
            <v-row>
                <v-col>
                    <h3>Welcome {{this.$store.state.currentUser.name}}, what will you accomplish today?</h3>
                    <br>
                    <AddProject @board-update='getUserProjects'/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='6'>
                    <h4>Active Projects:</h4> <br>
                    <div v-for='project in allProjects' :key='project._id' class='padding'>
                        <router-link :to='"project/" + project._id' class='router-link'>
                            <ProjectCard v-bind:item='project'/>
                        </router-link>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
import AddProject from '../components/AddProject'
export default {
  name: 'UserHome',

  data () {
    return {

    }
  },
  components: {
    ProjectCard,
    AddProject
  },
  computed: {
    allProjects () {
      return this.$store.getters.allUserProjects
    }
  },
  methods: {
    getUserProjects: async function () {
      try {
        const response = await axios.get('https://whispering-cliffs-53295.herokuapp.com/projects', {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
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
