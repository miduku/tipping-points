<template lang="md">
  ## Coral Reef Die-Off

  This is arguably the most sensitive of all nine tipping points mentioned and is in immediate danger on account of global warming.<SourceAnchorLink to-id="1" /> <span id="h-CRD-output-0" class="is-highlightable">Coral Reefs are very likely to collapse in the following decades if the average global temperature exceeds 1,5 °C.<SourceAnchorLink to-id="18" /></span> This would have fatal consequences for life on earth.

  Coral reefs are, although covering less than 0,1% of the sea ground, one of the most biological complex and valuable ecosystems worldwide.<SourceAnchorLink to-id="31" /> They harbour around a quarter of all marine diversity.<SourceAnchorLink to-id="32" /> Not only animal and plant species highly depend on them (as a source for shelter and food amongst other things)<SourceAnchorLink to-id="33" /> but even around half a billion humans.<SourceAnchorLink to-id="34" /> Reefs are of great economic importance, providing business like fishery or diving tourism, as well as protecting coastal regions from flooding and erosion.<SourceAnchorLink to-id="33" />

  Most coral reefs exist in shallow water, provided with sufficient sunlight and at water temperatures between 18°C and 30°C. Making them particularly sensitive to water quality changes.<SourceAnchorLink to-id="34" /> <span id="h-CRD-input-1" class="is-highlightable">With rising temperatures in the last 40 years mass bleaching events of coral reefs have occurred five times more frequently.</span>

  Corals bleach when miniscule algae (zooxanthellae), that live in the coral tissue and give them their color, become toxic and are rejected. This happens due to higher water temperatures. Ultimately only a white calcium carbonate skeleton remains. Even though corals can recover from temporary heat waves and readopt the zooxanthellae<SourceAnchorLink to-id="1" />, it can take up to several decades.<SourceAnchorLink to-id="32" /> However, if these events happen frequently and over extended periods of time they will cause permanent bleaching, as corals and algae are highly dependent on each other.<SourceAnchorLink to-id="35" />

  An alarming example is the Great Barrier Reef, which has lost around half of its riffs between 2014 and 2017. It takes up an area as large as Japan and is the world’s largest coral reef system.<SourceAnchorLink to-id="36" /> <span id="h-CRD-input-0" class="is-highlightable">The loss is partly on account of human activity like overfishing, destructive fishing practices or pollution (leakage of toxic substances, trash and micro plastic, etc.).<SourceAnchorLink to-id="37" /></span> <span id="h-CRD-output-2" class="is-highlightable">These stressors lead to a loss of herbivorous fish, that usually feed on intrusive algae.</span> <span id="h-CRD-output-1" class="is-highlightable">Without them the algae grow into macro-algae that take over dead coral skeletons and hinder them from being recolonised by corals.<SourceAnchorLink to-id="1" /></span>

  Another significant threat poses the increasing CO2 concentration on the atmosphere, as oceans absorb circa a quarter of man-made CO2 emissions yearly. Hence the ocean acidity has increased by 30% since the industrial revolution and is assumed to additionally rise by 40% above current levels until the end of this century. <span id="h-CRD-input-2" class="is-highlightable">Coral and reef growth will slow down or stop entirely due to ocean acidification.<SourceAnchorLink to-id="37" /></span> “The large-scale loss of functionally diverse corals is a harbinger of further radical shifts in the condition and dynamics of all ecosystems”.<SourceAnchorLink to-id="1" />
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
