<template>
  <div class="root">
    <TheIntroOverlay />

    <TheNavMain />

    <div class="root-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheIntroOverlay from '~/components/TheIntroOverlay.vue'
import TheNavMain from '~/components/TheNavMain.vue'

export default {
  components: {
    TheIntroOverlay,
    TheNavMain
  }
}
</script>

<style lang="scss" scoped>
.root {
  position: relative;
}
</style>
