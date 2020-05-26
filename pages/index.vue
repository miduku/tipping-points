<template>
  <div class="cont">
    <panZoom
      ref="panZoom"
      :options="options"
      class="pan-zoom"
      @transform="onTransform"
    >
      <svg
        ref="OWNER"
        :view-box.camel="`0 0 ${DATA.panSize[0]} ${DATA.panSize[1]}`"
        class="pan-element owner"
        :style="
          `
          width: ${DATA.panSize[0]}px;
          height: ${DATA.panSize[1]}px;
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

        <TheNodes :data="DATA.nodes" @hook:mounted="isNodesMounted = true" />
        <TheLinks v-if="isNodesMounted" :data="LINKS" />
      </svg>
    </panZoom>

    <div class="dot"></div>

    <div class="buttons">
      <button @click.prevent="panTo('AMZN')">amazon</button>
      <button @click.prevent="panTo('AMOC')">atlantic</button>
      <br />
      <p>{{ panInstance.transform }}</p>
    </div>
  </div>
</template>

<script>
import TheNodes from '~/components/TheNodes.vue'
import TheLinks from '~/components/TheLinks.vue'

const getLinks = () =>
  import('~/assets/json/links.json').then((m) => m.default || m)

export default {
  components: {
    TheNodes,
    TheLinks
  },

  async asyncData({ req }) {
    const LINKS = await getLinks()

    return { LINKS }
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
      },
      DATA: {
        panSize: [4000, 2600],
        nodes: [
          {
            id: 'AMZN',
            title: 'Amazon rainforest dieback',
            position: [1070, 1230],
            children: {
              input: [
                { title: 'Increase in wildfires' },
                { title: 'Deforestation' },
                { title: 'Less transpiration of moisture from plant leaves' }
              ],
              output: [
                { title: 'Dying or dead Amazon Rainforest' },
                { title: 'Loss of of an important carbon sink' },
                { title: 'Shift of the climate to a drier state' },
                { title: 'Less moisture is returned to the atmosphere ' },
                { title: 'Less fertile tropical soil' }
              ]
            }
          },
          {
            id: 'AMOC',
            title: 'Atlantic Meridional Overturning Circulation Breakdown',
            position: [1495, 720],
            children: {
              input: [{ title: 'Salinity decreases' }],
              output: [
                { title: 'Circulation slowing down' },
                { title: 'Unable to pull warm, salty water from the south' },
                { title: 'Less evaporation from the North Atlantic' },
                { title: 'Decreased rainfall' }
              ]
            }
          }
        ],
        links: [
          { source: 'AMOC-input-0', target: 'AMZN-input-0' },
          { source: 'AMZN-output-2', target: 'AMZN-input-0' },
          { source: 'AMOC-output-0', target: 'AMZN-output-0' }
        ]
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.isRootMounted = true
    })
  },

  methods: {
    onTransform() {
      const pan = this.$refs.panZoom.$panZoomInstance
      const getTransform = pan.getTransform()

      // console.log('panning')
      this.panInstance.transform = `
        x: ${getTransform.x},
        y: ${getTransform.y},
        scale: ${getTransform.scale}
      `
    },

    panTo(nodeId, newZoomLevel = 1) {
      const OWNER = this.$refs.OWNER
      const OWNER_PARENT_BOUNDS = OWNER.parentElement.getBoundingClientRect()
      const PANZOOM = this.$refs.panZoom.$panZoomInstance

      const nodeElement = OWNER.querySelector('#' + nodeId)
      const nodeElementCircle = nodeElement.querySelector('.node-circle')

      // console.log(
      //   'nodeElement',
      //   nodeElementCircle,
      //   nodeElementCircle.getBoundingClientRect()
      // )

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
