<template>
  <div class="sidebar" :class="sidebarIsOpen ? 'is-open' : 'is-closed'">
    <div class="sidebar-content-wrapper">
      <div>
        <component
          :is="textInstance"
          class="sidebar-content"
          @isReady="isSidebarContentReady"
        />
      </div>
    </div>

    <div class="sidebar-button-wrapper">
      <Button @click="vuexSetSidebar([false, contentInstanceName])">
        Close
      </Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'
import vuexSetSidebar from '~/mixins/vuexSetSidebar'

import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button
  },

  mixins: [vuexPanTo, vuexSetSidebar],

  computed: {
    ...mapState({
      sidebarIsOpen: (state) => state.sidebar.isOpen,
      contentInstanceName: (state) => state.sidebar.contentInstanceName,
      // panToNodeZoomLevel: (state) => state.panToNode.zoomLevel,

      someChildNodeTimeStamp: (state) => state.someChildNode.timeStamp,
      someChildNodeIsActive: (state) => state.someChildNode.isActive,
      someChildNodeI: (state) => state.someChildNode.i,
      someChildNodeDirection: (state) => state.someChildNode.direction
    }),

    textInstance() {
      if (this.contentInstanceName && this.contentInstanceName.length > 0) {
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
          this.vuexPanTo(
            this.contentInstanceName,
            this.someChildNodeIsActive ? 1.5 : 1
          )
          this.isSidebarContentReady()
        }, 500)
      }
    },

    someChildNodeTimeStamp(value, oldValue) {
      if (value !== oldValue && this.sidebarIsOpen) {
        this.isSidebarContentReady()
      }
    }
  },

  methods: {
    isSidebarContentReady() {
      if (this.someChildNodeIsActive && this.sidebarIsOpen) {
        const SIDEBAR_CONTENT = this.$el.querySelector('.sidebar-content')
        const SIDEBAR_CONTENT_HIGHLIGHT = SIDEBAR_CONTENT.querySelector(
          `#h-${this.contentInstanceName}-${this.someChildNodeDirection}-${this.someChildNodeI}`
        )
        const SIDEBAR_CONTENT_HIGHLIGHTS_ALL = SIDEBAR_CONTENT.querySelectorAll(
          `.is-highlightable`
        )

        if (SIDEBAR_CONTENT_HIGHLIGHTS_ALL) {
          SIDEBAR_CONTENT_HIGHLIGHTS_ALL.forEach((element) => {
            element.classList.remove('is-highlighted')
          })
        }

        if (SIDEBAR_CONTENT_HIGHLIGHT) {
          SIDEBAR_CONTENT_HIGHLIGHT.classList.add('is-highlighted')

          this.$scrollTo(SIDEBAR_CONTENT_HIGHLIGHT, 1500, {
            easing: [0.23, 1, 0.32, 1],
            container: SIDEBAR_CONTENT,
            offset: -24
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: white;
  transition: right 0.5s $easeOutQuint;
  /* z-index: 10; */

  &.is-open {
    .sidebar-button-wrapper {
      animation: appear 0.5s $easeOutQuint 0.75s forwards;
    }
  }

  &.is-closed {
    right: -50vw !important;
  }

  &::before {
    content: '';
    position: absolute;
    width: 20%;
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

  .sidebar-content-wrapper {
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: #fff;

    > div {
      /* transform: translateX(-50%); */
      height: inherit;
      display: flex;
      flex-shrink: 0;
      /* width: 200%; */

      /deep/ section {
        width: 100%;
        padding: 2rem;
        overflow: auto;
        display: block;
        height: inherit;
        opacity: 0;
        /* transform: translateX(1rem); */
        animation: appear 0.5s $easeOutQuint 0.25s forwards;

        > :last-child {
          margin-bottom: 3.5rem;
        }
      }

      /deep/ .sidebar-content {
        &::before {
          content: '— tipping point';
          font-variant: small-caps;
          line-height: 1.5rem;
        }

        span {
          transition: background 0.5s $easeOutQuint 0.25s;

          &.is-highlighted {
            background: rgba($red, 0.2);
          }
        }
      }
    }
  }

  .sidebar-button-wrapper {
    position: absolute;
    display: flex;
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
