<template>
  <div class="root">
    <TheNavMain />

    <div v-resize="getWindowSizes" class="root-content">
      <!-- <TheLinksImpact
        v-if="isMountedNavMain"
        :size="[WINDOW.innerWidth, WINDOW.innerHeight]"
      /> -->

      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// import TheLinksImpact from '~/components/TheLinksImpact.vue'
import TheNavMain from '~/components/TheNavMain.vue'

export default {
  components: {
    // TheLinksImpact,
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

  computed: {
    ...mapState({
      isMountedNavMain: (state) => state.isMounted.theNavMain
    })
  },

  mounted() {
    this.$nextTick(function() {
      this.getWindowSizes()
    })
  },

  methods: {
    getWindowSizes() {
      const ROOT_EL = this.$root.$el
      this.$store.commit('GET_WINDOW_SIZE', [
        ROOT_EL.clientWidth,
        ROOT_EL.clientHeight
      ])

      // this.WINDOW.innerHeight = ROOT_EL.clientHeight
      // this.WINDOW.innerWidth = ROOT_EL.clientWidth
    }
  }
}
</script>
