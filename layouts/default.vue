<template>
  <div class="root">
    <TheNavMain />

    <div class="root-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheNavMain from '~/components/TheNavMain.vue'

export default {
  components: {
    TheNavMain
  }
}
</script>
