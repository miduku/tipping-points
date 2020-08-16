<template lang="md">
  ## Boreal Forest Shift

  The boreal forests are located in the cold, low-rain climate zones in the northern hemisphere and cover large parts of North America, Northern Europe and Asia. The coniferous forests are characterized by tree species such as pine, spruce and larch, which are particularly cold-resistant. As the largest biome, boreal forests make up almost a third of the total forest area worldwide. They bind around a third of global carbon and are therefore a very important carbon storage.

  Climate change has a particularly strong impact on this ecosystem. Because temperatures in the northern regions are currently rising twice as fast as the global average. As a result, the forests are exposed to increasing stress, especially on the southern edge of the boreal zone. Extreme weather conditions, increased forest fires, droughts, storms, pests and the human wear and tear of the land are disrupting vegetation and regeneration. The forests are gradually dying due to lack of water and increased evaporation, and the habitat of many animals and plants is therefore disappearing. What remains are bush and grasslands, which promote further regional warming and increased fire frequencies - a feedback effect.

  Studies show that the coniferous forests are increasingly moving to the north. They shift into the tree-free cold steppes (tundra), which are dominated by permafrost. The once white areas, which reflect the sun's rays and keep the surface cool, are gradually becoming darker due to the overgrowth of the forests. Dark land surfaces absorb sun rays and store the heat in the soil, which contributes to the promotion of plant growth (vegetation albedo). Due to the change in the reflectivity on the surface of the land, the permafrost is thawing. Scientists assume that the upper layers of permafrost soils store between 1,300 and 1,600 gigatons of carbon in the form of carbon dioxide (CO2) and methane (CH4), which have come from animal and plant remains since the Ice Age. This corresponds to approximately twice the amount in the current earth's atmosphere.

  An estimated tipping point of the boreal ecosystem between 3°C and 4° C is assumed. Due to the complexity and various dependencies such as feedback processes, this assumption remains rather vague.
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
