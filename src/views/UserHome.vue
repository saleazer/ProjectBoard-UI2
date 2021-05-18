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
import ProjectCard from '../components/project/ProjectCard'
import AddProject from '../components/project/AddProject'
import projectServices from '../services/projectServices'

export default {
  name: 'UserHome',
  mixins: [projectServices],
  components: {
    ProjectCard,
    AddProject
  },
  computed: {
    allProjects () {
      return this.$store.getters.allUserProjects
    }
  },
  mounted () {
    this.getUserProjects()
  }
}
</script>
