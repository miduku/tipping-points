<template>
  <div class="sidebar" :class="isOpen ? 'is-open' : 'is-closed'">
    <component :is="textInstance" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'

export default {
  mixins: [vuexPanTo],

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
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: hotpink;
  transition: right 0.5s $easeOutQuint;

  &::before {
    content: '';
    position: absolute;
    width: 10%;
    height: inherit;
    background: blue;
    right: 100%;
    pointer-events: none;
    background: linear-gradient(
      -90deg,
      #ffffff 50%,
      rgba(255, 255, 255, 0.991353) 53.33%,
      rgba(255, 255, 255, 0.96449) 56.67%,
      rgba(255, 255, 255, 0.91834) 60%,
      rgba(255, 255, 255, 0.852589) 63.33%,
      rgba(255, 255, 255, 0.768225) 66.67%,
      rgba(255, 255, 255, 0.668116) 70%,
      rgba(255, 255, 255, 0.557309) 73.33%,
      rgba(255, 255, 255, 0.442691) 76.67%,
      rgba(255, 255, 255, 0.331884) 80%,
      rgba(255, 255, 255, 0.231775) 83.33%,
      rgba(255, 255, 255, 0.147411) 86.67%,
      rgba(255, 255, 255, 0.0816599) 90%,
      rgba(255, 255, 255, 0.03551) 93.33%,
      rgba(255, 255, 255, 0.0086472) 96.67%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

.is-closed {
  right: -50vw !important;
}
</style>
