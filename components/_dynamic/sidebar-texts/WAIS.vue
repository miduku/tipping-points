<template lang="md">
  ## West Antarctic Ice Sheet Loss

  Even though the West Antarctic Ice Sheet isn’t the biggest Antarctic region it could, if completely melted, raise global sea levels by around 3,3 meters. As a result global coastlines would be altered substantially.

  Warmer temperatures are the major source for ice sheet loss. Especially wind and ocean heat since great parts of the West Antarctic Ice Sheet lie beneath sea level.<SourceAnchorLink to-id="1" /> Grounded ice sheet bases thin and melt underwater on account of the warm ocean. Simultaneously warm winds increase ablation<SourceAnchorLink to-id="17" /> and surface melting, ultimately developing ice shelves that float toward the coast.

  This so-called Marine Ice Sheet Instability is a self-sustaining event where the grounding line (meaning the boundary line underneath the glacier where the grounded ice sheet becomes a floating ice shelf) recedes. This lifts more ice off the seafloor and turns it into floating ice shelves. The ice then flows faster, from its interior towards the coast and southern ocean, which causes more thinning and lastly more lifted ice.<SourceAnchorLink to-id="18" /> Usually the lost ice gets replaced by fresh snowfall but increasing temperatures cause less snowfall. The ice loss process accelerates as the ice sheet loses more ice to the ocean than it gains in snow, resulting in rising sea levels.<SourceAnchorLink to-id="1" />

  In Antarctica the Amundsen sea sector glaciers contribute the most to global sea levels.<SourceAnchorLink to-id="1" /> And although ice loss will take centuries to complete<SourceAnchorLink to-id="19" />, it is suspected that the West Antarctic Ice Sheet currently is in the early stages of marine ice sheet instability<SourceAnchorLink to-id="20" />. It’s proven that between 1992 and 2017 the ice loss rate has tripled.<SourceAnchorLink to-id="21" />
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
