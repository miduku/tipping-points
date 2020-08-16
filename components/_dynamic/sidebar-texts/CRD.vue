<template lang="md">
  ## Coral Reef Die-Off

  This is arguably the most sensitive of all nine tipping points mentioned and is in immediate danger on account of global warming. Coral Reefs are very likely to collapse in the following decades if the average global temperature exceeds 1,5°C. This would have fatal consequences for life on earth.

  Coral reefs are, although covering less than 0,1% of the sea ground, one of the most biological complex and valuable ecosystems worldwide, harbouring around a quarter of all marine diversity. Not only animal and plant species highly depend on them (as a source for shelter and food amongst other things), but even around half a billion humans. They are of great economic importance, providing business like fishery or diving tourism, as well as protecting coastal regions from flooding and erosion.

  With few exceptions, coral reefs can be found 30 degrees north and south of the equator. Most coral reefs exist in shallow water, provided with sufficient sunlight and at water temperatures between 18°C and 30°C, meaning that they are particularly sensitive to water quality changes.

  With rising temperatures in the last 40 years mass bleaching events of coral reefs have occurred five times more frequently. Corals bleach when miniscule algae (zooxanthellae), that live in the coral tissue and give them their color, become toxic due to higher water temperatures and are rejected. Ultimately only a white calcium carbonate skeleton remains. Even though corals can recover from temporary heat waves and readopt the zooxanthellae, it can take up to several decades. However if these events happen frequently and over extended periods of time they will cause permanent bleaching, as corals and algae live in a symbiotic relationship and are highly dependent on each other.

  An alarming example is the Great Barrier Reef, which has lost around half of its riffs between 2014 and 2017, whilst taking up an area as large as Japan and being the world’s largest coral reef system. This is partly on account of human activity like overfishing, destructive fishing practices or pollution (leakage of toxic substances, trash and micro plastic, etc.). These stressors lead to a loss of herbivorous fish, that usually feed on intrusive algae. Without them   the algae grow into macro-algae that take over dead coral skeletons and hinder them from being recolonised by corals.

  Another significant threat poses the increasing CO2 concentration on the atmosphere, as oceans absorb circa a quarter of man-made CO2 emissions yearly. Hence the ocean acidity has increased by 30% since the industrial revolution and is assumed to additionally rise by 40% above current levels until the end of this century. Coral and reef growth will slow down or stop entirely due to ocean acidification and “[t]he large-scale loss of functionally diverse corals is a harbinger of further radical shifts in the condition and dynamics of all ecosystems”.
</template>

<script>
import SourceAnchorLink from '~/components/BaseSourceAnchorLink.vue'

export default {
  components: {
    SourceAnchorLink
  },

  mounted() {
    this.$nextTick(function() {
      this.$emit('isReady')
    })
  }
}
</script>
