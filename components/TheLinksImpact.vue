<template>
  <svg
    id="IMPACT_LINKS"
    :width="size[0]"
    :height="size[1]"
    :view-box.camel="`0 0 ${size[0]} ${size[1]}`"
    :class="linksImpactsClassesIsVisible"
  >
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
      linksImpacts: [],
      linksImpactsClassesIsVisible: ''
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      impactLinksGroups: (state) => state.impactLinksGroups
    })
  },

  watch: {
    impactLinksGroups: {
      handler(value) {
        let groupId = ''

        for (const [id, bool] of Object.entries(value)) {
          groupId += bool ? ' is-' + id : ''
        }

        this.linksImpactsClassesIsVisible = groupId
      },
      deep: true
    }
  },

  created() {
    this.linksImpacts = importLinksImpactsJson
  },

  mounted() {
    this.$nextTick(function() {
      // Get only the groups of impact links,
      // put them into an array and commit them into vuex
      this.$store.commit(
        'CREATE_IMPACT_LINKS_GROUPS',
        this.linksImpacts.reduce((r, a) => {
          r[a.group] = false
          return r
        }, {})
      )
    })
  }
}
</script>

<style lang="scss" scoped>
#IMPACT_LINKS {
  position: fixed;
  pointer-events: none;

  &.is-IMPACT-TEMP {
    /deep/ .link-group-IMPACT-TEMP {
      opacity: 1;
    }
  }

  &.is-IMPACT-CO2 {
    /deep/ .link-group-IMPACT-CO2 {
      opacity: 1;
    }
  }

  &.is-IMPACT-ALB {
    /deep/ .link-group-IMPACT-ALB {
      opacity: 1;
    }
  }

  &.is-IMPACT-SEA {
    /deep/ .link-group-IMPACT-SEA {
      opacity: 1;
    }
  }
}
</style>
