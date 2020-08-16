<template>
  <div id="tutorial">
    <section>
      <div class="texts">
        <section class="">
          <p>
            This is a tipping element
          </p>
          <p class="small">
            It is one of many and each one has major influence on the climatic
            Earth system
          </p>
        </section>
      </div>

      <div class="buttons">
        <Button @click="goToTutorialStep(1)">Next</Button>
      </div>
      <div class="skipper">
        <p class="like-link" @click.prevent="skipTutorial">Skip Tutorial</p>
      </div>
    </section>
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
      tutorialStep: (state) => state.tutorialStep
    })
  },

  watch: {
    tutorialStep: {
      immediate: true,
      handler(value) {
        console.log('step', value)
        switch (value) {
          case 0:
            this.vuexPanTo('GIS')
            break

          default:
            break
        }
      }
    }
  },

  methods: {
    goToTutorialStep(step) {
      this.$store.commit('SET_TUTORIALSTEP', step)
    },
    skipTutorial() {
      this.$store.commit('SET_MODE', ['isTutorial', false])
    }
  }
}
</script>

<style lang="scss" scoped>
#tutorial {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  width: 100vw;
  background: transparent;
  top: 0;
  left: 0;
  padding-bottom: 4rem;
  animation: init 1s $easeOutQuint forwards;

  > section {
    > div {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 1rem;
    }

    .texts {
      max-width: 400px;
      margin-bottom: 2rem;
      font-weight: 900;
      /* line-height: 1.5rem; */

      > section {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: rgba(#fff, 0.75);
        border-radius: 0.5rem;
        padding: 0.5rem;

        p {
          margin-bottom: 0.5rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .buttons {
      .button {
        padding: 0 3rem;
      }
    }

    .skipper {
      p {
        text-align: center;
      }
    }
  }
}
</style>
