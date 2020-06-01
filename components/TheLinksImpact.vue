<template>
  <svg
    id="IMPACT_LINKS"
    :width="size[0]"
    :height="size[1]"
    :view-box.camel="`0 0 ${size[0]} ${size[1]}`"
  >
    <!-- TODO: delete this later -->
    <rect
      x="0"
      y="0"
      :width="size[0]"
      :height="size[1]"
      fill="none"
      stroke-width="4"
      stroke="hotpink"
    />

    <Link
      v-for="(link, i) in linksImpacts"
      :key="i"
      :link-data="link"
      :difference-coords="panZoomCoords"
      class="links-impact"
    />
  </svg>
</template>

<script>
import { mapState } from 'vuex'

import getLinksImpactsJson from '~/assets/json/links-impacts.json'

import Link from '~/components/BaseLink.vue'

export default {
  components: {
    Link
  },

  props: {
    size: {
      type: Array,
      required: true
    }
  },

  asyncData({ params }) {
    return { getLinksImpactsJson }
  },

  data() {
    return {
      WINDOW: {
        innerHeight: 0,
        innerWidth: 0
      },
      linksImpacts: []
    }
  },

  computed: {
    ...mapState({ panZoomCoords: (state) => state.panZoomCoords })
  },

  created() {
    this.linksImpacts = getLinksImpactsJson
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted TheLinksImpact')
    })
  }
}
</script>

<style lang="scss" scoped>
#IMPACT_LINKS {
  position: fixed;
  /* z-index: 1; */
  pointer-events: none;
}
</style>
