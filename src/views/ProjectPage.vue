<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <v-row justify='space-between'>
        <v-col md='6' sm= '8' xs='12'>
          <v-card class='padding'>
            <v-row dense>
              <v-col>
                <v-card-title>{{this.currentProject.title}}</v-card-title>
              </v-col>
              <v-col cols='1' >
                <EditProject v-bind:project='currentProject' @board-update='getProjectItems'/>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols='11'>
                <v-card-text>
                  {{this.currentProject.description}}
                </v-card-text>
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
                      <v-card-title class="headline">
                        Delete {{this.$store.getters.currentProject.title}} Project?
                      </v-card-title>
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
      <h3 class='padding'>Board Items</h3>
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
import axios from 'axios'
import draggable from 'vuedraggable'
import AddItem from '../components/AddItem'
import BoardItem from '../components/BoardItem'
import BoardItemSmall from '../components/BoardItemSmall'
import DeleteProject from '../components/DeleteProject'
import EditProject from '../components/EditProject'

export default {
  name: 'ProjectPage',
  components: {
    AddItem,
    BoardItem,
    BoardItemSmall,
    DeleteProject,
    EditProject,
    draggable
  },
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      newItems: [],
      activeItems: [],
      completeItems: [],
      emptyProject: false,
      dialog: false
    }
  },
  computed: {
    currentProject () {
      return this.$store.getters.currentProject
    }

  },
  methods: {
    setCurrentProject: function () {
      this.$store.commit('setCurrentProject', this.$route.params.id)
    },
    getProjectItems: async function () {
      try {
        this.newItems = []
        this.activeItems = []
        this.completeItems = []
        const parentID = this.$store.getters.currentProjectId
        const response = await axios.get('https://whispering-cliffs-53295.herokuapp.com/board-item/byParent/' + parentID, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        if (response.data == null) {
          this.emptyProject = true
        } else {
          const data = Object.values(response.data)
          data.forEach(this.sortByStatus)
        }
      } catch (e) {
        console.log(e)
      }
    },
    sortByStatus: function (item) {
      if (item.state === 'New') {
        this.newItems.push(item)
      } else if (item.state === 'Active') {
        this.activeItems.push(item)
      } else if (item.state === 'Complete') {
        this.completeItems.push(item)
      }
    },
    itemMoved: function (evt, state) {
      if (evt.added !== undefined) {
        evt.added.element.state = state
        this.saveBoardItem(evt.added.element)
      }
    },
    addNew: function (evt) {
      this.itemMoved(evt, 'New')
    },
    addActive: function (evt) {
      this.itemMoved(evt, 'Active')
    },
    addComplete: function (evt) {
      this.itemMoved(evt, 'Complete')
    },
    saveBoardItem: async function (item) {
      try {
        const response = await axios.patch('https://whispering-cliffs-53295.herokuapp.com/board-item/' + item._id, {
          state: item.state
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        console.log(response)
      } catch (error) {
        console.log(error.response)
      }
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

<style scoped>

.project-page {
    margin-top: 20px;
    margin-left: 30px;
}

.drag-column {
  min-height: 30vh
}

.project-box {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}
</style>
