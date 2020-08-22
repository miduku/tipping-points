<template>
  <g
    class="link"
    :class="[
      linkData.lock ? `link-lock-${linkData.lock}` : '',
      `link-group-${linkData.group || linkData.source}`,
      `link-node-${linkData.node || linkData.target}`
    ]"
  >
    <path
      stroke-linecap="round"
      fill="none"
      :d="
        `
        M
        ${lockCoordsifTrue(d_SourceCoords, 'source')}

        C
        ${lockCoordsifTrue(d_SourceCoordsHandle, 'source')}

        ${lockCoordsifTrue(d_TargetCoordsHandle, 'target')}

        ${lockCoordsifTrue(d_TargetCoords, 'target')}
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

    // strokeWidth: {
    //   type: Number,
    //   default: 1.25
    // },

    differenceCoords: {
      type: Array,
      default: () => [0, 0, 1]
    },

    invertAngle: {
      type: Boolean,
      default: false
    },

    distance: {
      type: Number,
      default: 400
    }
  },

  data() {
    return {
      d_SourceCoords: [0, 0],
      d_SourceCoordsHandle: [0, 0],
      d_TargetCoordsHandle: [0, 0],
      d_TargetCoords: [0, 0],
      group: this.linkData.group ? this.linkData.group : undefined
    }
  },

  mounted() {
    this.$nextTick(function() {
      // Init creating paths
      this.d = this.createPathD(
        this.linkData.source,
        this.linkData.target,
        this.invertAngle,
        this.distance
      )
    })
  },

  methods: {
    lockCoordsifTrue(coords, checkForLock) {
      if (
        this.linkData.lock !== undefined &&
        checkForLock === this.linkData.lock
      ) {
        return coords.join()
      }

      return `
        ${this.differenceCoords[2] * coords[0] + this.differenceCoords[0]},
        ${this.differenceCoords[2] * coords[1] + this.differenceCoords[1]}
      `
    },

    createPathD(sourceId, targetId, invertAngle, distance) {
      const INVERT_ANGLE = invertAngle ? 180 : 0

      const SOURCE_ELEMENT = this.getElementById(sourceId)
      const SOURCE_BOUNDS = SOURCE_ELEMENT.getBoundingClientRect()

      const TARGET_ELEMENT = this.getElementById(targetId)
      const TARGET_BOUNDS = TARGET_ELEMENT.getBoundingClientRect()

      // Get angle in deg
      const sourceDegrees = SOURCE_ELEMENT.dataset.degrees
        ? SOURCE_ELEMENT.dataset.degrees
        : 360
      const targetDegrees = TARGET_ELEMENT.dataset.degrees
        ? TARGET_ELEMENT.dataset.degrees
        : 360

      // Get center of element
      const sourceCoordsCenter = [
        SOURCE_BOUNDS.x + SOURCE_BOUNDS.width / 2,
        SOURCE_BOUNDS.y + SOURCE_BOUNDS.height / 2
      ]
      const targetCoordsCenter = [
        TARGET_BOUNDS.x + TARGET_BOUNDS.width / 2,
        TARGET_BOUNDS.y + TARGET_BOUNDS.height / 2
      ]

      // Move the point of the path outside of the element
      const sourceCoordsMovedFromCenter = this.changeCoordinatesByDegreeAndDistance(
        sourceCoordsCenter,
        sourceDegrees - INVERT_ANGLE + 15,
        this.linkData.lock === 'source' ? 26 : 10
      )
      const targetCoordsMovedFromCenter = this.changeCoordinatesByDegreeAndDistance(
        targetCoordsCenter,
        targetDegrees - INVERT_ANGLE - 15,
        this.linkData.lock === 'target' ? 26 : 10
      )

      // Move bezier handles for the curve
      const sourceCoordsHandle = this.changeCoordinatesByDegreeAndDistance(
        sourceCoordsCenter,
        sourceDegrees - INVERT_ANGLE,
        distance
      )
      const targetCoordsHandle = this.changeCoordinatesByDegreeAndDistance(
        targetCoordsCenter,
        targetDegrees - INVERT_ANGLE,
        distance
      )

      this.d_SourceCoords = [
        sourceCoordsMovedFromCenter[0],
        sourceCoordsMovedFromCenter[1]
      ]
      this.d_SourceCoordsHandle = [sourceCoordsHandle[0], sourceCoordsHandle[1]]
      this.d_TargetCoordsHandle = [targetCoordsHandle[0], targetCoordsHandle[1]]
      this.d_TargetCoords = [
        targetCoordsMovedFromCenter[0],
        targetCoordsMovedFromCenter[1]
      ]
    },

    getElementById(id) {
      const PARENT = this.$root.$el

      return PARENT.querySelector(`#${id} .vuex-pan-to`)
    },

    changeCoordinatesByDegreeAndDistance(origin = [0, 0], deg = 45, distance) {
      const MATH = deg === 0 ? 0 : (deg * Math.PI) / 180

      const x = Math.round(Math.cos(MATH) * distance + origin[0])
      const y = Math.round(Math.sin(MATH) * distance + origin[1])

      return [x, y]
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  &.is-highlighted {
    opacity: 0.75;
    transition: opacity 0.5s $easeOutQuint;

    path {
      stroke: $red;
      transition: stroke 0.5s $easeOutQuint;
      marker-end: url(#link-arrow-red);
      animation: impact-dash-animation 1s linear reverse infinite;
      stroke-dasharray: 4 10;
    }
  }

  &.links {
    path {
      stroke: $dark-grey;
      animation: normal-dash-animation 1s linear reverse infinite;
      stroke-dasharray: 14 2;
      opacity: 0.25;
    }
  }

  &.links-impact.link-lock-source,
  &.links-impact.link-lock-target {
    path {
      stroke: $red;
      marker-end: url(#link-arrow-red);
      animation: impact-dash-animation 1s linear reverse infinite;
      stroke-dasharray: 4 10;
    }
  }

  &.links-impact {
    opacity: 0.075;
    transition: opacity 0.5s $easeOutQuint;
  }

  path {
    transition: d 0.25s $easeOutQuint, opacity 0.5s $easeOutQuint,
      stroke-width 0.5s $easeOutQuint;
    stroke: $dark-grey;
    marker-end: url(#link-arrow);
    stroke-width: 1.25px;
  }
}

@keyframes normal-dash-animation {
  to {
    stroke-dashoffset: 16;
  }
}

@keyframes impact-dash-animation {
  to {
    stroke-dashoffset: 14;
  }
}
</style>
