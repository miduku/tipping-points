<template>
  <g class="link">
    <path stroke="white" stroke-width="2" fill="none" :d="d" />
  </g>
</template>

<script>
export default {
  props: {
    linkData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      d: ''
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.d = this.createPathD(this.linkData.source, this.linkData.target)
    })
  },

  methods: {
    createPathD(sourceId, targetId) {
      const sourceElement = this.getElement(sourceId)
      const targetElement = this.getElement(targetId)

      const sourceDegrees = sourceElement.dataset.degrees
      const targetDegrees = targetElement.dataset.degrees

      const SOURCE_BOUNDS = sourceElement.getBoundingClientRect()
      const TARGET_BOUNDS = targetElement.getBoundingClientRect()

      const sourceCoords = [SOURCE_BOUNDS.x, SOURCE_BOUNDS.y]
      const targetCoords = [TARGET_BOUNDS.x, TARGET_BOUNDS.y]

      const sourceHandle = this.changeHandleCoordinatesByDeg(
        sourceCoords,
        sourceDegrees
      )
      const targetHandle = this.changeHandleCoordinatesByDeg(
        targetCoords,
        targetDegrees
      )

      console.log('penis', sourceDegrees, targetDegrees)
      return `M ${sourceCoords.join()} C ${sourceHandle.join()} ${targetHandle.join()} ${targetCoords.join()}`
    },

    getElement(id) {
      const PARENT = this.$el.parentElement.parentElement
      // console.log(PARENT)
      // console.log(id)
      return PARENT.querySelector(`#${id} .node-child-node`)
    },

    changeHandleCoordinatesByDeg(origin = [0, 0], deg = 45, distance = 200) {
      const x = Math.round(
        Math.cos((deg * Math.PI) / 180) * distance + origin[0]
      )
      const y = Math.round(
        Math.sin((deg * Math.PI) / 180) * distance + origin[1]
      )

      return [x, y]
    }
  }
}
</script>
