import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  methods: {
    close: function () {
      this.$emit('board-update')
      this.dialog = false
    },
    setCurrentProject: function () {
      this.$store.commit('setCurrentProject', this.$route.params.id)
    },
    saveProject: async function () {
      if (this.project.title === '') {
        alert('Project title cannot be blank')
      } else {
        try {
          const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/projects', {
            title: this.project.title,
            description: this.project.description
          }, {
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.currentToken
            }
          })
          this.$store.commit('setNewCurrentProject', response.data)
        } catch (e) {
          console.log(e)
        }
        this.close()
      }
    },
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
    },
    saveProjectEdit: async function () {
      try {
        const response = await axios.patch('https://whispering-cliffs-53295.herokuapp.com/projects/' + this.project._id, {
          title: this.project.title,
          description: this.project.description
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        this.$store.commit('setNewCurrentProject', response.data)
      } catch (e) {
        console.log(e)
      }
      this.close()
    },
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
  }
}
