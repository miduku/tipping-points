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
            Earth system.
          </p>
        </section>

        <section id="text-1">
          <p>
            See what happens when this tipping element passes a certain tipping
            point.
          </p>
        </section>

        <section id="text-2">
          <p>
            When the Greenland Ice Sheet Disintegration reaches its tipping
            point it has direct influence on two more tipping elements.
          </p>
        </section>

        <section id="text-3">
          <p>
            Every tipping element has indivdual effects that are occasionally
            linked to each other.
          </p>
        </section>

        <section id="text-4">
          <p>
            There is more information to read about on each tipping element and
            their tipping point.
          </p>
        </section>

        <section id="text-5">
          <p>
            Clicking on a specific tipping element effect highlights it in the
            text.
          </p>
        </section>

        <section id="text-6">
          <p>
            On the left-hand side you can find four main global impacts that
            influence tipping points and are reinfoced by them at the same time.
          </p>
        </section>

        <section id="text-7">
          <p>
            By clicking on a tipping element you can see causual connections
            between them and the global impacts.
          </p>
          <p class="small">
            Toggle the global impacts to see all casual connections between them
            and tipping elements.
          </p>
        </section>
        <!-- TUTORIALS END -->
      </div>

      <div v-if="tutorialStep !== null" class="buttons">
        <Button
          :class="{ 'is-visible': tutorialStep > 0 }"
          class="button-prev"
          icon="arrow-down"
          only-icon
          @click="goToTutorialStep('prev')"
        />
        <Button
          :class="{ 'is-visible': tutorialStep < lastStep }"
          class="button-next"
          icon="arrow-down"
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
      lastStep: Number
    }
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep
    })
  },

  watch: {
    tutorialStep(value) {
      console.log('tutorialStep', value)
      switch (value) {
        case 0:
          this.vuexPanTo('GIS')
          this.vuexSetSidebar([false, 'GIS'])
          break

        case 1:
          this.vuexPanTo([4000, 2600])
          break

        case 2:
          break

        case 3:
          break

        case 4:
          break

        case 5:
          break

        case 6:
          break

        case 7:
          break

        case null:
          // default:
          this.$store.commit('SET_TUTORIALSTEP', 0)
          break
      }

      if (value !== null) {
        this.showText(value)
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      // set maximum steps
      const MAX_STEPS = this.$el.querySelectorAll('#tutorial-texts > section')

      this.lastStep = MAX_STEPS.length - 1
      this.$store.commit('SET_TUTORIALSTEP', 0)
    })
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
  padding-bottom: 2rem;
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

        &.button-next /deep/ > i {
          transform: rotate(-90deg);
        }
        &.button-prev /deep/ > i {
          transform: rotate(90deg);
        }

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
