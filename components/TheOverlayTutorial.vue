<template>
  <div id="tutorial">
    <section>
      <div id="tutorial-texts">
        <!-- TUTORIALS -->
        <section id="text-0">
          <p>
            This is a tipping element
          </p>
          <p class="small">
            It is one of many and each one has major influence on the climatic
            Earth system
          </p>
        </section>

        <section id="text-1">
          <p>
            See what happens when this tipping element passes a certain tipping
            point
          </p>
        </section>
        <!-- TUTORIALS END -->
      </div>

      <div v-if="tutorialStep !== null" class="buttons">
        <Button
          :class="{ 'is-visible': tutorialStep > 0 }"
          icon="minus"
          only-icon
          @click="goToTutorialStep('prev')"
        />
        <Button
          :class="{ 'is-visible': tutorialStep < lastStep }"
          icon="plus"
          only-icon
          @click="goToTutorialStep('next')"
        />
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

  data() {
    return {
      lastStep: 1
    }
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep
    })
  },

  watch: {
    tutorialStep: {
      immediate: true,
      handler(value) {
        switch (value) {
          case 0:
            this.vuexPanTo('GIS')
            this.vuexSetSidebar([false, 'GIS'])
            break

          case 1:
            this.vuexPanTo('AMZN')
            break

          case null:
          default:
            this.$store.commit('SET_TUTORIALSTEP', 0)
            break
        }

        if (value !== null) {
          this.showText(value)
        }
      }
    }
  },

  methods: {
    goToTutorialStep(direction) {
      this.$store.commit(
        'SET_TUTORIALSTEP',
        direction === 'next' && this.tutorialStep >= 0
          ? this.tutorialStep + 1
          : this.tutorialStep - 1
      )
    },

    skipTutorial() {
      this.$store.commit('SET_MODE', ['isTutorial', false])
    },

    showText(id) {
      const TEXTS = this.$el.querySelector('#tutorial-texts')
      const TEXT = TEXTS.querySelector(`#text-${id}`)
      const TEXT_ALL = TEXTS.querySelectorAll(`section`)
      TEXT_ALL.forEach((element) => {
        element.classList.remove('is-active')
      })
      TEXT.classList.add('is-active')
      console.log(TEXT)
    }

    // mounted() {
    //   this.$nextTick(function() {
    //     // TODO
    //     this.$store.commit('SET_TUTORIALSTEP', 0)
    //   })
    // }
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
    max-width: 400px;
    width: 100%;

    > div {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 1rem;
    }

    #tutorial-texts {
      position: relative;
      display: block;
      width: 100%;
      margin-bottom: 2rem;
      font-weight: 900;
      /* line-height: 1.5rem; */

      > section {
        position: absolute;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: rgba(#fff, 0.75);
        border-radius: 0.5rem;
        padding: 0.5rem;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: opacity 0.5s $easeOutQuint;

        &.is-active {
          opacity: 1;
        }

        p {
          margin-bottom: 0.5rem;

          &.small {
            font-weight: normal;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .buttons {
      .button {
        /* border: none;
        background: transparent; */
        box-shadow: unset;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.5s $easeOutQuint;

        &.is-visible {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        &:last-child {
          margin-left: 3rem;
        }
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
