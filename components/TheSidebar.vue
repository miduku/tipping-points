<template>
  <div class="sidebar" :class="isOpen ? 'is-open' : 'is-closed'">
    <component :is="textInstance" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isOpen: (state) => state.sidebar.isOpen,
      contentInstanceName: (state) => state.sidebar.contentInstanceName
    }),

    textInstance() {
      if (this.contentInstanceName.length > 0) {
        return () =>
          import(
            `~/components/_dynamic/sidebar-texts/${this.contentInstanceName}`
          )
      }

      return null
    }
  },

  watch: {
    isOpen(value, oldValue) {
      if (value !== oldValue) {
        setTimeout(() => {
          this.vuexPanTo(this.contentInstanceName)
        }, 500)
      }
    }
  },

  methods: {
    vuexPanTo(nodeId) {
      this.$store.commit('TO_NODE_ID', nodeId)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: hotpink;
  transition: right 0.5s $easeOutQuint;
}

.is-closed {
  right: -50vw !important;
}
</style>
