<template>
  <div id="content-main">
    <panZoom
      id="PANZOOM"
      ref="PANZOOM"
      :options="options"
      class="pan-zoom"
      @transform="onTransform"
    >
      <svg
        id="OWNER"
        :view-box.camel="`0 0 ${NODES.panSize[0]} ${NODES.panSize[1]}`"
        class="pan-element owner"
        :style="
          `
          width: ${NODES.panSize[0]}px;
          height: ${NODES.panSize[1]}px;
          `
        "
      >
        <defs>
          <marker
            id="link-arrow"
            markerWidth="5"
            markerHeight="9"
            refX="4"
            refY="4.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M1 1L4.5 4.5L1 8"
              stroke="black"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </marker>
        </defs>

        <TheNodes :data="NODES.nodes" @hook:mounted="isNodesMounted = true" />
        <TheLinks v-if="isNodesMounted" :data="LINKS" />
      </svg>
    </panZoom>

    <div class="dot"></div>

    <div class="buttons">
      <p>{{ panInstance.transform }}</p>
    </div>
  </div>
</template>

<script>
import TheNodes from '~/components/TheNodes.vue'
import TheLinks from '~/components/TheLinks.vue'

const getNodes = () =>
  import('~/assets/json/nodes.json').then((m) => m.default || m)
const getLinks = () =>
  import('~/assets/json/links.json').then((m) => m.default || m)

export default {
  components: {
    TheNodes,
    TheLinks
  },

  async asyncData({ req }) {
    const NODES = await getNodes()
    const LINKS = await getLinks()

    return { NODES, LINKS }
  },

  data() {
    return {
      isNodesMounted: false,
      isPanning: false,
      isZooming: false,
      options: {
        // transformOrigin: { x: 0.5, y: 0.5 },
        minZoom: 0.1,
        maxZoom: 15
        // autocenter: true
      },
      panInstance: {
        transform: 'init'
      }
    }
  },

  mounted() {
    this.$nextTick(function() {})
  },

  methods: {
    panTo(nodeId, newZoomLevel = 1) {
      const MAIN_PARENT = this.$root.$el.querySelector('#content-main')
      const OWNER = MAIN_PARENT.querySelector('#OWNER')
      const OWNER_PARENT_BOUNDS = OWNER.parentElement.getBoundingClientRect()
      const PANZOOM = this.$refs.PANZOOM.$panZoomInstance

      // TODO use vuex

      const nodeElement = OWNER.querySelector('#' + nodeId)
      const nodeElementCircle = nodeElement.querySelector('.node-circle')

      OWNER.classList.add('has-transition')
      PANZOOM.moveToCenterOfElement(nodeElementCircle, 0, 0)

      OWNER.ontransitionend = () => {
        OWNER.classList.remove('has-transition')

        PANZOOM.smoothZoomAbs(
          OWNER_PARENT_BOUNDS.width / 2,
          OWNER_PARENT_BOUNDS.height / 2,
          newZoomLevel
        )
      }
    },

    onTransform() {
      const pan = this.$refs.PANZOOM.$panZoomInstance
      const getTransform = pan.getTransform()
      console.log(this.$refs.PANZOOM)

      // console.log('panning')
      this.panInstance.transform = `
        x: ${getTransform.x},
        y: ${getTransform.y},
        scale: ${getTransform.scale}
      `
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  position: relative;
  display: block;
  background: pink;
}

.dot {
  position: absolute;
  width: 2px;
  height: 2px;
  background: red;
  left: 50%;
  top: 50%;
  z-index: 99999;
}

.buttons {
  position: fixed;
  background: yellow;
  top: 0;
  left: 0;
}

.pan-zoom {
  overflow: hidden;
  background: blueviolet;
  width: 100vw;
  height: 100vh;

  /deep/ .vue-pan-zoom-scene {
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    .pan-element {
      position: relative;
      background: #fff;
      left: 0%;
      top: 0%;
    }
  }
}

.has-transition {
  transition-duration: 0.25s;
}
</style>
