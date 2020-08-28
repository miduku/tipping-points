<template>
  <div
    class="nav nav-main"
    :style="
      (sidebarSourcesIsOpen ? 'z-index: 0' : '',
      isMinimalNav ? 'justify-content: flex-end' : '')
    "
  >
    <header v-if="!isMinimalNav" class="title">
      <div @click="openIntro">
        <h2>Tipping Points</h2>
        <p>And how they affect us</p>
      </div>
    </header>

    <nav
      v-if="!isMinimalNav"
      :class="linksImpactsButtonsIsActive"
      class="nav-main--impacts"
    >
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
      <ul class="meta-bar">
        <li>
          <nuxt-link to="/legal-privacy" target="_blank"
            >Legal & Privacy</nuxt-link
          >
        </li>
      </ul>

      <ul v-if="!isMinimalNav" class="nav-controls">
        <li>
          <Button
            :icon="isMapEyeOpen ? 'eye-open' : 'eye-close'"
            class="bu-map-toggle"
            icon-position="left"
            @click="toggleMap"
          >
            Map
          </Button>
        </li>

        <li>
          <Button icon="minus" only-icon @click="zoomOut" />
        </li>
        <li>
          <Button icon="plus" only-icon @click="zoomIn" />
        </li>
        <li>
          <span @click.prevent="smoothZoomAbs(1)">{{ zoomLevel }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

import impactImpactsJson from '~/assets/json/impacts.json'

import ButtonHexagon from '~/components/BaseButtonHexagon.vue'
import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button,
    ButtonHexagon
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  props: {
    isMinimalNav: {
      type: Boolean,
      default: false
    }
  },

  asyncData({ params }) {
    return { impactImpactsJson }
  },

  data() {
    return {
      impacts: {},
      zoomLevel: '100%',
      linksImpactsButtonsIsActive: '',
      isMapEyeOpen: true
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords,
      linksImpactGroups: (state) => state.links.impactGroups,
      isMapVisible: (state) => state.isMapVisible,
      sidebarSourcesIsOpen: (state) => state.sidebarSources.isOpen
    })
  },

  watch: {
    panZoomCoords(value) {
      this.zoomLevel = Math.round(value[2] * 100) + '%'
    },

    linksImpactGroups: {
      handler(value) {
        let linksImpactGroupId = ''

        for (const [id, bool] of Object.entries(value)) {
          linksImpactGroupId += bool ? ' is-' + id : ''
        }

        // Set which impact links are visible
        this.linksImpactsButtonsIsActive = linksImpactGroupId
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
        this.isMapEyeOpen = false
      } else {
        this.$store.commit('SET_MAP_VISIBLE', true)
        this.isMapEyeOpen = true
      }
    },

    toggleImpactLinksGroup(id) {
      let bool = false

      this.$store.state.links.impactGroups[id] === true
        ? (bool = false)
        : (bool = true)

      this.$store.commit('SET_LINKS_IMPACT_GROUPS', [id, bool])
    },

    zoomIn() {
      const newZoomLevel = this.panZoomCoords[2] + 0.5
      this.smoothZoomAbs(newZoomLevel)
    },

    zoomOut() {
      const newZoomLevel = this.panZoomCoords[2] - 0.5
      this.smoothZoomAbs(newZoomLevel)
    },

    smoothZoomAbs(newZoomLevel) {
      this.$store.commit('SET_NEW_ZOOM_LEVEL', newZoomLevel)
    },

    openIntro() {
      this.$store.commit('SET_MODE', ['isInit', true])
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
    /* z-index: 10; */
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
    display: block;

    > div {
      width: max-content;
      pointer-events: all;

      &:focus,
      &:hover {
        cursor: pointer;

        h2,
        p {
          transform: translateY(-0.25rem);
        }
      }

      h2,
      p {
        transition: transform 0.5s $easeOutQuint;
      }

      h2 {
        margin-bottom: 0.45rem;
      }

      p {
        font-size: 1.25rem;
        color: $dark-grey;
        padding-left: 0.25rem;
      }
    }
  }

  &.is-visible--impacts .nav-main--impacts {
    opacity: 1;
    visibility: visible;

    ul {
      li {
        button {
          pointer-events: all;
        }
      }
    }
  }

  .nav-main--impacts {
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s $easeOutQuint;
    pointer-events: none;

    ul {
      li {
        button {
          pointer-events: none;
        }
      }
    }
  }

  .nav-main--meta {
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    pointer-events: none;

    ul {
      margin-top: $margin / 2;
      width: max-content;

      li {
        > * {
          pointer-events: all;
        }

        .bu-map-toggle {
          margin-right: 1rem;
        }
      }
    }

    ul.meta-bar {
      padding-left: 0.25rem;

      a {
        opacity: 0.5;

        &:focus,
        &:hover {
          opacity: 1;
        }
      }
    }

    ul.nav-controls {
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
