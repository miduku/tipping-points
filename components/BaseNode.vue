<template>
  <g :id="nodeData.id" class="node">
    <circle
      class="node-circle"
      :cx="nodeData.position[0]"
      :cy="nodeData.position[1]"
      :r="size"
      fill="hotpink"
    />

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
import NodeChildren from '~/components/BaseNodeChildren.vue'

export default {
  components: {
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
    // console.log('id: ', this.$el.querySelector('#AMOC-output-0'))
    this.$nextTick(function() {
      // console.log('BaseNode pups')
    })
  }
}
</script>

<style lang="scss" scoped>
.node {
  position: absolute;
  background: hotpink;
  /* border-radius: 50%; */

  .group-circle {
    .node-circle:hover {
      fill: red;
    }
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
      /* background: chocolate; */
      word-break: keep-all;
      width: 100%;
      font-size: 1rem;
    }
  }
}
</style>
