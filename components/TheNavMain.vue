<template>
  <nav class="nav nav-main">
    <ul class="nav-main--impacts">
      <li v-for="(impact, i) in impacts" :id="impact.id" :key="i">
        <ButtonHexagon :title="impact.title" class="vuex-pan-to" />
      </li>
    </ul>
  </nav>
</template>

<script>
import getImpactsJson from '~/assets/json/impacts.json'
import ButtonHexagon from '~/components/BaseButtonHexagon.vue'

export default {
  components: {
    ButtonHexagon
  },

  asyncData({ params }) {
    console.log(params)
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
  },

  methods: {
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
</script>
