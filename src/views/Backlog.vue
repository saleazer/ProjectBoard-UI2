<template>
  <div id='app' class='background'>
    <br>
    <div class='work-area'>
        <v-divider></v-divider>
            <h3 class='padding'>All Items</h3>
        <v-divider></v-divider>
        <br>
        <v-row>
        <v-col cols='5'>
          <h3>New</h3>
          <draggable v-model='newItems' group='new' @change='addNew' class='drag-column'>
            <div v-for='item in newItems' :key='item._id' class='padding'>
              <v-card>
                <BoardItem @board-update='getAllUserItems' v-bind:item='item'/>
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
                  <BoardItem @board-update='getAllUserItems' v-bind:item='item'/>
                </v-card>
              </div>
          </draggable>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='2'>
          <h3>Complete</h3>
          <draggable v-model='completeItems' group='new' @change='addComplete' class='drag-column'>
            <div v-for='item in completeItems' :key='item._id' class='padding'>
              <v-card>
                <BoardItemSmall @board-update='getAllUserItems' v-bind:item='item'/>
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
import BoardItem from '../components/BoardItem'
import BoardItemSmall from '../components/BoardItemSmall'

export default {
  name: 'Backlog',
  components: {
    draggable,
    BoardItem,
    BoardItemSmall
  },
  data () {
    return {
      newItems: [],
      activeItems: [],
      completeItems: []
    }
  },
  methods: {
    getAllUserItems: async function () {
      try {
        this.newItems = []
        this.activeItems = []
        this.completeItems = []
        const id = this.$store.getters.currentUserID
        const response = await axios.get('https://whispering-cliffs-53295.herokuapp.com/board-item/byUser/' + id, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        const data = Object.values(response.data)
        data.forEach(this.sortByStatus)
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
  },
  mounted () {
    this.getAllUserItems()
  }
}

</script>

<style scoped>
.drag-column {
  min-height: 50vh
}

</style>
