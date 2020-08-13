<template>
  <g class="node-child" :class="'is-' + data.direction">
    <g
      class="translateX"
      :style="
        `
        transform-origin: ${data.position[0]}px ${data.position[1]}px;
        transform: translateX(${data.margin * 1.5}px);
        `
      "
    >
      <g class="node-child-node vuex-pan-to" :data-degrees="data.degrees">
        <rect
          class="pill-border"
          :x="data.position[0] - size"
          :y="data.position[1] - size"
          :width="size * 2"
          :height="size * 2"
        />
        <rect
          class="pill"
          :class="[
            data.i === 0 && data.direction === 'output' ? 'is-main-output' : '',
            isActive ? 'is-active' : ''
          ]"
          :x="data.position[0] - size"
          :y="data.position[1] - (size + size / 4) / 2"
          :width="size * 2"
          :height="size + size / 4"
          :rx="(size + size / 4) / 2"
          @click="onClick"
        />
      </g>
    </g>

    <foreignObject
      :width="size * 25"
      :height="size * 2"
      :x="data.position[0] - size * 4"
      :y="data.position[1] - size"
      :style="
        `
        transform-origin: ${data.position[0]}px ${data.position[1]}px;
        transform: translateX(${data.margin * 2 + size}px);
        `
      "
    >
      <div class="title-wrapper">
        <div
          class="title"
          :class="
            data.i === 0 && data.direction === 'output' ? 'is-strong' : ''
          "
        >
          <span>{{ data.childData.title }}</span>
        </div>
      </div>
    </foreignObject>
  </g>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

export default {
  mixins: [vuexPanTo, vuexSetSidebar],

  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },

    size: {
      type: Number,
      default: 8
    }
  },

  data() {
    return {
      // isActive: false
    }
  },

  computed: {
    ...mapState({
      sidebarIsOpen: (state) => state.sidebar.isOpen,
      someNodeIsActive: (state) => state.someNode.isActive,
      someChildNode: (state) => state.someChildNode,
      sidebarContentInstanceName: (state) => state.sidebar.contentInstanceName
    }),

    isActive() {
      if (
        this.sidebarContentInstanceName === this.data.parentId &&
        this.someChildNode.i === this.data.i &&
        this.someChildNode.direction === this.data.direction &&
        this.someNodeIsActive &&
        this.someChildNode.isActive
      ) {
        return true
      }
      return false
    }
  },

  watch: {
    // TODO: states while changing main nodes isn't working correctly
    someNodeIsActive(value) {
      if (value === false) {
        this.$store.commit('SET_SOME_CHILDNODE', {
          i: '',
          direction: '',
          isActive: false
        })
      }
    },
    sidebarContentInstanceName(value, oldValue) {
      if (value !== oldValue) {
        this.$store.commit('SET_SOME_CHILDNODE', {
          i: '',
          direction: '',
          isActive: false
        })
      }
    }
    // sidebarContentInstanceName(value) {
    //   console.log(this.someChildNode.i)
    //   // console.log(value, this.data.parentId)
    //   if (
    //     value === this.data.parentId &&
    //     this.someChildNode.i === this.data.i
    //   ) {
    //     this.isActive = true
    //   } else {
    //     this.isActive = false
    //   }
    // }
    // isActive(value) {
    //   console.log(value)
    //   if (value === false) {
    //     this.$store.commit('SET_SOME_CHILDNODE', {
    //       i: '',
    //       direction: '',
    //       isActive: false
    //     })
    //   }
    // }
  },

  methods: {
    onClick() {
      console.log(this.data)
      this.vuexPanTo(this.data.parentId)
      this.vuexSetSidebar([this.sidebarIsOpen, this.data.parentId])
      this.$store.commit('SET_SOME_CHILDNODE', {
        i: this.data.i,
        direction: this.data.direction,
        isActive: true
      })
      // }  else {
      //   this.vuexSetSidebar([false, this.data.parentId])
      // }

      // if (this.data.parentId === this.sidebarContentInstanceName) {
      //   if (!this.isActive) {
      //     this.isActive = true
      //     this.vuexPanTo(this.data.parentId)
      //   } else {
      //     this.isActive = false
      //     this.$store.commit('SET_SOME_NODE', false)
      //     this.vuexSetSidebar([false, ''])
      //   }
      // } else {
      //   this.isActive = false
      //   this.$store.commit('SET_SOME_NODE', false)
      //   this.vuexSetSidebar([false, ''])
      // }
    }
  }

  // mounted() {
  //   // console.log(this.data)
  //   this.$nextTick(function() {
  //     // console.log('BaseNodeChildNode pups')
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.node-child {
  &.is-input {
    /* transform: rotate(225deg); */

    .title-wrapper {
      .title {
        transform-origin: center;
        transform: rotate(180deg);
        text-align: right;
      }
    }
  }

  foreignObject {
    overflow: visible;
  }

  .node-child-node {
    /* .circle, */
    .pill {
      stroke: rgba($node-color, 0.75);
      stroke-width: 1;
      pointer-events: all;
      cursor: pointer;
      overflow: visible;
      transition: stroke 0.5s $easeOutQuint, fill 0.5s $easeOutQuint;

      &:hover {
        stroke: $node-color-hover;
        fill: rgba($light, 0.75);
      }

      &.is-active {
        /* stroke: rgba($node-color-active, 0.75); */
        stroke: rgba(hotpink, 0.75);
      }

      &.is-main-output {
        stroke-width: 2;
      }
    }

    /* .circle, */
    .pill {
      fill: rgba(#fff, 0.75);
    }
    /* .circle-dot {
      stroke: none;
      fill: $dark-grey;
    } */
    .pill-border {
      fill: transparent;
    }
  }

  .title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;

    .title {
      position: absolute;
      text-align: left;
      word-break: keep-all;
      width: 100%;
      /* opacity: 0.5; */
      font-size: 0.625rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-feature-settings: 'cpsp' on;
      color: $dark-grey;

      span {
        background: rgba(#fff, 0.5);
        padding: 0 2px;
        border-radius: 4px;
      }
    }
  }
}
</style>
