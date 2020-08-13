<template>
  <div
    id="content-main-wrapper"
    :class="[
      isSidebarOpen ? 'is-sidebar-open' : '',

      someNodeIsActive ? 'some-node-is-active' : '',
      linksImpactsClassesIsVisible
    ]"
  >
    <div id="content-main" ref="CONTENTMAIN" v-resize="getviewSize">
      <TheLinksImpact
        v-if="isMounted.theNodes && isMounted.theNavMain"
        :size="[viewSize[0], viewSize[1]]"
      />

      <client-only>
        <panZoom
          id="PANZOOM"
          ref="PANZOOM"
          class="pan-zoom"
          :class="{ 'is-ready': isMounted.theNodes }"
          :options="options"
          @transform="onTransform"
          @panstart="onPanStart"
          @panend="onPanEnd"
        >
          <ThePanzoomSvg
            ref="OWNER"
            class="owner"
            :class="{ 'is-map-hidden': !isMap }"
            :view-box.camel="
              `
              0
              0
              ${importNodesJson.panSize[0]}
              ${importNodesJson.panSize[1]}
              `
            "
            :style="
              `
              width: ${importNodesJson.panSize[0]}px;
              height: ${importNodesJson.panSize[1]}px;
              `
            "
          >
            <TheLinks
              v-if="isMounted.theNodes && isMounted.theNavMain"
              :data="importLinksJson"
            />

            <TheNodes v-once :data="importNodesJson.nodes" />
          </ThePanzoomSvg>
        </panZoom>
      </client-only>
    </div>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'

import { mapState } from 'vuex'

import TheLinksImpact from '~/components/TheLinksImpact.vue'
import ThePanzoomSvg from '~/components/ThePanzoomSvg.vue'
import TheNodes from '~/components/TheNodes.vue'
import TheLinks from '~/components/TheLinks.vue'

import importNodesJson from '~/assets/json/nodes.json'
import importLinksJson from '~/assets/json/links.json'

export default {
  components: {
    TheLinksImpact,
    ThePanzoomSvg,
    TheNodes,
    TheLinks
  },

  asyncData({ params }) {
    return { importNodesJson, importLinksJson }
  },

  data() {
    return {
      isPanning: false,
      isZooming: false,
      options: {
        minZoom: 0.25,
        maxZoom: 2.25
      },
      panInstance: {
        transform: ''
      },
      isMap: true,
      viewSize: Array,
      linksImpactsClassesIsVisible: ''
    }
  },

  computed: {
    ...mapState({
      panToNodeTimeStamp: (state) => state.panToNode.timeStamp,
      panToNodeId: (state) => state.panToNode.id,
      isMounted: (state) => state.isMounted,
      isSidebarOpen: (state) => state.sidebar.isOpen,
      newZoomLevel: (state) => state.newZoomLevel.level,
      newZoomLevelTimeStamp: (state) => state.newZoomLevel.timeStamp,
      someNodeIsActive: (state) => state.someNode.isActive,
      isMapVisible: (state) => state.isMapVisible,
      linksImpactGroups: (state) => state.links.impactGroups
    })
  },

  watch: {
    linksImpactGroups: {
      handler(value) {
        let linksImpactGroupId = ''

        for (const [id, bool] of Object.entries(value)) {
          linksImpactGroupId += bool ? ' is-' + id : ''
        }

        // Set which impact links are visible
        this.linksImpactsClassesIsVisible = linksImpactGroupId
      },
      deep: true
    },

    isMapVisible(value) {
      this.isMap = value
    },

    panToNodeTimeStamp(value, oldValue) {
      if (value !== oldValue) {
        this.panTo(this.panToNodeId)
      }
    },

    newZoomLevelTimeStamp(value, oldValue) {
      if (value !== oldValue) {
        this.setZoomLevelFromCenter(this.newZoomLevel)
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
    panTo(nodeId, toNewZoomLevel = 1) {
      const OWNER = this.$refs.OWNER.$el
      const PANZOOM = this.$refs.PANZOOM.$panZoomInstance

      const nodeElement = OWNER.querySelector('#' + nodeId)
      const nodeElementCircle = nodeElement.querySelector('.node-circle')

      OWNER.classList.add('has-transition')
      PANZOOM.moveToCenterOfElement(nodeElementCircle, 0, 0)

      setTimeout(() => {
        OWNER.classList.remove('has-transition')

        this.setZoomLevelFromCenter(toNewZoomLevel, OWNER, PANZOOM)
      }, 250)
    },

    setZoomLevelFromCenter(zoomLevel, owner, panzoom) {
      const OWNER = owner || this.$refs.OWNER.$el
      const PANZOOM = panzoom || this.$refs.PANZOOM.$panZoomInstance
      const OWNER_PARENT_BOUNDS = OWNER.parentElement.getBoundingClientRect()

      PANZOOM.smoothZoomAbs(
        OWNER_PARENT_BOUNDS.width / 2,
        OWNER_PARENT_BOUNDS.height / 2,
        zoomLevel
      )
    },

    onTransform: _throttle(function() {
      // console.log('onTransform')
      const pan = this.$refs.PANZOOM.$panZoomInstance
      const getTransform = pan.getTransform()

      this.$store.commit('GET_PANZOOM_COORDS', [
        getTransform.x,
        getTransform.y,
        getTransform.scale
      ])

      // delete this on prod
      // this.panInstance.transform = `
      //   x: ${getTransform.x},
      //   y: ${getTransform.y},
      //   scale: ${getTransform.scale}
      // `
    }, 120),

    getviewSize: _throttle(function() {
      const ROOT_EL = this.$refs.CONTENTMAIN

      this.viewSize = [ROOT_EL.clientWidth, ROOT_EL.clientHeight]
    }, 250),

    onPanStart() {
      this.$store.commit('SET_PANNING', true)
    },
    onPanEnd() {
      this.$store.commit('SET_PANNING', false)
    }
  }
}
</script>

<style lang="scss" scoped>
#content-main-wrapper {
  position: relative;
  display: block;
  margin-right: 0;
  transition: margin-right 0.6s $easeOutQuint;
  /* opacity: 0; */
  animation: init 1s $easeOutQuint forwards;

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

  #sidebar-main/* ,
  #sidebar-sources */ {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: $sidebar-width-mobile;

    @include tablet {
      width: $sidebar-width-tablet;
    }

    @include desktop {
      width: $sidebar-width-desktop;
    }
  }
}

#PANZOOM {
  overflow: hidden;
  background: transparent;
  width: 100%;
  height: 100vh;
  opacity: 0;

  &.is-ready {
    animation: init 1s $easeOutQuint forwards;
  }

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
