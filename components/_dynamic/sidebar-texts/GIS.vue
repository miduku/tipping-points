<template lang="md">
  ## Greenland Ice Sheet Disintegration

  “The Greenland Ice Sheet is the second largest mass of ice on Earth”<SourceAnchorLink toId="1" />. As it is one of the major contributors to global-sea-level rise<SourceAnchorLink toId="5" /> it could add up to 7,2 meters once completely melted.<SourceAnchorLink toId="1" /> There is very high confidence that the past two decades ice has been lost and high confidence that the mass loss rate has accelerated.<SourceAnchorLink toId="6" />

  <p>
      But why is it melting? <br>
      <span id="GIS-1-input" class="is-highlightable">Higher global temperatures mostly influence the surfaces of Greenland Ice Sheets.</span> <span id="GIS-1-output" class="is-highlightable">This initiates a self-reinforcing process where melting causes lower ice sheets, shifting them to lower and warmer altitudes.</span> Therefore resulting in further melting.
      Linked to the surface ice decline is the darkening of it through various impacts. This contributes to the albedo reduction. Thanks to the albedo effect, more sun energy can be reflected back by white snow.<SourceAnchorLink toId="1" />
      <br>
      Meaning darker ice surfaces absorb more solar radiation and retain less meltwater which, besides yet more melting, leads to water running off into the ocean.<SourceAnchorLink toId="7" />
  </p>

  Less meltwater can be retained because of it trickling down into the snowpack and filling the pores in the snow, which when it refreezes radiates more heat, hindering the hold of any additional meltwater. Other events leading to rising sea-levels are: melting ice sheet bases and breaking off iceberg edges.<SourceAnchorLink toId="1" />

  One probable threshold value lies around 3°C for changes in Greenland annual average temperature compared to pre-industrial and if a temperature above this is maintained for an extended time period it could result in a partial or near-complete ice loss on Greenland.<SourceAnchorLink toId="8" /> An irreversible collapse is to be expected after surpassing a certain threshold.<SourceAnchorLink toId="1" /> But changes in ice discharge take up to several thousand years<SourceAnchorLink toId="9" /> making it ““exceptionally unlikely” that the Greenland ice sheet will suffer near-complete disintegration in the 21st century”.<SourceAnchorLink toId="1" />
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
