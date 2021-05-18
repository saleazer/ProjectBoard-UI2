<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <v-row justify='space-between'>
        <v-col md='6' sm= '8' xs='12'>
          <v-card class='padding'> <!-- *I need to re-use ProjectCard component here instead* -->
            <v-row dense>
              <v-col>
                <v-card-title>{{this.currentProject.title}}</v-card-title>
              </v-col>
              <v-col cols='1' >
                <EditProject v-bind:project='currentProject' @board-update='setCurrentProject'/>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols='11'>
                <v-card-text>{{this.currentProject.description}}</v-card-text>
              </v-col>
              <v-col cols='1' align-self='end'>
                <v-dialog v-model="dialog" persistent max-width="600">
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                      <template v-slot:activator='{ on: tooltip }'>
                        <v-icon color='red-darken-2' v-bind="attrs" v-on="{ ...tooltip, ...menu}">delete</v-icon>
                      </template>
                      <span>Delete Project</span>
                    </v-tooltip>
                  </template>
                    <v-card>
                      <v-card-title class="headline"> Delete {{this.$store.getters.currentProject.title}} Project?</v-card-title>
                      <v-card-text>WARNING! Deleting this project will delete all associated board items. Do you wish to continue?</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog = false">
                          Cancel
                        </v-btn>
                        <DeleteProject/>
                      </v-card-actions>
                    </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align-self='end'>
          <AddItem @board-update='getProjectItems'/>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <br>
      <v-divider></v-divider>
        <v-row>
          <h3 class='pa-4'>Board Items</h3>
          <v-spacer></v-spacer>
          <p class='pt-4 pr-6'><i>Drag items to change status</i></p>
        </v-row>
      <v-divider></v-divider>
      <br>
      <v-row>
        <v-col cols='5'>
          <h3>New</h3>
          <draggable v-model='newItems' group='new' @change='addNew' class='drag-column'>
            <div v-for='item in newItems' :key='item._id' class='padding'>
              <v-card>
                <BoardItem @board-update='getProjectItems' v-bind:item='item'/>
              </v-card>
            </div>
          </draggable>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='5'>
          <h3>Active</h3>
          <draggable v-model='activeItems' group='new' @change='addActive' class='drag-column'>
            <div v-for='item in activeItems' :key='item._id' class='padding'>
              <v-card>
                <BoardItem @board-update='getProjectItems' v-bind:item='item'/>
              </v-card>
            </div>
          </draggable>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='2' class='hidden-sm-and-down'>
          <h3>Complete</h3>
          <draggable v-model='completeItems' group='new' @change='addComplete' class='drag-column'>
            <div v-for='item in completeItems' :key='item._id' class='padding'>
              <v-card>
                <BoardItemSmall @board-update='getProjectItems' v-bind:item='item'/>
              </v-card>
            </div>
          </draggable>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AddItem from '../components/item/AddItem'
import BoardItem from '../components/item/BoardItem'
import BoardItemSmall from '../components/item/BoardItemSmall'
import DeleteProject from '../components/project/DeleteProject'
import EditProject from '../components/project/EditProject'
import itemServices from '../services/itemServices'
import projectServices from '../services/projectServices'

export default {
  name: 'ProjectHome',
  mixins: [itemServices, projectServices],
  components: {
    AddItem,
    BoardItem,
    BoardItemSmall,
    DeleteProject,
    EditProject,
    draggable
  },
  data () {
    return {
      newItems: [],
      activeItems: [],
      completeItems: [],
      emptyProject: false,
      dialog: false,
      currentProjectEdit: this.currentProject
    }
  },
  computed: {
    currentProject () {
      return this.$store.getters.currentProject
    }
  },
  beforeMount () {
    this.setCurrentProject()
  },
  mounted () {
    this.getProjectItems()
  }
}
</script>
