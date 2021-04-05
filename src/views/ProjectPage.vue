<template>
    <div>
        <title>{{this.$store.getters.currentProject.title}}</title>

    </div>
</template>

<script>

export default {
  name: 'ProjectPage',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      currentProject: {}
    }
  },
  computed: {
  },
  methods: {
    setCurrentProject: function () {
      if (this.$store.getters.currentProjectId !== this.$route.params.id) {
        this.$store.commit('setCurrentProject', this.$route.params.id)
      }
    }
  },
  mounted () {
    this.setCurrentProject()
  }
}
</script>
