<template>
  <div app v-if="item != null">
    <v-dialog v-model="dialog" persistent max-width="900px">
      <template v-slot:activator="{ on, attrs }">
        <v-card outlined v-bind="attrs" v-on="on">
          <v-row wrap>
            <v-col cols='4'>
              <v-card-text >{{item.title}}</v-card-text>
            </v-col>
            <v-col cols='8'>
              <div class="right">
                <v-card-text >{{item.description}}</v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <v-card>
        <v-card-title>
            <span class="headline">Edit Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                  <v-text-field v-model="item.title" label="Item Title*" required color="secondary">
                  </v-text-field>
              </v-col>
              <v-col cols="12">
                  <v-textarea v-model="item.description" label="Description" color="secondary">
                  </v-textarea>
              </v-col>
              <v-col cols="4">
                  <v-select v-model="item.priority" :items="itemRank" hint="Item Priority"
                    persistent-hint single-line dense color="secondary">
                  </v-select>
              </v-col>
              <v-col cols="4">
                  <v-select v-model="item.effort" :items="itemRank" hint="Item Effort"
                    persistent-hint single-line dense color="secondary">
                  </v-select>
              </v-col>
              <v-col cols="4">
                <v-select v-model="item.state" :items="itemState" hint="Item State"
                    persistent-hint single-line dense color="secondary">
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <small color="secondary">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" outlined text @click='deleteBoardItem'>DELETE</v-btn>
            <v-spacer></v-spacer>
          <v-btn color="teal lighten-2 white--text" text @click="close">
            Close
          </v-btn>
          <v-btn color="teal lighten-2 white--text" text @click='saveItem'>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoardItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: false,
      itemRank: ['Low', 'Normal', 'High'],
      itemState: ['New', 'Active', 'Complete']
    }
  },

  methods: {
    saveItem: async function () {
      try {
        const response = await axios.patch('https://whispering-cliffs-53295.herokuapp.com/board-item/' + this.item._id, {
          title: this.item.title,
          description: this.item.description,
          state: this.item.state,
          priority: this.item.priority,
          effort: this.item.effort
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
        console.log(response)
        this.$emit('board-update')
        this.dialog = false
      } catch (e) {
        alert(e)
      }
    },
    deleteBoardItem: async function () {
      try {
        const response = await axios.delete('https://whispering-cliffs-53295.herokuapp.com/board-item/' + this.item._id)
        console.log(response)
        this.$emit('board-update')
      } catch (e) {
        alert(e)
      }
    },
    close: function () {
      this.dialog = false
      this.$emit('board-update')
    }
  }
}
</script>
<style>
.item.Low {
  border-left: 4px solid lightblue;
}
.item.Normal {
  border-left: 4px solid green;
}
.item.High {
  border-left: 4px solid red;
}
.titleSpacing {
  padding: 0px;
  margin-left: 16px;
}

.cardSizing {
  min-height: 60px;
}
</style>
