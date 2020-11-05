<template>
  <sup>
    <a :href="`#source-${toId}`" @click.prevent="openSidebarSources">
      {{ toId }}
    </a>
    &nbsp;
  </sup>
</template>

<script>
export default {
  props: {
    toId: {
      type: String,
      required: true
    }
  },

  methods: {
    openSidebarSources() {
      this.$store.commit('SET_SIDEBARSOURCES', [true, parseInt(this.toId)])
    }
  }
}
</script>

<style lang="scss" scoped>
sup {
  line-height: 1;
  opacity: 0.7;

  a {
    text-decoration: none;
    font-weight: bold;
  }
}
</style>
