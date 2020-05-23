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
        :view-box.camel="`0 0 ${NODES.panSize[0]} ${NODES.panSize[1]}`"
        class="pan-element owner"
        :style="
          `
          width: ${NODES.panSize[0]}px;
          height: ${NODES.panSize[1]}px;
          `
        "
      >
        <Node v-for="(node, i) in NODES.data" :key="i" :node-data="node" />
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
import Node from '~/components/BaseNode.vue'

export default {
  components: {
    Node
  },

  data() {
    return {
      isPanning: false,
      isZooming: false,
      options: {
        // transformOrigin: { x: 0.5, y: 0.5 }
        minZoom: 0.1,
        maxZoom: 15
        // autocenter: true
      },
      panInstance: {
        transform: 'init'
      },
      NODES: {
        panSize: [4000, 2600],
        data: [
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
        ]
      }
    }
  },

  mounted() {
    // console.log(this.$refs)
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
      // console.log(OWNER, OWNER_PARENT_BOUNDS)
      // const OWNER_CHILDREN = OWNER.childNodes
      const PANZOOM = this.$refs.panZoom.$panZoomInstance

      console.log(OWNER.querySelector('#' + nodeId))
      const nodeElement = OWNER.querySelector('#' + nodeId)
      const nodeElementChildren = nodeElement.children

      let nodeElementCircle = ''

      for (const child of nodeElementChildren) {
        if (child.classList.contains('group-circle')) {
          for (const ch of child.children) {
            if (ch.classList.contains('node-circle')) {
              nodeElementCircle = ch
            }
          }
        }
      }
      console.log(
        'nodeElement',
        nodeElementCircle,
        nodeElementCircle.getBoundingClientRect()
      )

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

    changeZoomSettings() {
      this.options.minZoom = 0
      this.options.maxZoom = 10
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  position: relative;
  /* width: 100vw;
  height: 100vh; */
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
      background: greenyellow;
      left: 0%;
      top: 0%;
    }
  }
}

.has-transition {
  transition-duration: 0.25s;
}
</style>
