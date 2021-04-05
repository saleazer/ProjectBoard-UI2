<template>
    <div>
        <v-card max-width='600px'>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>{{item.description}}</v-card-text>
        </v-card>
    </div>
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
