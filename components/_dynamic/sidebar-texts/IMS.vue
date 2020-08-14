<template lang="md">
  ## Indian Monsoon Shift

  The Indian Monsoon is the main source for annual rainfall in India, which makes farming possible and stimulates most of India’s economy. During the winter India experiences a dry wind that originates from the North, in summer though the sun moves north of the equator, which heats up the landmass and causes a seasonal wind shift. Due to a difference in solar heating between land and ocean a pressure gradient develops and initiates a flow of moisture from the ocean that brings rainfall.

  The warming climate however, changes the contrast between surface temperatures and causes monsoon alterations. As a warmer atmosphere can hold more moisture an increase in precipitation is presumed. Yet air pollution in India is also considered to be a possible factor for declining rainfall. Sulphur dioxide emissions, produced by industry and transport, discharge sulphates in the atmosphere that reflect solar radiation and cool down certain regions.

  Thanks to this phenomenon the warming of surface temperature could have been concealed and increased rainfall repressed. But “the imprint of climate change is clearly manifest in the increasing frequency of extreme weather outcomes.” And “[i]n particular, monsoon rainfall extremes can cause substantial crop damage across the subcontinent.”

  Regarding how these negative impacts majorly affect India’s agriculture (the aspect of food security among other things) and economy, a prediction of changes is crucial. Thankfully according to IPCC “there is low confidence regarding changes in monsoons” with global warming of 1,5°C or 2°C.
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
