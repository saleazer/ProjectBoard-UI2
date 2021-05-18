<template>
  <div id='app' class='background'>
    <div class='work-area'>
      <v-divider></v-divider>
        <v-row align='center'>
            <h3 class='pa-4'>All Items</h3>
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
              <BoardItem @board-update='getAllUserItems' v-bind:item='item'/>
            </div>
          </draggable>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='5'>
          <h3>Active</h3>
          <draggable v-model='activeItems' group='new' @change='addActive' class='drag-column'>
            <div v-for='item in activeItems' :key='item._id' class='padding'>
              <BoardItem @board-update='getAllUserItems' v-bind:item='item'/>
            </div>
          </draggable>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='2'>
          <h3>Complete</h3>
          <draggable v-model='completeItems' group='new' @change='addComplete' class='drag-column'>
            <div v-for='item in completeItems' :key='item._id' class='padding'>
              <BoardItemSmall @board-update='getAllUserItems' v-bind:item='item'/>
            </div>
          </draggable>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BoardItem from '../components/item/BoardItem'
import BoardItemSmall from '../components/item/BoardItemSmall'
import itemServices from '../services/itemServices'

export default {
  name: 'Backlog',
  mixins: [itemServices],
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
  mounted () {
    this.getAllUserItems()
  }
}
</script>
