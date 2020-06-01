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
      <g
        v-if="data.i === 0 && data.direction === 'output'"
        class="node-child-node vuex-pan-to"
        :data-degrees="data.degrees"
      >
        <circle
          class="circle"
          :r="size"
          :cx="data.position[0]"
          :cy="data.position[1]"
        />
        <circle
          class="circle-dot"
          :r="2"
          :cx="data.position[0]"
          :cy="data.position[1]"
        />
      </g>

      <g
        v-else
        class="node-child-node vuex-pan-to"
        :data-degrees="data.degrees"
      >
        <rect
          class="pill-border"
          :x="data.position[0] - size"
          :y="data.position[1] - size"
          :width="size * 2"
          :height="size * 2"
        />
        <rect
          class="pill"
          :x="data.position[0] - size"
          :y="data.position[1] - (size + size / 4) / 2"
          :width="size * 2"
          :height="size + size / 4"
          :rx="(size + size / 4) / 2"
        />
      </g>
    </g>

    <foreignObject
      :width="size * 25"
      :height="size * 2"
      :x="data.position[0] - size * 4"
      :y="data.position[1] - size"
      overflow="visible"
      :style="
        `
          transform-origin: ${data.position[0]}px ${data.position[1]}px;
          transform: translateX(${data.margin * 2 + size}px);
        `
      "
    >
      <div class="title-wrapper">
        <span
          class="title"
          :class="
            data.i === 0 && data.direction === 'output' ? 'is-strong' : ''
          "
        >
          {{ data.childData.title }}
        </span>
      </div>
    </foreignObject>
  </g>
</template>

<script>
export default {
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

  mounted() {
    // console.log(this.data)
    this.$nextTick(function() {
      // console.log('BaseNodeChildNode pups')
    })
  }
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

  .node-child-node {
    .circle,
    .pill {
      stroke: fuchsia;
      stroke-width: 1;
    }

    .circle,
    .pill {
      fill: none;
    }
    .circle-dot,
    .pill-border {
      stroke: pink;
    }
    .circle-dot {
      fill: fuchsia;
    }
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
      opacity: 0.5;
      font-size: 0.625rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-feature-settings: 'cpsp' on;
    }
  }
}
</style>
