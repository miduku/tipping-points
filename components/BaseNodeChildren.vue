<template>
  <!-- e.g. #AMOC-output -->
  <g :id="`${data.parentId}-${direction}s`" class="node-children">
    <!-- e.g. #AMOC-output-0 -->
    <g
      v-for="(childData, i) in data.childrenData[direction]"
      :id="`${data.parentId}-${direction}-${i}`"
      :key="i"
      class="rotate"
      :style="
        `
        transform-origin: ${data.position[0]}px ${data.position[1]}px;
        transform: rotate(${setNodeChildrenDegrees(
          i,
          data.childrenData[direction].length
        )}deg);
        `
      "
    >
      <NodeChildNode
        :data="{
          i,
          childData,
          direction,
          position: data.position,
          margin: data.size,
          degrees: setNodeChildrenDegrees(
            i,
            data.childrenData[direction].length
          )
        }"
      />
    </g>
  </g>
</template>

<script>
import NodeChildNode from '~/components/BaseNodeChildNode.vue'

export default {
  components: {
    NodeChildNode
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    direction: {
      type: String,
      required: true,
      default: 'output'
    }
  },

  mounted() {
    // console.log(this.data)
    this.$nextTick(function() {
      // console.log('BaseNodeChildren pups')
    })
  },

  methods: {
    setNodeChildrenDegrees(idx, amount) {
      const n = amount === 1 ? 1 : amount - 1

      if (this.direction === 'input') {
        return (-90 / n) * idx + 225
      }

      return (90 / n) * idx - 45
    }
  }
}
</script>
