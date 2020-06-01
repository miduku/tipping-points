<template>
  <nav class="nav nav-main">
    <ul class="nav-main--impacts">
      <!-- <li id="IMPACT-0">
        <button class="button vuex-pan-to" @click.prevent="vuexPanTo('AMZN')">
          <div>Amazon</div>
        </button>
      </li>
      <li id="IMPACT-1">
        <button class="button vuex-pan-to" @click.prevent="vuexPanTo('AMOC')">
          <div>Atlantic</div>
        </button>
      </li> -->
      <li id="IMPACT-TEMP">
        <ButtonHexagon
          title="Increase in global weather temperatures"
          class="vuex-pan-to"
        />
      </li>
      <li id="IMPACT-ALB">
        <ButtonHexagon title="Albedo Impact" class="vuex-pan-to" />
      </li>
      <li id="IMPACT-CO2">
        <ButtonHexagon
          title="Increase in global CO2 levels"
          class="vuex-pan-to"
        />
      </li>
      <li id="IMPACT-SEA">
        <ButtonHexagon
          title="Increase in global sea levels"
          class="vuex-pan-to"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import ButtonHexagon from '~/components/BaseButtonHexagon.vue'

export default {
  components: {
    ButtonHexagon
  },
  mounted() {
    this.$nextTick(function() {})
  },

  methods: {
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
</script>
