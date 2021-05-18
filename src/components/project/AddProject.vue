<template>
  <v-row>
    <v-dialog v-model='dialog' persistent max-width='900px'>
      <template v-slot:activator='{ on, attrs }'>
        <v-btn small v-bind='attrs' v-on='on'>New Project</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span>Add New Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols='12' sm='8' md='8'>
                <v-text-field v-model='project.title' label='Project Title*' required></v-text-field>
              </v-col>
              <v-col cols='12'>
                <v-textarea v-model='project.description' label='Description' v-on:keyup.enter='saveNewProject'></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small color='secondary'>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='teal lighten-2 white--text' text @click='close'>Close</v-btn>
          <v-btn color='teal lighten-2 white--text' text @click='saveProject'>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import projectServices from '../../services/projectServices'

export default {
  name: 'AddProject',
  mixins: [projectServices],
  data () {
    return {
      dialog: false,
      project: {
        title: '',
        description: '',
        owner: ''
      }
    }
  }
}
</script>
