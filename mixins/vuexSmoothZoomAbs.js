export default {
  methods: {
    // EXAMPLE: vuexPanTo('AMZN')
    vuexSmoothZoomAbs(zoomLevel) {
      this.$store.commit('SET_NEW_ZOOM_LEVEL', zoomLevel)
    }
  }
}
