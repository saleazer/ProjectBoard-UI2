<template>
  <div>
        <v-row >
            <v-dialog v-model="dialog" persistent max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small v-bind="attrs" v-on="on">
                    New Project
                    </v-btn>
                </template>
            <v-card>
                <v-card-title>
                    <span>Add New Project</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="8" md="8">
                                <v-text-field v-model="newProject.title" label="Project Title*" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="newProject.description" label="Description" >
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small color="secondary">*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal lighten-2 white--text" text @click='close'>
                        Close
                    </v-btn>
                    <v-btn color="teal lighten-2 white--text" text @click='saveNewProject'>
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddProject',

  data () {
    return {
      dialog: false,
      newProject: {
        title: '',
        description: '',
        owner: '',
        completeDate: Date
      }
    }
  },
  methods: {
    close () {
      this.dialog = false
    },

    saveNewProject: async function () {
      try {
        const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/projects', {
          title: this.newProject.title,
          description: this.newProject.description
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        console.log(response)
        this.$store.commit('setNewCurrentProject', response.data)
      } catch (e) {
        alert(e)
      }
      this.$emit('board-update')
      this.dialog = false
    }
  }
}
</script>
