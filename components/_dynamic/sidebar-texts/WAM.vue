<template lang="md">
  ## West African Monsoon Shift

  A monsoon is defined by a reversal of winds and moves with the position of the sun. West Africa experiences dry winds coming from the inland from November to May. Whilst around June to September northward winds bring rainfall originating from the North Atlantic.<SourceAnchorLink to-id="1" /> This seasonal phenomenon has shown severe impact on the Sahel climate. Sahel is a semi-arid region between the northern Sahara desert and southern tropical forest, stretching from east to west on the African continent.<SourceAnchorLink to-id="1" />

  While the 1950s and 60s stood out due to their wet conditions, the 1970s and 80s were defined by droughts and consequential famines.<SourceAnchorLink to-id="23" /> This demonstrated the exceptional sensitivity of the Monsoon, that is mostly contingent on sea surface temperatures. For example “warming over the tropics leads to drought over the Sahel, whereas warming over the North Atlantic promotes increased rainfall.”<SourceAnchorLink to-id="24" />

  As ocean temperatures increase the temperature contrast in the summer between the hot land surface and cooler waters reduces, which causes the monsoon to shift southward. Consequently, this provokes more droughts.<SourceAnchorLink to-id="1" /> It has been suggested that anthropogenic factors like greenhouse gas emissions and sulfate aerosols are partly at fault.<SourceAnchorLink to-id="25" /> Rising global temperatures are responsible for faster moisture evaporation of the land<SourceAnchorLink to-id="26" /> and therefore decreasing local rainfalls. Which again leads to less vegetation growth, lastly stimulating the desertification process.<SourceAnchorLink to-id="27" />

  Global warming of 1,5°C entails more severe droughts and declining crop yields. But “[u]nder global warming of more than 2°C, the western Sahel might experience the strongest drying and experience serious food security issues.”<SourceAnchorLink to-id="28" />
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
