<template>
  <div id="intro" :class="{ 'is-closed': isClosed }">
    <section id="intro-1">
      <header>
        <h1>Tipping Points</h1>
        <span class="sub-header">And how they affect us</span>
      </header>

      <div class="container">
        <p>
          <strong>
            This project will illustrate nine tipping points across the globe.
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
            <img src="~/assets/svg/i-arrow-down.svg" alt="Arrow Down" />
          </a>
        </div>
      </div>
    </section>

    <section id="intro-2">
      <div class="container">
        <p>
          But what is a tipping point? The climate has been warming
          persistently, entailing severe changes in CO2 levels in the
          atmosphere, ocean heat content and global sea level rise. Due to their
          impact, especially when combined, they hold the power to alter our
          planet. These so called “tipping points” are thresholds that are able
          to push a system into an entirely new state, even with mere changes.
          Passing this threshold could trigger a self-reinforcing process and
          cause irreversible damage.
        </p>

        <p>
          Tipping points can be found in every part of the world, whether it is
          the Greenland Ice Sheet far north or Coral Reefs in the Southern
          Pacific. As they are all directly or indirectly linked to each other,
          exceeding one may fuel others and lead to a cascade.
        </p>

        <p>
          The concept of these interconnected large-scale changes was introduced
          by the Intergovernmental Panel on Climate Change (IPCC) around 2000.
          The two most recent IPCC Special Reports imply a warming of only
          1°C–2°C could initiate tipping points, whilst first predictions
          assumed global warming of 5°C above pre-industrial levels would be
          needed.
        </p>

        <p>
          Tipping points can be caused by natural fluctuations but since
          man-made greenhouse gas levels keep on rising and the climate has
          already heated by 1°C, they may occur in unexpected ways, more
          promptly and with graver consequences.
        </p>

        <p>
          Some scientists claim that we're in a state of planetary emergency and
          consider the possibility of already having passed the threshold for a
          cascade of inter-related tipping points. Even though these statements
          have been criticized, there is no doubt about the urgency of taking
          immediate international action and keeping global temperatures as low
          as possible.
        </p>

        <p>
          Explore the following nine tipping points in detail and gain insight
          into why they hold such great significance.
        </p>

        <div class="start-button">
          <Button class="button" @click="closeIntro">
            Start Exploring
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Button from '~/components/BaseButton.vue'

export default {
  components: {
    Button
  },

  data() {
    return {
      isClosed: false
    }
  },

  methods: {
    closeIntro() {
      this.isClosed = true
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
  background: rgba(#fff, 0.95);
  z-index: 9999;
  overflow: auto;
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
      /* background: pink; */
      width: inherit;
      max-width: 400px;

      .start-button {
        margin-top: 3.25rem;
        width: 100%;
        display: flex;
        justify-content: center;
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
