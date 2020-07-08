<template>
  <div class="nav nav-main" :style="sidebarSourcesIsOpen ? 'z-index: 0' : ''">
    <div class="title">
      <h2>Tipping Points</h2>
    </div>

    <nav :class="linksImpactsButtonsIsActive" class="nav-main--impacts">
      <ul>
        <li v-for="(impact, i) in impacts" :id="impact.id" :key="i">
          <ButtonHexagon
            :title="impact.title"
            :desc="impact.desc"
            :icon="impact.id"
            class="vuex-pan-to is-normal-case"
            @click="toggleImpactLinksGroup(impact.id)"
          />
        </li>
      </ul>
    </nav>

    <nav class="nav-main--meta">
      <ul class="map-controls">
        <li>
          <Button icon="eye-open" icon-position="right" @click="toggleMap">
            Map
          </Button>
        </li>
      </ul>

      <ul class="zoom-controls">
        <li>
          <Button icon="minus" @click="zoomOut" />
        </li>
        <li>
          <Button icon="plus" @click="zoomIn" />
        </li>
        <li>
          <span @click.prevent="vuexSmoothZoomAbs(1)">{{ zoomLevel }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'
import vuexSmoothZoomAbs from '~/mixins/vuexSmoothZoomAbs'

import impactImpactsJson from '~/assets/json/impacts.json'

import ButtonHexagon from '~/components/BaseButtonHexagon.vue'
import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button,
    ButtonHexagon
  },

  mixins: [vuexPanTo, vuexSetSidebar, vuexSmoothZoomAbs],

  asyncData({ params }) {
    return { impactImpactsJson }
  },

  data() {
    return {
      impacts: {},
      zoomLevel: '100%',
      linksImpactsButtonsIsActive: ''
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      impactLinksGroups: (state) => state.impactLinksGroups,
      isMapVisible: (state) => state.isMapVisible,
      sidebarSourcesIsOpen: (state) => state.sidebarSources.isOpen
    })
  },

  watch: {
    panZoomCoords(value) {
      this.zoomLevel = Math.round(value[2] * 100) + '%'
    },

    impactLinksGroups: {
      handler(value) {
        let groupId = ''

        for (const [id, bool] of Object.entries(value)) {
          groupId += bool ? ' is-' + id : ''
        }

        // Get which impact links are visible
        this.linksImpactsButtonsIsActive = groupId
      },
      deep: true
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted TheNavMain')
      this.impacts = impactImpactsJson
      this.$store.commit('SET_MOUNTED', ['theNavMain', true])
    })
  },

  methods: {
    toggleMap() {
      if (this.isMapVisible) {
        this.$store.commit('SET_MAP_VISIBLE', false)
      } else {
        this.$store.commit('SET_MAP_VISIBLE', true)
      }
    },

    toggleImpactLinksGroup(id) {
      let bool = false

      this.$store.state.impactLinksGroups[id] === true
        ? (bool = false)
        : (bool = true)

      this.$store.commit('SET_IMPACT_LINKS_GROUPS', [id, bool])
    },

    zoomIn() {
      const newZoomLevel = this.panZoomCoords[2] + 0.5
      this.vuexSmoothZoomAbs(newZoomLevel)
    },

    zoomOut() {
      const newZoomLevel = this.panZoomCoords[2] - 0.5
      this.vuexSmoothZoomAbs(newZoomLevel)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;

  &.nav-main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 0;
    z-index: 10;
    padding: $margin;

    > * {
      display: flex;
      height: calc(100vh / 3 - #{$margin});
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .title {
    position: relative;
    width: 50vw;

    h1 {
      position: absolute;
    }
  }

  .nav-main--impacts {
    align-items: center;
  }

  .nav-main--meta {
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    /* width: 100vw; */

    ul {
      margin-top: $margin / 2;

      li {
        > * {
          pointer-events: all;
        }
      }
    }

    ul.zoom-controls {
      display: flex;
      flex-direction: row;
      align-items: center;

      li {
        margin-right: 0.5rem;

        &:last-child {
          margin-left: 0.5rem;

          span {
            color: rgba($dark-grey, 0.75);
            background: rgba(white, 0.9);
            border: 1px solid rgba($dark-grey, 0.25);
            border-radius: 2rem;
            padding: 0 0.5rem;
            transition: all 0.5s $easeOutQuint;
            cursor: pointer;

            &:focus,
            &:hover {
              color: rgba($dark-grey, 0.9);
              /* background: rgba(white, 0.9); */
              border-color: rgba($dark-grey, 0.75);
            }
          }
        }
      }
    }
  }
}
</style>
