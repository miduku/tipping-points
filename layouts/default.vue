<template>
  <div class="root">
    <TheNavMain />

    <nuxt />
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
