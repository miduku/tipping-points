<template lang="md">
  ## Atlantic Meridional Overturning Circulation Breakdown

  The Atlantic Meridional Overturning Circulation (AMOC) is a current system in the Atlantic Oceans that is responsible for transportation of warm and cold waters between the North and South.<SourceAnchorLink to-id="39" /> Starting from the Gulf of Mexico, warm, salty and therefore less dense water flows polewards in the upper ocean layers. This is known as the Gulf Stream and North Atlantic Current. When the water reaches the North it cools down, gains density and sinks. After that it returns towards the southern hemisphere in greater depth than before.<SourceAnchorLink to-id="1" /> The AMOC is significant as it is part of a global-scale current system. It releases heat into the atmosphere and influences ocean nutrient and carbon dioxide cycles.<SourceAnchorLink to-id="40" />

  <span id="h-AMOC-input-0" class="is-highlightable">Rising global temperatures and CO2 levels have caused freshwater from increased rainfall and melting ice to dilute the salty sea water.</span> <span id="h-AMOC-output-0" class="is-highlightable">Consequently the water lightens and is not able to sink (as before), slowing down the whole circulation.<SourceAnchorLink to-id="1" /></span> <span id="h-AMOC-output-1" class="is-highlightable">When the circulation slows down, less salty water flows northward, as the AMOC is unable to pull warm, salty water from the south.</span> This results in less density and smaller amounts of water sinking. Lastly this establishes a self-reinforcing system.<SourceAnchorLink to-id="1" /> A major contributor to freshwater increase is the Greenland Ice Sheet, which has been melting during the past two decades.<SourceAnchorLink to-id="41" />

  There is evidence that the AMOC “has weakened by 15% since the middle of the last century”.<SourceAnchorLink to-id="42" /> A shutdown or even reversal of the circulation would have an enormous impact on the climate of the northern hemisphere by cooling it excessively.<SourceAnchorLink to-id="43" /> <span id="h-AMOC-output-2" class="is-highlightable">Ensuing a cooling of the North Atlantic less evaporation occurs.</span> <span id="h-AMOC-output-3" class="is-highlightable">This decreases rainfall and provokes a termination of arable agriculture.<SourceAnchorLink to-id="44" /></span> After passing a tipping point its decline will take several hundred years but “[i]t is very likely that the AMOC will weaken over the 21st century.”<SourceAnchorLink to-id="26" />
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
