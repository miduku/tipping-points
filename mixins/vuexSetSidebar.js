export default {
  methods: {
    // EXAMPLE: vuexSetSidebar([true, 'AMZN'])
    vuexSetSidebar(openArr) {
      this.$store.commit('OPEN_SIDEBAR', openArr)
    }
  }
}
