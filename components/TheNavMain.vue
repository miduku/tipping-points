<template>
  <nav class="nav nav-main">
    <div class="nav-impacts">
      <button class="button" @click.prevent="vuexPanTo('AMZN')">amazon</button>
      <button class="button" @click.prevent="vuexPanTo('AMOC')">
        atlantic
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function() {})
  },

  methods: {
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
</script>
