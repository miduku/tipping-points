export default {
  methods: {
    // EXAMPLE: vuexPanTo('AMZN')
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
