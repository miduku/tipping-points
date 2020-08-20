<template>
  <svg
    id="LINKS_IMPACTS"
    :width="size[0]"
    :height="size[1]"
    :view-box.camel="`0 0 ${size[0]} ${size[1]}`"
    :class="[currentActiveNode]"
  >
    <g
      :class="currentActiveNode"
      :style="
        `opacity: ${
          (modeIsTutorial && tutorialStep >= 6) || !modeIsTutorial ? 1 : 0
        }`
      "
    >
      <Link
        v-for="(link, i) in linksImpactsJson"
        :key="i"
        :link-data="link"
        :difference-coords="panZoomCoords"
        class="links-impact"
      />
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'

import importLinksImpactsJson from '~/assets/json/links-impacts.json'

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
    return { importLinksImpactsJson }
  },

  data() {
    return {
      WINDOW: {
        innerHeight: 0,
        innerWidth: 0
      },
      linksImpactsJson: [],
      currentActiveNode: ''
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      sidebarIsOpen: (state) => state.sidebar.isOpen,
      sidebarContentInstanceName: (state) => state.sidebar.contentInstanceName,

      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    })
  },

  watch: {
    sidebarContentInstanceName(value, oldValue) {
      if (value !== oldValue) {
        this.currentActiveNode =
          'active-node-' + this.sidebarContentInstanceName
      }
    }
  },

  created() {
    this.linksImpactsJson = importLinksImpactsJson
  },

  mounted() {
    this.$nextTick(function() {
      // Get only the groups of impact links,
      // put them into an array and commit them into vuex
      this.$store.commit(
        'GENERATE_LINKS_IMPACT_GROUPS',
        this.linksImpactsJson.reduce((r, a) => {
          r[a.group] = false
          return r
        }, {})
      )
    })
  }
}
</script>

<style lang="scss" scoped>
#LINKS_IMPACTS > g {
  transition: opacity 0.5s $easeOutQuint;
}
</style>
