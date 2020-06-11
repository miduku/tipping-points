<template>
  <nav class="nav nav-main">
    <ul class="nav-main--impacts">
      <li v-for="(impact, i) in impacts" :id="impact.id" :key="i">
        <ButtonHexagon :title="impact.title" class="vuex-pan-to" />
      </li>
    </ul>

    <ButtonHexagon title="AMZN" @click="vuexPanTo('AMZN')" />
    <ButtonHexagon
      title="open sidebar"
      @click="vuexSetSidebar([true, 'AMZN'])"
    />
    <ButtonHexagon title="close sidebar" @click="vuexSetSidebar([false])" />
  </nav>
</template>

<script>
import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

import getImpactsJson from '~/assets/json/impacts.json'
import ButtonHexagon from '~/components/BaseButtonHexagon.vue'

export default {
  components: {
    ButtonHexagon
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  asyncData({ params }) {
    return { getImpactsJson }
  },

  data() {
    return {
      impacts: {}
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.impacts = getImpactsJson
      console.log('mounted TheNavMain')
      this.$store.commit('SET_MOUNTED', ['theNavMain', true])
    })
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  pointer-events: none;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      .button {
      }
    }
  }

  &.nav-main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 11em;
    z-index: 10;
    padding: $margin;
    // background: linear-gradient(
    //   90deg,
    //   #ffffff 50%,
    //   rgba(255, 255, 255, 0.991353) 53.33%,
    //   rgba(255, 255, 255, 0.96449) 56.67%,
    //   rgba(255, 255, 255, 0.91834) 60%,
    //   rgba(255, 255, 255, 0.852589) 63.33%,
    //   rgba(255, 255, 255, 0.768225) 66.67%,
    //   rgba(255, 255, 255, 0.668116) 70%,
    //   rgba(255, 255, 255, 0.557309) 73.33%,
    //   rgba(255, 255, 255, 0.442691) 76.67%,
    //   rgba(255, 255, 255, 0.331884) 80%,
    //   rgba(255, 255, 255, 0.231775) 83.33%,
    //   rgba(255, 255, 255, 0.147411) 86.67%,
    //   rgba(255, 255, 255, 0.0816599) 90%,
    //   rgba(255, 255, 255, 0.03551) 93.33%,
    //   rgba(255, 255, 255, 0.0086472) 96.67%,
    //   rgba(255, 255, 255, 0) 100%
    // );
  }
}
</style>
