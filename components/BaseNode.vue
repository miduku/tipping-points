<template>
  <g
    :id="data.id"
    class="node"
    :class="[
      {
        'is-active': data.id === sidebarContentInstanceName && someNodeIsActive
      },
      {
        'is-hidden': isHidden
      }
    ]"
  >
    <circle
      class="node-circle"
      :cx="data.position[0]"
      :cy="data.position[1]"
      :r="size"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />

    <g :style="`opacity: ${panZoomZ < 0.9 ? 0.2 : 1}`">
      <!-- Inner node links -->
      <g class="node-links">
        <Link
          v-for="(nodeLink, j) in data.links"
          :key="j"
          :link-data="nodeLink"
          :distance="size * 1.15"
          invert-angle
          class="node-link"
        />
      </g>

      <!-- Outer smaller nodes -->
      <NodeChildren
        v-once
        direction="input"
        :data="{
          childrenData: data.children,
          position: data.position,
          parentId: data.id,
          size
        }"
      />

      <NodeChildren
        v-once
        direction="output"
        :data="{
          childrenData: data.children,
          position: data.position,
          parentId: data.id,
          size
        }"
      />
    </g>

    <!-- Node title -->
    <foreignObject
      class="node-foreign"
      :class="panZoomZ > 1.2 ? 'is-zoomed' : ''"
      :width="size * 3"
      :height="size * 3"
      :x="data.position[0] - size - size / 2"
      :y="data.position[1] - size - size / 2"
      :style="
        `
        transform: scale(${panZoomZ < 0.9 ? 0.9 / panZoomZ : 1});
        transform-origin: ${data.position[0]}px ${data.position[1]}px;
        `
      "
    >
      <div class="title-wrapper">
        <span class="title">
          {{ data.title }}
        </span>
      </div>
    </foreignObject>

    <foreignObject
      class="node-foreign-button"
      :width="size * 3"
      :height="size * 3"
      :x="data.position[0] - size - size / 2"
      :y="data.position[1] - size - size / 2"
      :style="
        `
        opacity: ${
          (modeIsTutorial && tutorialStep > 3) || !modeIsTutorial ? 1 : 0
        };
        `
      "
    >
      <div
        class="button-wrapper"
        :style="
          `
          bottom: ${
            panZoomZ <= 1 ? -10 - panZoomZ * ((1 - panZoomZ) * 100) : -10
          }%;
          transform: scale(${panZoomZ < 0.9 ? 0.9 / panZoomZ : 1});
          `
        "
      >
        <Button icon="book" @click="vuexSetSidebar([true, data.id])">
          Read more
        </Button>
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
import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button,
    Link,
    NodeChildren
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  props: {
    data: {
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
      // tempClickPanZoomCoords: Array,
      isMove: false,
      isActive: false,
      isHidden: false
    }
  },

  computed: {
    ...mapState({
      isPanning: (state) => state.isPanning,
      panZoomZ: (state) => state.panZoomCoords[2],

      sidebarIsOpen: (state) => state.sidebar.isOpen,
      sidebarContentInstanceName: (state) => state.sidebar.contentInstanceName,
      someNodeIsActive: (state) => state.someNode.isActive,

      someChildNodeTimeStamp: (state) => state.someChildNode.timeStamp,
      someChildNodeIsActive: (state) => state.someChildNode.isActive,
      someChildNodeI: (state) => state.someChildNode.i,
      someChildNodeDirection: (state) => state.someChildNode.direction,

      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    })
  },

  watch: {
    modeIsTutorial(value) {
      this.isHidden = value
    },

    tutorialStep(value) {
      if (this.modeIsTutorial) {
        switch (value) {
          case 0:
          case 1:
            if (this.data.id !== 'GIS') {
              this.isHidden = true
            } else {
              this.isHidden = false
            }
            break

          case 2:
            if (
              this.data.id !== 'GIS' &&
              this.data.id !== 'CRD' &&
              this.data.id !== 'AMOC'
            ) {
              this.isHidden = true
            } else {
              this.isHidden = false
            }
            break

          case 3:
          case 4:
          case 5:
            if (this.data.id !== 'GIS') {
              this.isHidden = true
            } else {
              this.isHidden = false
            }
            break

          case 6:
          case 7:
            // default:
            this.isHidden = false
            break
        }
      } else {
        this.isHidden = false
      }
    },

    isPanning(value, oldValue) {
      if (!oldValue && value) {
        this.isMove = true
      }
    },

    sidebarContentInstanceName(value) {
      if (value === this.data.id) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },

    isActive(value) {
      if (value === true && !this.someNodeIsActive) {
        this.$store.commit('SET_SOME_NODE', { isActive: true })
      }
    },

    someChildNodeTimeStamp(value, oldValue) {
      // look for classes e.g.: link-group-BFS-output-1
      if (value !== oldValue) {
        const NODE_LINKS = this.$el.querySelector(
          `#${this.data.id} .node-links`
        )
        const NODE_LINKS_HIGHLIGHTS =
          this.data.id === this.sidebarContentInstanceName
            ? NODE_LINKS.querySelectorAll(
                `.link-group-${this.data.id}-${this.someChildNodeDirection}-${this.someChildNodeI}`
              )
            : null
        const NODE_LINKS_HIGHLIGHTS_ALL = NODE_LINKS.querySelectorAll(
          `.node-link`
        )

        if (
          NODE_LINKS_HIGHLIGHTS_ALL ||
          (NODE_LINKS_HIGHLIGHTS_ALL && !this.someChildNodeIsActive)
        ) {
          NODE_LINKS_HIGHLIGHTS_ALL.forEach((element) => {
            element.classList.remove('is-highlighted')
          })
        }

        if (NODE_LINKS_HIGHLIGHTS && this.someChildNodeIsActive) {
          NODE_LINKS_HIGHLIGHTS.forEach((element) => {
            element.classList.add('is-highlighted')
          })
        }
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted BaseNode')
    })
  },

  methods: {
    onMouseDown() {
      this.isMove = false
    },

    onMouseUp() {
      if (!this.isMove) {
        // this is a click
        this.vuexSetSidebar([this.sidebarIsOpen, this.data.id])
        this.$store.commit('SET_SOME_CHILDNODE', {
          i: '',
          direction: '',
          isActive: false
        })

        if (this.data.id === this.sidebarContentInstanceName) {
          if (!this.isActive) {
            this.isActive = true
            this.vuexPanTo(this.data.id)
          } else {
            this.isActive = false
            this.$store.commit('SET_SOME_NODE', { isActive: false })
            this.vuexSetSidebar([false, ''])
          }
        } else {
          this.isActive = false
          this.$store.commit('SET_SOME_NODE', { isActive: false })
          this.vuexSetSidebar([false, ''])
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.node {
  transition: opacity 0.5s $easeOutQuint;

  &.is-hidden {
    opacity: 0;
  }

  > g {
    transition: opacity 0.5s $easeOutQuint;
  }

  foreignObject {
    overflow: visible;
    position: relative;
    transition: opacity 0.5s $easeOutQuint, transform 0.5s $easeOutQuint 0.15s;

    &.is-zoomed {
      opacity: 0.1;
    }
  }
}

.node-circle {
  stroke: rgba($node-color, 0.15);
  fill: rgba(#fff, 0.75);
  pointer-events: all;
  transition: stroke 0.5s $easeOutQuint, filter 0.5s $easeOutQuint;
  cursor: pointer;

  &:hover,
  .is-active & {
    fill: rgba(#fff, 1);
  }

  &:hover {
    stroke: rgba($node-color-hover, 0.75);
    filter: url(#shadow);
  }

  .is-active & {
    stroke: rgba($node-color-active, 0.75);
    filter: url(#shadow-active);
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
    line-height: 1.2em;
    transform: translateY(-0.1em);
  }
}

.node-foreign-button {
  transition: opacity 0.5s $easeOutQuint;
}

.button-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    transform: translateY(-25%);
    opacity: 0;
    transition: bottom 0.5s $easeOutQuint, opacity 0.3s $easeOutQuint,
      transform 0.5s $easeOutQuint;

    .is-active & {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;

      .sidebar-is-open & {
        transform: translateY(-25%);
        opacity: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
