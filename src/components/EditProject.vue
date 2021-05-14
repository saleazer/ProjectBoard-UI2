<template>
  <div>
    <v-row >
        <v-dialog v-model="dialog" persistent max-width="900px">
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator='{ on: tooltip }'>
                  <v-icon class="ma-4" small v-bind="attrs" v-on="{...tooltip, ...menu}">edit</v-icon>
                </template>
              <span>Edit Project</span>
              </v-tooltip>
            </template>
        <v-card>
            <v-card-title>
                <span>Edit Project</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="8" md="8">
                            <v-text-field v-model="project.title" label="Project Title*" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="project.description" label="Description" >
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <small color="secondary">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal lighten-2 white--text" outlined @click='close'>
                    Close
                </v-btn>
                <v-btn color="teal lighten-2 white--text" outlined @click='saveProject'>
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
  name: 'EditProject',

  data () {
    return {
      dialog: false
    }
  },
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  methods: {
    close () {
      this.dialog = false
    },

    saveProject: async function () {
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
        alert(e)
      }
      this.$emit('board-update')
      this.dialog = false
    }
  }
}
</script>
