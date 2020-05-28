<template>
  <g id="nodes">
    <Node v-for="(node, i) in data" :key="i" :node-data="node" />
  </g>
</template>

<script>
import Node from '~/components/BaseNode.vue'

export default {
  components: {
    Node
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  },

  mounted() {
    this.$nextTick(function() {
      // console.log('nodes pups')
    })
  }
}
</script>
