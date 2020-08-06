<template>
  <svg
    id="LINKS_IMPACTS"
    :width="size[0]"
    :height="size[1]"
    :view-box.camel="`0 0 ${size[0]} ${size[1]}`"
    :class="[
      linksImpactsClassesIsVisible,
      someNodeIsActive ? 'some-node-is-active' : '',
      currentActiveNode
    ]"
  >
    <g :class="currentActiveNode">
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
      linksImpactsClassesIsVisible: '',
      // someNodeIsActive: false,
      currentActiveNode: ''
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      linksImpactGroups: (state) => state.links.impactGroups,
      sidebarIsOpen: (state) => state.sidebar.isOpen,
      someNodeIsActive: (state) => state.someNodeIsActive,
      sidebarContentInstanceName: (state) => state.sidebar.contentInstanceName
    })
  },

  watch: {
    linksImpactGroups: {
      handler(value) {
        let linksImpactGroupId = ''

        for (const [id, bool] of Object.entries(value)) {
          linksImpactGroupId += bool ? ' is-' + id : ''
        }

        // Set which impact links are visible
        this.linksImpactsClassesIsVisible = linksImpactGroupId
      },
      deep: true
    },

    // sidebarIsOpen(value, oldValue) {
    //   if (value !== oldValue) {
    //     this.someNodeIsActive = value
    //   }
    // },

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
        'CREATE_LINKS_IMPACT_GROUPS',
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
#LINKS_IMPACTS {
  transform: translateZ(0);
  will-change: transform;
  position: fixed;
  pointer-events: none;
  /* animation: init 1s $easeOutQuint forwards; */
}
</style>
