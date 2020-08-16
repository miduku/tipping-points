export default {
  methods: {
    // EXAMPLE: vuexPanTo('AMZN')
    vuexPanTo(nodeId, zoomLevel = 1) {
      this.$store.commit('TO_NODE_ID', [nodeId, zoomLevel])
    }
  }
}
