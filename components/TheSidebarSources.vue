<template>
  <div
    class="sidebarsources"
    :class="sidebarSourcesIsOpen ? 'is-open' : 'is-closed'"
  >
    <div class="overlay" />

    <div class="sidebar-content-wrapper">
      <div>
        <section>
          <h2>Sources</h2>
          <ul class="sources">
            <li
              v-for="(source, i) in sourcesJson"
              :id="`source-${i + 1}`"
              :key="i"
              :class="{ 'is-highlighted': highlightThisId === i + 1 }"
            >
              <span class="title" :data-number="i + 1">{{ source.title }}</span>

              <span class="url">
                <a :href="source.url" target="_blank">{{ source.url }}</a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="sidebar-button-wrapper">
      <Button @click="$store.commit('SET_SIDEBARSOURCES', [false, 0])">
        Close Sources
      </Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import importSourcesJson from '~/assets/json/sources.json'

import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button
  },

  asyncData({ params }) {
    return { importSourcesJson }
  },

  data() {
    return {
      sourcesJson: [],
      highlightThisId: Number
    }
  },

  computed: {
    ...mapState({
      sidebarSourcesIsOpen: (state) => state.sidebarSources.isOpen,
      sidebarSourcesToId: (state) => state.sidebarSources.toId
    })
  },

  watch: {
    sidebarSourcesToId(value) {
      this.highlightThisId = value
    },

    sidebarSourcesIsOpen(value) {
      console.log(value, this.sidebarSourcesToId)
      if (value && this.sidebarSourcesToId > 0) {
        this.$scrollTo(`#source-${this.sidebarSourcesToId}`, 1500, {
          easing: [0.23, 1, 0.32, 1],
          container: '.sidebarsources .sidebar-content-wrapper section',
          offset: -24
        })
      }
    }
  },

  created() {
    this.sourcesJson = importSourcesJson
  }
}
</script>

<style lang="scss" scoped>
.sidebarsources {
  background: white;
  transition: right 0.5s $easeOutQuint;
  z-index: 99999;

  &.is-open {
    .sidebar-button-wrapper {
      animation: appear 0.5s $easeOutQuint 0.75s forwards;
    }
  }

  &.is-closed {
    right: -100vw !important;

    &::before {
      transform: translateX(100%);
    }

    .overlay {
      pointer-events: none;
      opacity: 0;
    }
  }

  &::before {
    content: '';
    position: absolute;
    width: 20%;
    height: inherit;
    background: blue;
    right: 100%;
    pointer-events: none;
    z-index: 1;
    transform: translateX(0);
    transition: transform 0.5s $easeOutQuint;
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

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    transition: opacity 0.5s $easeOutQuint;
    background: #fff;
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

      section {
        width: 100%;
        padding: 2rem;
        overflow: auto;
        display: block;
        height: inherit;
        /* opacity: 0; */
        /* transform: translateX(1rem);
        animation: appear 0.5s $easeOutQuint 0.25s forwards; */

        > :last-child {
          margin-bottom: 3.5rem;
        }

        ul.sources {
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            margin-bottom: 1.5rem;
            padding: 0.5rem 0.75rem 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid transparent;
            transition: border 0.5s $easeOutQuint, background 0.5s $easeOutQuint;

            &.is-highlighted {
              background: rgba($red, 0.05);
              border-color: rgba($red, 0.2);
            }

            .title {
              font-weight: bold;
              position: relative;
              display: block;

              &:before {
                content: attr(data-number) ') ';
                position: absolute;
                top: 0;
                right: calc(100% + 0.75rem);
                transform: translateX(-0.5rem);
                opacity: 0.5;
              }
            }

            .url {
              word-break: break-word;
              display: block;
            }
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
    z-index: 1;
  }
}

@keyframes appear {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
