<template>
  <g :id="nodeData.id" class="node">
    <circle
      class="node-circle"
      :cx="nodeData.position[0]"
      :cy="nodeData.position[1]"
      :r="size"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />

    <g :style="`opacity: ${panZoomCoords[2] < 0.9 ? 0.2 : 1}`">
      <!-- Inner node links -->
      <g class="node-links">
        <Link
          v-for="(nodeLink, j) in nodeData.links"
          :key="j"
          :link-data="nodeLink"
          :distance="size * 1.15"
          invert-angle
          class="node-link"
        />
      </g>

      <!-- Outer smaller nodes -->
      <NodeChildren
        direction="input"
        :data="{
          childrenData: nodeData.children,
          position: nodeData.position,
          parentId: nodeData.id,
          size
        }"
      />

      <NodeChildren
        direction="output"
        :data="{
          childrenData: nodeData.children,
          position: nodeData.position,
          parentId: nodeData.id,
          size
        }"
      />
    </g>

    <!-- Node title -->
    <foreignObject
      :class="panZoomCoords[2] > 1.2 ? 'is-zoomed' : ''"
      :width="size * 3"
      :height="size * 3"
      :x="nodeData.position[0] - size - size / 2"
      :y="nodeData.position[1] - size - size / 2"
      :style="
        `
        transform: scale(${
          panZoomCoords[2] < 0.9 ? 0.9 / panZoomCoords[2] : 1
        });
        transform-origin: ${nodeData.position[0]}px ${nodeData.position[1]}px;
        `
      "
      class="node-foreign"
    >
      <div class="title-wrapper">
        <span class="title">
          {{ nodeData.title }}
        </span>
      </div>
    </foreignObject>
  </g>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

import Link from '~/components/BaseLink.vue'
import NodeChildren from '~/components/BaseNodeChildren.vue'

export default {
  components: {
    Link,
    NodeChildren
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  props: {
    nodeData: {
      type: Object,
      required: true
    },

    size: {
      type: Number,
      default: 80
    }
  },

  data() {
    return {
      tempPanZoomCoords: Array
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      sidebarIsOpen: (state) => state.sidebar.isOpen
    })
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted BaseNode')
    })
  },

  methods: {
    onMouseDown() {
      this.tempPanZoomCoords = this.panZoomCoords
    },

    onMouseUp() {
      if (this.tempPanZoomCoords === this.panZoomCoords) {
        console.log('not dragged')
        if (this.sidebarIsOpen) {
          console.log('dragged from node')
          this.vuexPanTo(this.nodeData.id)
        }

        this.vuexSetSidebar([true, this.nodeData.id])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.node {
  > g {
    transition: opacity 0.5s ease;
  }

  foreignObject {
    transition: opacity 0.5s ease;

    &.is-zoomed {
      opacity: 0.25;
    }
  }

  .node-circle {
    stroke: rgba($dark-grey, 0.15);
    fill: rgba(#fff, 0.75);
    pointer-events: all;
    transition: stroke 0.5s $easeOutQuint;
    cursor: pointer;

    &:hover {
      stroke: rgba($dark-grey, 0.75);
    }
  }

  .node-link {
    opacity: 0.25;
  }

  .node-foreign {
    pointer-events: none;
  }

  .title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;

    .title {
      position: absolute;
      text-align: center;
      word-break: keep-all;
      width: 100%;
      font-size: 1.5rem;
      font-family: $serif;
      font-weight: bold;
    }
  }
}
</style>
