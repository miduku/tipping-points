<template>
  <div
    id="content-main-wrapper"
    :class="isSidebarOpen ? 'is-sidebar-open' : ''"
  >
    <div id="content-main" ref="CONTENTMAIN" v-resize="getviewSize">
      <TheLinksImpact
        v-if="isMounted.theNodes && isMounted.theNavMain"
        :size="[viewSize.width, viewSize.height]"
      />

      <client-only>
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
      </client-only>

      <!-- <div class="dot" /> -->

      <div class="buttons">
        <p>{{ panInstance.transform }}</p>
      </div>
    </div>

    <TheSidebar id="content-sidebar" />
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'

import { mapState } from 'vuex'

import TheLinksImpact from '~/components/TheLinksImpact.vue'
import ThePanzoomSvg from '~/components/ThePanzoomSvg.vue'
import TheNodes from '~/components/TheNodes.vue'
import TheLinks from '~/components/TheLinks.vue'
import TheSidebar from '~/components/TheSidebar.vue'

import getNodesJson from '~/assets/json/nodes.json'
import getLinksJson from '~/assets/json/links.json'

export default {
  components: {
    TheSidebar,
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
        minZoom: 0.4,
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
      viewSize: (state) => state.viewSize,
      isSidebarOpen: (state) => state.sidebar.isOpen
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
      this.getviewSize()
    })
  },

  methods: {
    panTo(nodeId, newZoomLevel = 1) {
      const OWNER = this.$refs.OWNER.$el
      const PANZOOM = this.$refs.PANZOOM.$panZoomInstance
      const OWNER_PARENT_BOUNDS = OWNER.parentElement.getBoundingClientRect()

      const nodeElement = OWNER.querySelector('#' + nodeId)
      const nodeElementCircle = nodeElement.querySelector('.node-circle')

      OWNER.classList.add('has-transition')
      PANZOOM.moveToCenterOfElement(nodeElementCircle, 0, 0)

      setTimeout(() => {
        OWNER.classList.remove('has-transition')

        PANZOOM.smoothZoomAbs(
          OWNER_PARENT_BOUNDS.width / 2,
          OWNER_PARENT_BOUNDS.height / 2,
          newZoomLevel
        )
      }, 250)
    },

    onTransform: _throttle(function() {
      console.log('onTransform')
      const pan = this.$refs.PANZOOM.$panZoomInstance
      const getTransform = pan.getTransform()

      this.$store.commit('GET_PANZOOM_COORDS', [
        getTransform.x,
        getTransform.y,
        getTransform.scale
      ])

      // delete this on prod
      this.panInstance.transform = `
        x: ${getTransform.x},
        y: ${getTransform.y},
        scale: ${getTransform.scale}
      `
    }, 120),

    getviewSize: _throttle(function() {
      console.log('getviewSize')
      const ROOT_EL = this.$refs.CONTENTMAIN

      this.$store.commit('GET_VIEW_SIZE', [
        ROOT_EL.clientWidth,
        ROOT_EL.clientHeight
      ])
    }, 250)
  }
}
</script>

<style lang="scss" scoped>
$sidebar-width-mobile: 100vw;
$sidebar-width-tablet: 50vw;
$sidebar-width-desktop: 480px;

/* @include desktop {
  $sidebar-width: 50vw;
} */

#content-main-wrapper {
  position: relative;
  display: block;
  margin-right: 0;
  transition: margin-right 0.6s $easeOutQuint;

  &.is-sidebar-open {
    margin-right: $sidebar-width-mobile;

    @include tablet {
      margin-right: $sidebar-width-tablet;
    }

    @include desktop {
      margin-right: $sidebar-width-desktop;
    }
  }

  #content-main {
    /* overflow: hidden; */
  }

  #content-sidebar {
    /* background: pink; */
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: $sidebar-width-mobile;
    z-index: 10;

    @include tablet {
      width: $sidebar-width-tablet;
    }

    @include desktop {
      width: $sidebar-width-desktop;
    }
  }
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
  width: 100%;
  height: 100vh;

  /deep/ .vue-pan-zoom-scene {
    overflow: hidden;
    width: 100%;
    height: 100vh;
  }
  /*
  /deep/ .owner {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform;
  } */
}

.has-transition {
  transition-duration: 0.25s;
}
</style>
