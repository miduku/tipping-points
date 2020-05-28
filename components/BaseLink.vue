<template>
  <g class="link">
    <path
      :stroke-width="strokeWidth"
      :stroke-dasharray="isDashed ? '2 4' : ''"
      stroke="#000"
      stroke-linecap="round"
      fill="none"
      marker-end="url(#link-arrow)"
      :d="
        `
        M
        ${dSourceCoords[0]},
        ${dSourceCoords[1]}

        C
        ${dSourceCoordsHandle[0]},
        ${dSourceCoordsHandle[1]}

        ${dTargetCoordsHandle[0] - differenceCoords[0]},
        ${dTargetCoordsHandle[1] - differenceCoords[1]}

        ${dTargetCoords[0] - differenceCoords[1]},
        ${dTargetCoords[1] - differenceCoords[1]}
        `
      "
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
    },

    differenceCoords: {
      type: Array,
      default: () => [0, 0, 1]
    }
  },

  data() {
    return {
      dSourceCoords: [0, 0],
      dSourceCoordsHandle: [0, 0],
      dTargetCoordsHandle: [0, 0],
      dTargetCoords: [0, 0]
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log(this.differenceCoords)
      this.d = this.createPathD(this.linkData.source, this.linkData.target)
    })
  },

  methods: {
    createPathD(sourceId, targetId, parent) {
      const sourceElement = this.getElement(sourceId, parent)
      const targetElement = this.getElement(targetId, parent)

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

      const sourceCoordsMovedFromCenter = this.changeCoordinatesByDegreeAndDistance(
        sourceCoordsCenter,
        sourceDegrees,
        9
      )
      const targetCoordsMovedFromCenter = this.changeCoordinatesByDegreeAndDistance(
        targetCoordsCenter,
        targetDegrees,
        9
      )

      // move bezier handles
      const sourceCoordsHandle = this.changeCoordinatesByDegreeAndDistance(
        sourceCoordsCenter,
        sourceDegrees
      )
      const targetCoordsHandle = this.changeCoordinatesByDegreeAndDistance(
        targetCoordsCenter,
        targetDegrees
      )

      this.dSourceCoords = [
        sourceCoordsMovedFromCenter[0],
        sourceCoordsMovedFromCenter[1]
      ]
      this.dSourceCoordsHandle = [sourceCoordsHandle[0], sourceCoordsHandle[1]]
      this.dTargetCoordsHandle = [targetCoordsHandle[0], targetCoordsHandle[1]]
      this.dTargetCoords = [
        targetCoordsMovedFromCenter[0],
        targetCoordsMovedFromCenter[1]
      ]
    },

    getElement(id, parent = this.$root.$el) {
      return parent.querySelector(`#${id} .node-child-node`)
    },

    changeCoordinatesByDegreeAndDistance(
      origin = [0, 0],
      deg = 45,
      distance = 200
    ) {
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
