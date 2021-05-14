<template>
  <v-dialog v-model="dialog" persistent max-width="900px">
      <template v-slot:activator="{ on, attrs }">
          <v-btn x-large v-bind="attrs" v-on="on" outlined color='teal'>
          Create New Board Item
          </v-btn>
      </template>
      <v-card>
        <v-card-title>
            <span class="headline">Add Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols='8'>
                  <v-text-field v-model="newItem.title" label="Item Title*" required color="secondary">
                  </v-text-field>
              </v-col>
              <v-col cols='4'>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                  <v-textarea v-model="newItem.description" label="Description" color="secondary">
                  </v-textarea>
              </v-col>
              <v-col cols="4">
                  <v-select v-model="newItem.priority" :items="itemRank" hint="Item Priority"
                    persistent-hint single-line dense color="secondary">
                  </v-select>
              </v-col>
              <v-col cols="4">
                  <v-select v-model="newItem.effort" :items="itemRank" hint="Item Effort"
                    persistent-hint single-line dense color="secondary">
                  </v-select>
              </v-col>
              <v-col cols="4">
                <v-select v-model="newItem.state" :items="itemState" hint="Item State"
                    persistent-hint single-line dense color="secondary">
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <small color="secondary">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn color="teal lighten-2 white--text" text @click="close">
            Close
          </v-btn>
          <v-btn color="teal lighten-2 white--text" text @click='saveNewItem'>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddItem',
  computed: {
  },
  data () {
    return {
      dialog: false,
      newItem: {
        title: '',
        description: '',
        state: '',
        priority: '',
        effort: '',
        dueDate: ''
      },
      itemRank: ['Low', 'Normal', 'High'],
      itemState: ['New', 'Active', 'Complete']
    }
  },
  methods: {
    close () {
      this.$emit('board-update')
      this.dialog = false
    },
    saveNewItem: async function () {
      try {
        const parentID = this.$store.getters.currentProjectId
        const response = await axios.post('https://whispering-cliffs-53295.herokuapp.com/board-item', {
          title: this.newItem.title,
          description: this.newItem.description,
          state: 'New',
          priority: this.newItem.priority,
          effort: this.newItem.effort,
          parentID: parentID,
          owner: this.$store.getters.currentUser,
          dueDate: this.date
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        console.log(response)
        this.newItem = {}
        this.$emit('board-update')
        this.dialog = false
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
