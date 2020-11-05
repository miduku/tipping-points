<template>
  <div class="root">
    <nuxt />

    <TheModalCookie v-if="$store.state.cookies.is_cookieBannerActive" />
  </div>
</template>

<script>
import TheModalCookie from '~/components/TheModalCookie.vue'
export default {
  components: {
    TheModalCookie
  }
}
</script>

<style lang="scss" scoped>
.root {
  margin: 8rem auto;
  max-width: 500px;
  width: 100%;

  /deep/ h2 {
    font-size: 3rem;
    line-height: 3.5rem;
    margin-bottom: 2.5rem;
  }
}
</style>
