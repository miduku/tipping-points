<template>
  <div class="root">
    <TheNavMain />

    <div v-resize="getWindowSizes" class="root-content">
      <TheImpactLinks :size="[WINDOW.innerWidth, WINDOW.innerHeight]" />

      <nuxt />
    </div>
  </div>
</template>

<script>
import TheImpactLinks from '~/components/TheImpactLinks.vue'
import TheNavMain from '~/components/TheNavMain.vue'

export default {
  components: {
    TheImpactLinks,
    TheNavMain
  },

  data() {
    return {
      WINDOW: {
        innerHeight: 0,
        innerWidth: 0
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.getWindowSizes()
    })
  },

  methods: {
    getWindowSizes() {
      const ROOT_EL = this.$root.$el

      this.WINDOW.innerHeight = ROOT_EL.clientHeight
      this.WINDOW.innerWidth = ROOT_EL.clientWidth
    }
  }
}
</script>