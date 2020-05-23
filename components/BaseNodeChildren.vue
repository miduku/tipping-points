<template>
  <g
    :class="'is-' + direction"
    class="child-nodes"
    :style="`transform-origin: ${position[0]}px ${position[1]}px;`"
  >
    <g
      v-for="(childData, i) in nodeChildData"
      :key="i"
      :class="'child-' + i"
      class="child-node"
      :style="
        `
        transform-origin: ${position[0]}px ${position[1]}px;
        transform: rotate(${spreadNodeChildren(i, nodeChildData.length)}deg);
        `
      "
    >
      <g
        :style="
          `
          transform-origin: ${position[0]}px ${position[1]}px;
          transform: translateX(${childNodeMargin * 1.5}px);
          `
        "
      >
        <g v-if="i === 0 && direction === 'output'">
          <circle
            class="child-circle"
            :r="childSize"
            :cx="position[0]"
            :cy="position[1]"
          />
          <circle
            class="child-circle-dot"
            :r="2"
            :cx="position[0]"
            :cy="position[1]"
          />
        </g>
        <rect
          v-else
          class="child-pill"
          :x="position[0] - childSize"
          :y="position[1] - (childSize + childSize / 4) / 2"
          :width="childSize * 2"
          :height="childSize + childSize / 4"
          :rx="(childSize + childSize / 4) / 2"
          stroke="#484D51"
        />
      </g>

      <foreignObject
        :width="childSize * 30"
        :height="childSize * 2"
        :x="position[0] - childSize * 4"
        :y="position[1] - childSize"
        overflow="visible"
        :style="
          `
            transform-origin: ${position[0]}px ${position[1]}px;
            transform: translateX(${childNodeMargin * 2 + childSize * 2}px);
            `
        "
      >
        <div class="title-wrapper">
          <span class="title">
            {{ childData.title }}
          </span>
        </div>
      </foreignObject>
    </g>
  </g>
</template>

<script>
export default {
  props: {
    nodeChildData: {
      type: Array,
      required: true,
      default: () => []
    },
    childNodeMargin: {
      type: Number,
      required: true
    },
    childSize: {
      type: Number,
      default: 8
    },
    position: {
      type: Array,
      required: true
    },
    direction: {
      type: String,
      default: 'output'
    }
  },

  methods: {
    spreadNodeChildren(idx, amount) {
      const n = amount === 1 ? 1 : amount - 1

      if (this.direction === 'input') {
        return (-90 / n) * idx
      }
      return (90 / n) * idx
    }
  }
}
</script>

<style lang="scss" scoped>
.child-nodes {
  &.is-output {
    transform: rotate(-45deg);
  }
  &.is-input {
    transform: rotate(225deg);

    .child-node {
      .title-wrapper {
        .title {
          transform-origin: center;
          transform: rotate(180deg);
          text-align: right;
        }
      }
    }
  }

  .child-node {
    .child-circle,
    .child-pill {
      fill: none;
      stroke: fuchsia;
      stroke-width: 1;
    }
    .child-circle-dot {
      fill: fuchsia;
      stroke: none;
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
}
</style>
