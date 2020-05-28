<template>
  <svg
    id="IMPACT_LINKS"
    :width="size[0]"
    :height="size[1]"
    :view-box.camel="`0 0 ${size[0]} ${size[1]}`"
  >
    <rect x="500" y="500" width="100" height="100" />

    <!-- <Link
      v-for="(link, i) in LINKSIMPACT_JSON"
      :key="i"
      :link-data="link"
      :difference-coords="DIFFERENCE"
    /> -->
  </svg>
</template>

<script>
// import Link from '~/components/BaseLink.vue'

import getLinksImpacts from '~/assets/json/links-impacts.json'

export default {
  components: {
    // Link
  },

  props: {
    size: {
      type: Array,
      required: true
    }
  },

  asyncData({ params }) {
    return { getLinksImpacts }
  },

  data() {
    return {
      WINDOW: {
        innerHeight: 0,
        innerWidth: 0
      },
      DIFFERENCE: [0, 0, 1]
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log('LINKSIMPACT_JSON', getLinksImpacts)
    })
  },

  methods: {
    setNewCoordinatesDifference(x, y, scale) {
      // TODO get difference from vuex
    }
  }
}
</script>

<style lang="scss" scoped>
#IMPACT_LINKS {
  position: fixed;
  z-index: 9;
  pointer-events: none;
}
</style>
