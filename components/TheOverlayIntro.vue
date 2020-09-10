<template>
  <div id="intro" :class="{ 'is-closed': !modeIsInit }">
    <section id="intro-1">
      <header>
        <h1>Tipping Points</h1>
        <span class="sub-header">And how they affect us</span>
        <!-- {{ $ua.browser() }} {{ $ua.browserVendor() }}
        {{ $ua.browserVersion() }} -->
      </header>

      <div class="container">
        <p>
          <strong>
            This project will illustrate nine tipping points across the globe —
            Visualizing their complexity, interrelations and impacts.
          </strong>
        </p>

        <div class="arrow-down">
          <a
            v-scroll-to="{
              el: '#intro-2',
              container: '#intro',
              easing: [0.23, 1, 0.32, 1],
              duration: 1000
            }"
            href="#intro-2"
          >
            <img src="~/assets/svg/i-arrow-down.svg?inline" alt="Arrow Down" />
          </a>
        </div>
      </div>
    </section>

    <section id="intro-2">
      <div class="container">
        <div class="split">
          <div>
            <p>
              You may ask yourself: “What is a tipping point?” There are
              so-called tipping elements all around our planet and each one has
              a certain tipping point. These tipping points are thresholds that,
              once crossed, push a system into an entirely new state. Sometimes
              only mere changes are needed. In the past decades rising CO2
              levels have been persistently warming up the climate and affecting
              tipping elements, as well as tipping points. Tipping elements are
              all directly or indirectly linked to each other. Passing one of
              their critical values may fuel others and lead to a
              cascade.<SourceAnchorLink to-id="1" /> Exceeding a tipping point
              could trigger a self-reinforcing process and cause irreversible
              damage.<SourceAnchorLink to-id="2" />
            </p>
          </div>

          <div>
            <p>
              Tipping points can be caused by natural fluctuations. But man-made
              greenhouse gas levels keep on rising and the climate has already
              heated by 1°C. So they may occur in unexpected ways, more promptly
              and with graver consequences. As they hold the power to alter our
              planet there is no doubt about the urgency of taking immediate
              international action and keeping global temperatures as low as
              possible.<SourceAnchorLink to-id="3" />
            </p>

            <p>
              Explore the following nine tipping points in detail and gain
              insight into why they hold such great significance.
            </p>
          </div>
        </div>

        <div class="start-button">
          <div>
            <Button class="button" @click="closeIntro">
              Find out more
            </Button>
            <p class="like-link" @click="closeIntro(false)">
              Or explore the map directly
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import vuexPanTo from '~/mixins/vuexPanTo'

import Button from '~/components/BaseButton.vue'
import SourceAnchorLink from '~/components/BaseSourceAnchorLink.vue'

export default {
  components: {
    Button,
    SourceAnchorLink
  },

  mixins: [vuexPanTo],

  data() {
    return {
      isClosed: false
    }
  },

  computed: {
    ...mapState({
      modeIsInit: (state) => state.mode.isInit
    })
  },

  methods: {
    closeIntro(startTutorial = true) {
      this.$store.commit('SET_MODE', ['isInit', false])

      if (startTutorial) {
        this.$store.commit('SET_TUTORIALSTEP', null)
        setTimeout(() => {
          this.$store.commit('SET_MODE', ['isTutorial', true])
        }, 500)
      } else {
        setTimeout(() => {
          const TPs = [
            'AMZN',
            'AMOC',
            'BFS',
            'GIS',
            'WAM',
            'CRD',
            'IMS',
            'PERM',
            'WAIS'
          ]

          // get random TP
          function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
          }

          this.vuexPanTo(random(TPs))
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#intro {
  position: fixed;
  display: block;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #fff;
  overflow: auto;
  top: 0;
  left: 0;
  transition: opacity 0.6s $easeInOutQuint, transform 0.75s $easeInOutQuint;

  &.is-closed {
    pointer-events: none;
    transform-origin: center;
    transform: scale(0.95) translateY(-8rem);
    opacity: 0;
    overflow: none;
  }

  > section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    min-height: 100vh;
    padding: 4rem;

    &#intro-1 {
      display: flex;
      flex-direction: column;

      .container {
        opacity: 0;
        transform: translateY(5vh);
        animation: header-text 1.25s $easeOutQuint 2.5s forwards;

        .arrow-down {
          display: flex;
          justify-content: center;
          transform: translateY(7vh);

          .button {
            border: none;
            box-shadow: none;
          }

          img {
            width: 2.5rem;
            animation: hovering 2s $easeInOutQuint infinite;
          }
        }
      }
    }

    &#intro-2 {
      .container {
        max-width: unset;

        .split {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          > div {
            max-width: calc(400px + 2rem);
            padding: 0 1rem;
          }
        }
      }
    }

    &:last-child {
      padding: 8rem;
    }

    header {
      text-align: center;
      margin-bottom: 8.75rem;
      transform: translateY(7vh);
      opacity: 0;
      animation: header 2.25s $easeOutQuint 1.5s forwards;

      h1,
      span {
        text-shadow: 0 0 0.25em white;
      }
    }

    p {
      text-shadow: 0 0 0.25em white;
    }

    .container {
      width: inherit;
      max-width: 400px;

      .start-button {
        margin-top: 3.25rem;
        display: flex;
        justify-content: center;

        > div {
          display: flex;
          justify-content: center;
          flex-direction: column;
          text-align: center;

          .button {
            margin-bottom: 0.5rem;
          }

          p {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

@keyframes header {
  33% {
    transform: translateY(7vh);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes header-text {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes hovering {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1rem);
  }
  0% {
    transform: translateY(0);
  }
}
</style>
