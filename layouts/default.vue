<template>
  <div class="root">
    <TheNavMain />

    <div class="root-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TheNavMain from '~/components/TheNavMain.vue'

export default {
  components: {
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
    this.$nextTick(function() {})
  },

  methods: {}
}
</script>
