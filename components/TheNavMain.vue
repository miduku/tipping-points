<template>
  <nav class="nav nav-main">
    <button class="button" @click.prevent="vuexPanTo('AMZN')">amazon</button>
    <button class="button" @click.prevent="vuexPanTo('AMOC')">atlantic</button>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function() {
      console.log(this.$root.$el.querySelector('.content-main'))
    })
  },

  methods: {
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
</script>
