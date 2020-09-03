<template lang="md">
  ## Greenland Ice Sheet Disintegration

  “The Greenland Ice Sheet is the second largest mass of ice on Earth”.<SourceAnchorLink to-id="2" /> As it is one of the major contributors to global sea-level rise<SourceAnchorLink to-id="4" /> it could add up to 7,2 meters once completely melted.<SourceAnchorLink to-id="2" /> It is very likely that the past two decades ice has been lost and that the mass loss rate has accelerated.<SourceAnchorLink to-id="5" />

  But why is it melting?
  <span id="h-GIS-input-1" class="is-highlightable">Higher global temperatures mostly influence the surfaces of Greenland Ice Sheets.</span> <span id="h-GIS-output-1" class="is-highlightable">This initiates a self-reinforcing process where melting causes lower ice sheets.</span> Therefore shifting them to lower and warmer altitudes and resulting in further melting. <span id="h-GIS-output-0" class="is-highlightable">“Around half of the melt that the Greenland ice sheet experiences occurs at the surface.”</span>
  Linked to the surface ice decline is the darkening of it through various impacts. <span id="h-GIS-input-0" class="is-highlightable">This contributes to the albedo reduction and a snowline (the boundary between snow-covered and snow-free areas) migration to higher elevations as the ice sheet warms</span>. Thanks to the albedo effect, more sun energy can be reflected back by white snow.<SourceAnchorLink to-id="2" /> Meaning darker ice surfaces absorb more solar radiation and retain less meltwater. Ultimately this leads to yet more melting and water running off into the ocean.<SourceAnchorLink to-id="6" />

  ![Greenland Ice Sheet Disintegration](~assets/gif/gis.gif)

  <span id="h-GIS-output-2" class="is-highlightable">Less meltwater can be retained because of it trickling down into the snowpack and filling the pores in the snow. When the water refreezes it radiates more heat, hindering the hold of any additional meltwater</span>. Other events leading to rising sea levels are: melting ice sheet bases and breaking off iceberg edges.<SourceAnchorLink to-id="2" />

  If a temperature above 3°C is maintained for an extended time period it could result in a partial or near-complete ice loss on Greenland.<SourceAnchorLink to-id="7" /> An irreversible collapse is to be expected after surpassing a certain threshold.<SourceAnchorLink to-id="2" /> But changes in ice discharge take up to several thousand years.<SourceAnchorLink to-id="8" /> Meaning it is ““exceptionally unlikely” that the Greenland Ice Sheet will suffer near-complete disintegration in the 21st century”.<SourceAnchorLink to-id="2" />
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
