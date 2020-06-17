<template>
  <div class="nav nav-main">
    <div class="title">
      <h1>Tipping Points</h1>
    </div>

    <nav class="nav-main--impacts">
      <ul>
        <li v-for="(impact, i) in impacts" :id="impact.id" :key="i">
          <ButtonHexagon
            :title="impact.title"
            class="vuex-pan-to is-normal-case"
            @click="toggleImpactLinksGroup(impact.id)"
          />
        </li>
      </ul>
    </nav>

    <nav class="nav-main--meta">
      <ul class="zoom-controls">
        <li>
          <Button icon="minus" class="is-bordered" @click="zoomOut" />
        </li>
        <li>
          <Button class="is-bordered" icon="plus" @click="zoomIn" />
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
      zoomLevel: '100%'
    }
  },

  computed: {
    ...mapState({
      panZoomCoords: (state) => state.panZoomCoords
    })
  },

  watch: {
    panZoomCoords(value) {
      console.log('log')
      this.zoomLevel = Math.round(value[2] * 100) + '%'
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
  /* align-items: center; */
  pointer-events: none;
  /* background: pink; */

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &.nav-main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 0;
    /* width: 11em; */
    z-index: 10;
    padding: $margin;
    /* background: linear-gradient(
      90deg,
      #ffffff 50%,
      rgba(255, 255, 255, 0.991353) 53.33%,
      rgba(255, 255, 255, 0.96449) 56.67%,
      rgba(255, 255, 255, 0.91834) 60%,
      rgba(255, 255, 255, 0.852589) 63.33%,
      rgba(255, 255, 255, 0.768225) 66.67%,
      rgba(255, 255, 255, 0.668116) 70%,
      rgba(255, 255, 255, 0.557309) 73.33%,
      rgba(255, 255, 255, 0.442691) 76.67%,
      rgba(255, 255, 255, 0.331884) 80%,
      rgba(255, 255, 255, 0.231775) 83.33%,
      rgba(255, 255, 255, 0.147411) 86.67%,
      rgba(255, 255, 255, 0.0816599) 90%,
      rgba(255, 255, 255, 0.03551) 93.33%,
      rgba(255, 255, 255, 0.0086472) 96.67%,
      rgba(255, 255, 255, 0) 100%
    ); */

    > * {
      display: flex;
      height: calc(100vh / 3 - #{$margin});
    }
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
    align-items: flex-end;

    ul {
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
