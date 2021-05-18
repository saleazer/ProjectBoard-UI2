<!--I need to use this in ProjectHome.  Add edit/delete/routing here instead  -->

<template>
  <v-card max-width='600px'>
    <v-card-title>{{item.title}}</v-card-title>
    <v-card-text>{{item.description}}</v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'ProjectCard',
  props: {
    item: {
      type: Object
    }
  }
}
</script>
