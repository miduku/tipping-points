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
        class="node-child-node"
        :data-degrees="data.degrees"
      >
        <circle
          class="circle"
          :r="size"
          :cx="data.position[0]"
          :cy="data.position[1]"
        />
        <circle
          class="dot"
          :r="2"
          :cx="data.position[0]"
          :cy="data.position[1]"
        />
      </g>

      <g v-else class="node-child-node" :data-degrees="data.degrees">
        <rect
          class="pill"
          :x="data.position[0] - size"
          :y="data.position[1] - (size + size / 4) / 2"
          :width="size * 2"
          :height="size + size / 4"
          :rx="(size + size / 4) / 2"
          stroke="#484D51"
        />
      </g>
    </g>

    <foreignObject
      :width="size * 30"
      :height="size * 2"
      :x="data.position[0] - size * 4"
      :y="data.position[1] - size"
      overflow="visible"
      :style="
        `
          transform-origin: ${data.position[0]}px ${data.position[1]}px;
          transform: translateX(${data.margin * 2 + size * 2}px);
        `
      "
    >
      <div class="title-wrapper">
        <span class="title">
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
      console.log('BaseNodeChildNode pups')
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
      fill: none;
      stroke: fuchsia;
      stroke-width: 1;
    }
    .dot {
      fill: fuchsia;
      stroke: none;
    }
  }

  .title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    /* background: fuchsia; */

    .title {
      position: absolute;
      text-align: left;
      /* background: chocolate; */
      word-break: keep-all;
      width: 100%;
      font-size: 1rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-feature-settings: 'cpsp' on;
    }
  }
}
</style>
