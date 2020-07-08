export default {
  methods: {
    // EXAMPLE: vuexSetSidebar([true, 'AMZN'])
    vuexSetSidebar(openArr) {
      this.$store.commit('SET_SIDEBAR', openArr)
    }
  }
}
