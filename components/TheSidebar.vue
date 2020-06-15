<template>
  <div class="sidebar" :class="sidebarIsOpen ? 'is-open' : 'is-closed'">
    <Button class="sidebar-button is-bordered" @click="vuexSetSidebar([false])">
      Close
    </Button>

    <component :is="textInstance" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Button from '~/components/BaseButton.vue'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

export default {
  components: {
    Button
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  computed: {
    ...mapState({
      sidebarIsOpen: (state) => state.sidebar.isOpen,
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
    sidebarIsOpen(value, oldValue) {
      if (value !== oldValue && value) {
        setTimeout(() => {
          console.log('dragged from sidebar')
          this.vuexPanTo(this.contentInstanceName)
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: white;
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

  &.is-open {
    .sidebar-button {
      animation: appear 0.5s $easeOutQuint 0.75s forwards;
    }
  }

  &.is-closed {
    right: -50vw !important;
  }

  /deep/ section {
    padding: 2.5rem;
    overflow: auto;
    display: block;
    height: inherit;
    opacity: 0;
    transform: translateX(1rem);
    animation: appear 0.5s $easeOutQuint 0.25s forwards;

    &::before {
      content: '— tipping point';
      font-variant: small-caps;
      line-height: 1.5rem;
    }

    > :last-child {
      margin-bottom: 2.5rem;
    }
  }

  .sidebar-button {
    position: absolute;
    bottom: $margin;
    right: 100%;
    opacity: 0;
    transform: translateX(1rem);
    transition: opacity 0.5s ease;
  }
}

@keyframes appear {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>