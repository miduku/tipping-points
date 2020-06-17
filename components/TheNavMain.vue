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
      <ul>
        <li>dd</li>
      </ul>
      <ul>
        <li>aaa</li>
      </ul>
    </nav>

    <!-- <ButtonHexagon title="AMZN" @click="vuexPanTo('AMZN')" />
-->

    <!-- <ButtonHexagon
      title="open sidebar"
      @click="vuexSetSidebar([true, 'AMZN'])"
    /> -->
    <!-- <ButtonHexagon title="close sidebar" @click="vuexSetSidebar([false])" /> -->
  </div>
</template>

<script>
import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

import impactImpactsJson from '~/assets/json/impacts.json'
import ButtonHexagon from '~/components/BaseButtonHexagon.vue'

export default {
  components: {
    ButtonHexagon
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  asyncData({ params }) {
    return { impactImpactsJson }
  },

  data() {
    return {
      impacts: {}
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
  }
}
</style>
