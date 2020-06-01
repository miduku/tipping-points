<template>
  <g :id="nodeData.id" class="node">
    <circle
      class="node-circle"
      :cx="nodeData.position[0]"
      :cy="nodeData.position[1]"
      :r="size"
    />

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

    <foreignObject
      :width="size * 3"
      :height="size * 3"
      :x="nodeData.position[0] - size - size / 2"
      :y="nodeData.position[1] - size - size / 2"
      class="node-foreign"
    >
      <div class="title-wrapper">
        <span class="title">
          {{ nodeData.title }}
        </span>
      </div>
    </foreignObject>

    <NodeChildren
      :data="{
        childrenData: nodeData.children,
        position: nodeData.position,
        parentId: nodeData.id,
        size
      }"
      direction="input"
    />

    <NodeChildren
      :data="{
        childrenData: nodeData.children,
        position: nodeData.position,
        parentId: nodeData.id,
        size
      }"
      direction="output"
    />
  </g>
</template>

<script>
import Link from '~/components/BaseLink.vue'
import NodeChildren from '~/components/BaseNodeChildren.vue'

export default {
  components: {
    Link,
    NodeChildren
  },

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

  mounted() {
    this.$nextTick(function() {
      console.log('mounted BaseNode')
    })
  }
}
</script>

<style lang="scss" scoped>
.node {
  .node-circle {
    stroke: $light;
    fill: rgba(#fff, 0.75);
    pointer-events: all;

    &:hover {
      fill: red;
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
      font-size: 1rem;
    }
  }
}
</style>
