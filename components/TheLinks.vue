<template>
  <g id="outer-links">
    <Link v-for="(link, i) in data" :key="i" :link-data="link" class="links" />
  </g>
</template>

<script>
import Link from '~/components/BaseLink.vue'

export default {
  components: {
    Link
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  },

  mounted() {
    this.$nextTick(function() {
      console.log('mounted TheLinks')
    })
  }
}
</script>
