<template>
  <v-card>
    <div app v-if='item != null'>
      <v-dialog v-model='dialog' persistent max-width='900px'>
        <template v-slot:activator='{ on, attrs }'>
          <v-card outlined v-bind='attrs' v-on='on'>
            <v-row wrap>
              <v-col>
                <v-card-text >{{item.title}}</v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </template>
        <v-card>
          <v-card-title>
              <span class='headline'>Edit Item</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols='12' sm='8' md='8'>
                    <v-text-field v-model='item.title' label='Item Title*' required color='secondary'></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols='12'>
                    <v-textarea v-model='item.description' label='Description' color='secondary'></v-textarea>
                </v-col>
                <v-col cols='4'>
                    <v-select v-model='item.priority' :items='itemRank' hint='Item Priority' persistent-hint single-line dense color='secondary'>
                    </v-select>
                </v-col>
                <v-col cols='4'>
                    <v-select v-model='item.effort' :items='itemRank' hint='Item Effort' persistent-hint single-line dense color='secondary'>
                    </v-select>
                </v-col>
                <v-col cols='4'>
                  <v-select v-model='item.state' :items='itemState' hint='Item State' persistent-hint single-line dense color='secondary'>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
            <small color='secondary'>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color='error' text @click='deleteBoardItem'>DELETE</v-btn>
              <v-spacer></v-spacer>
            <v-btn color='teal lighten-2 white--text' text @click='close'>CLOSE</v-btn>
            <v-btn color='teal lighten-2 white--text' text @click='saveItemEdit'>SAVE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import itemServices from '../../services/itemServices'

export default {
  name: 'BoardItemSmall',
  mixins: [itemServices],
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
