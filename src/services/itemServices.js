import axios from 'axios'

export default {
  data () {
    return {
      itemRank: ['Low', 'Normal', 'High'],
      itemState: ['New', 'Active', 'Complete']
    }
  },
  methods: {
    close: function () {
      this.$emit('board-update')
      this.dialog = false
    },
    saveItem: async function () {
      if (this.item.title === '' || null || undefined) {
        alert('Item Title is required')
      } else {
        try {
          const parentID = this.$store.getters.currentProjectId
          await axios.post('https://whispering-cliffs-53295.herokuapp.com/board-item', {
            title: this.item.title,
            description: this.item.description,
            state: this.item.state,
            priority: this.item.priority,
            effort: this.item.effort,
            parentID: parentID
          }, {
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.currentToken
            }
          })
          this.item = {}
          this.close()
        } catch (e) {
          console.log(e)
        }
      }
    },
    deleteBoardItem: async function () {
      try {
        await axios.delete('https://whispering-cliffs-53295.herokuapp.com/board-item/' + this.item._id)
        this.$emit('board-update')
      } catch (e) {
        alert(e)
      }
    },
    saveItemEdit: async function () {
      try {
        await axios.patch('https://whispering-cliffs-53295.herokuapp.com/board-item/' + this.item._id, {
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
        this.close()
      } catch (e) {
        alert(e)
      }
    },

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
        await axios.patch('https://whispering-cliffs-53295.herokuapp.com/board-item/' + item._id, {
          state: item.state
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.currentToken
          }
        })
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
