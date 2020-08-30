<template lang="md">
  ## Boreal Forest Shift

  The boreal forests are located in the cold, low-rain climate zones in the northern hemisphere.<SourceAnchorLink to-id="1" /> They cover large parts of North America, Northern Europe and Asia. The coniferous forests are characterized by tree species such as pine, spruce and larch, which are particularly cold-resistant. As the largest biome, boreal forests make up almost a third of the total forest area worldwide.<SourceAnchorLink to-id="51" /> They bind around a third of global carbon and are therefore a very important carbon storage.<SourceAnchorLink to-id="52" />

  <span id="h-BFS-input-0" class="is-highlightable">Climate change has a particularly strong impact on this ecosystem because temperatures in the northern regions are currently rising twice as fast as the global average.<SourceAnchorLink to-id="53" /> As a result, the forests are exposed to increasing stress, especially on the southern edge of the boreal zone.<SourceAnchorLink to-id="54" /></span> <span id="h-BFS-output-4" class="is-highlightable">Extreme weather conditions, increased forest fires, droughts, storms, pests and the human wear and tear of the land are disrupting vegetation and regeneration.<SourceAnchorLink to-id="1" /></span> <span id="h-BFS-output-0" class="is-highlightable">The forests are gradually dying due to lack of water and increased evaporation.</span> Therefore the habitat of many animals and plants is disappearing.<SourceAnchorLink to-id="54" /> <span id="h-BFS-output-1" class="is-highlightable">What remains are bush and grasslands, which promote further regional warming and increased fire frequencies – a feedback effect.<SourceAnchorLink to-id="18" /></span>

  Studies<SourceAnchorLink to-id="55" /> show that the coniferous forests are increasingly moving to the north.<SourceAnchorLink to-id="53" /> They shift into the tree-free cold steppes (tundra), which are dominated by permafrost.<SourceAnchorLink to-id="1" /> <span id="h-BFS-output-2" class="is-highlightable">The once white areas, which reflect the sun's rays and keep the surface cool, are gradually becoming darker due to the overgrowth of the forests. Dark land surfaces absorb sun rays and store the heat in the soil, which contributes to the promotion of plant growth (vegetation albedo).<SourceAnchorLink to-id="56" /></span> <span id="h-BFS-input-1" class="is-highlightable">Due to the change in the reflectivity on the surface of the land, the permafrost is thawing.<SourceAnchorLink to-id="1" /></span> <span id="h-BFS-output-3" class="is-highlightable">This implies a massive release of carbon. Scientists assume that the upper layers of permafrost soils store between 1,300 and 1,600 gigatons of carbon in the form of carbon dioxide and methane. These originate from animal and plant remains since the Ice Age.<SourceAnchorLink to-id="57" /> This corresponds<SourceAnchorLink to-id="58" /> to approximately twice the amount in the current earth's atmosphere.<SourceAnchorLink to-id="11" /></span>
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
