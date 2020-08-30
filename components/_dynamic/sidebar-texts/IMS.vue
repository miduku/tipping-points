<template lang="md">
  ## Indian Monsoon Shift

  The Indian Monsoon is the main source for annual rainfall in India, which makes farming possible and stimulates most of India’s economy. During the winter India experiences a dry wind that originates from the North. Though in summer the sun moves north of the equator, which heats up the landmass and causes a seasonal wind shift.<SourceAnchorLink to-id="1" /> Due to a difference in solar heating between land and ocean a pressure gradient develops and initiates a flow of moisture from the ocean that brings rainfall.<SourceAnchorLink to-id="26" />

  The warming climate however, changes the contrast between surface temperatures and causes monsoon alterations.<SourceAnchorLink to-id="27" /> As a warmer atmosphere can hold more moisture an increase in precipitation is presumed.<SourceAnchorLink to-id="28" /> <span id="h-IMS-input-0" class="is-highlightable">Yet air pollution in India is also considered to be a possible factor for declining rainfall.</span> Sulphur dioxide emissions, produced by industry and transport, discharge sulphates in the atmosphere that reflect solar radiation and cool down certain regions.

  <span id="h-IMS-output-0" class="is-highlightable">Although the monsoon will not reach a dry state in the near future,<SourceAnchorLink to-id="42" /> “the imprint of climate change is clearly manifest in the increasing frequency of extreme weather outcomes.”<SourceAnchorLink to-id="29" /></span> <span id="h-IMS-output-1" class="is-highlightable">And “[i]n particular, monsoon rainfall extremes can cause substantial crop damage across the subcontinent.” Regarding how these negative impacts majorly affect India’s agriculture (the aspect of food security among other things) and economy<SourceAnchorLink to-id="30" />, a prediction of changes is crucial.</span> According to IPCC it is relatively uncertain that monsoon changes will happen with global warming of 1,5 °C or 2 °C.<SourceAnchorLink to-id="18" />
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
