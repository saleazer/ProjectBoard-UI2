<template>
  <v-dialog v-model='dialog' persistent max-width='900px'>
    <template v-slot:activator='{ on, attrs }'>
      <v-btn x-large v-bind='attrs' v-on='on' outlined color='teal'>Create New Board Item</v-btn>
    </template>
      <v-card>
        <v-card-title>
          <span class='headline'>Add Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols='8'>
                <v-text-field v-model='item.title' label='Item Title' required color='secondary'></v-text-field>
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
          <v-spacer></v-spacer>
          <v-btn color='teal lighten-2 white--text' text @click='close'>Close</v-btn>
          <v-btn color='teal lighten-2 white--text' text @click='saveItem'>Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import itemServices from '../../services/itemServices'

export default {
  name: 'AddItem',
  mixins: [itemServices],
  data () {
    return {
      dialog: false,
      item: {
        title: '',
        description: '',
        state: '',
        priority: '',
        effort: ''
      }
    }
  }
}
</script>
