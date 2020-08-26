<template lang="md">
  ## Permafrost Loss

  “Permafrost is the term used to describe ground (soil or rock) that remains at or below 0°C throughout the year for at least two consecutive years.”<SourceAnchorLink to-id="10" /> Around a quarter (24%) of the land surface on the northern hemisphere are permafrost grounds (e.g. Alaska, Siberia, Northern Canada). But it can also be found in some southern regions like Patagonia, Antarctica, South America or New Zealand’s southern Alps. Even parts of the Arctic Ocean sea floor is permanently frozen and thus called subsea permafrost.<SourceAnchorLink to-id="11" />

  Permafrost is typically made of two layers: a thin active layer that thaws every summer and a frozen layer.<SourceAnchorLink to-id="12" /> Over thousands of years a large amount of carbon has been developed by dead plants and animal remains. “There is around twice as much carbon in permafrost than is currently in the Earth’s atmosphere.”

  With global temperatures rising, permafrost thaws and releases stored greenhouse gases. What is responsible for this? Microbes contained in the soil wake from ice-induced hibernation and feed on the organic carbon. By doing so they convert it to carbon dioxide and methane (CH4).<SourceAnchorLink to-id="13" /> This initiates a vicious cycle as the release contributes to further climate warming, causing more large-scale permafrost thawing. The process is most likely to happen over many decades and centuries but changes in the cryosphere can already be observed. It is very certain that these changes will be irreversible<SourceAnchorLink to-id="14" /> and that a widespread disappearance of Arctic near-surface permafrost this century might occur.

  Besides increasing global temperatures impacts that enhance and trigger permafrost thaw are fire, abrupt drying events, soil subsidence and erosion.<SourceAnchorLink to-id="1" /> The permafrost loss induced carbon dioxide release also entails an increase of ocean acidification as atmospheric CO2 reacts with seawater.<SourceAnchorLink to-id="15" />
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
