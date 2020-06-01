<template>
  <div id="content-main">
    <TheLinksImpact
      v-if="isMounted.theNodes && isMounted.theNavMain"
      :size="[window.width, window.height]"
    />

    <panZoom
      id="PANZOOM"
      ref="PANZOOM"
      class="pan-zoom"
      :options="options"
      @transform="onTransform"
    >
      <ThePanzoomSvg
        ref="OWNER"
        class="owner"
        :view-box.camel="
          `
          0
          0
          ${getNodesJson.panSize[0]}
          ${getNodesJson.panSize[1]}
          `
        "
        :style="
          `
          width: ${getNodesJson.panSize[0]}px;
          height: ${getNodesJson.panSize[1]}px;
          `
        "
      >
        <TheLinks
          v-if="isMounted.theNodes && isMounted.theNavMain"
          :data="getLinksJson"
        />

        <TheNodes :data="getNodesJson.nodes" />
      </ThePanzoomSvg>
    </panZoom>

    <div class="dot" />

    <!-- <div class="buttons">
      <p>{{ panInstance.transform }}</p>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TheLinksImpact from '~/components/TheLinksImpact.vue'
import ThePanzoomSvg from '~/components/ThePanzoomSvg.vue'
import TheNodes from '~/components/TheNodes.vue'
import TheLinks from '~/components/TheLinks.vue'

import getNodesJson from '~/assets/json/nodes.json'
import getLinksJson from '~/assets/json/links.json'

export default {
  components: {
    TheLinksImpact,
    ThePanzoomSvg,
    TheNodes,
    TheLinks
  },

  asyncData({ params }) {
    return { getNodesJson, getLinksJson }
  },

  data() {
    return {
      isPanning: false,
      isZooming: false,
      options: {
        // transformOrigin: { x: 0.5, y: 0.5 },
        minZoom: 0.5,
        maxZoom: 2
        // autocenter: true
      },
      panInstance: {
        transform: ''
      }
    }
  },

  computed: {
    ...mapState({
      timeStamp: (state) => state.timeStamp,
      panToNodeId: (state) => state.panToNodeId,
      isMounted: (state) => state.isMounted,
      window: (state) => state.window
    })
  },

  watch: {
    timeStamp(value, oldValue) {
      if (value !== oldValue) {
        this.panTo(this.panToNodeId)
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted INDEX')
    })
  },

  methods: {
    panTo(nodeId, newZoomLevel = 1) {
      const OWNER = this.$refs.OWNER
      const PANZOOM = this.$refs.PANZOOM.$panZoomInstance
      const OWNER_PARENT_BOUNDS = OWNER.parentElement.getBoundingClientRect()

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
      // Delete this on production
      const pan = this.$refs.PANZOOM.$panZoomInstance
      const getTransform = pan.getTransform()

      this.$store.commit('GET_PANTOOM_COORDS', [
        getTransform.x,
        getTransform.y,
        getTransform.scale
      ])

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
  /**/
  position: absolute;
  width: 2px;
  height: 2px;
  background: red;
  left: 50%;
  top: 50%;
  z-index: 99999;
}

.buttons {
  /**/
  position: fixed;
  background: yellow;
  top: 0;
  left: 0;
}

.pan-zoom {
  overflow: hidden;
  background: transparent;
  width: 100vw;
  height: 100vh;

  /deep/ .vue-pan-zoom-scene {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
}

.has-transition {
  transition-duration: 0.25s;
}
</style>
