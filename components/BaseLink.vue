<template>
  <g class="link">
    <path
      :stroke-width="strokeWidth"
      :stroke-dasharray="isDashed ? '2 4' : ''"
      stroke="#000"
      stroke-linecap="round"
      fill="none"
      marker-end="url(#link-arrow)"
      :d="d"
    />
  </g>
</template>

<script>
export default {
  props: {
    linkData: {
      type: Object,
      required: true
    },

    strokeWidth: {
      type: Number,
      default: 1
    },

    isDashed: {
      type: Boolean,
      default: false
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

      const sourceCoordsCenter = [
        SOURCE_BOUNDS.x + SOURCE_BOUNDS.width / 2,
        SOURCE_BOUNDS.y + SOURCE_BOUNDS.height / 2
      ]
      const targetCoordsCenter = [
        TARGET_BOUNDS.x + TARGET_BOUNDS.width / 2,
        TARGET_BOUNDS.y + TARGET_BOUNDS.height / 2
      ]

      const sourceCoordsMovedFromCenter = this.changeCoordinatesByDeg(
        sourceCoordsCenter,
        sourceDegrees,
        9
      )
      const targetCoordsMovedFromCenter = this.changeCoordinatesByDeg(
        targetCoordsCenter,
        targetDegrees,
        9
      )

      // move bezier handles
      const sourceHandle = this.changeCoordinatesByDeg(
        sourceCoordsCenter,
        sourceDegrees
      )
      const targetHandle = this.changeCoordinatesByDeg(
        targetCoordsCenter,
        targetDegrees
      )

      return `
        M ${sourceCoordsMovedFromCenter.join()}
        C ${sourceHandle.join()}
        ${targetHandle.join()}
        ${targetCoordsMovedFromCenter.join()}
      `
    },

    getElement(id) {
      const PARENT = this.$el.parentElement.parentElement

      return PARENT.querySelector(`#${id} .node-child-node`)
    },

    changeCoordinatesByDeg(origin = [0, 0], deg = 45, distance = 200) {
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
