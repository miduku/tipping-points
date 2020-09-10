<template>
  <g
    id="LINKS_OUTER"
    :class="{ 'is-tutorial-visible': modeIsTutorial && tutorialStep === 2 }"
  >
    <Link v-for="(link, i) in data" :key="i" :link-data="link" class="links" />
  </g>
</template>

<script>
import { mapState } from 'vuex'

import Link from '~/components/BaseLink.vue'

export default {
  components: {
    Link
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    })
  }
}
</script>

<style lang="scss" scoped>
#LINKS_OUTER {
  &.is-tutorial-visible {
    /deep/ .link-group-GIS-output-2 path {
      /* stroke: $dark; */
      opacity: 1;
      stroke-width: 2px;
    }
  }
}
</style>
