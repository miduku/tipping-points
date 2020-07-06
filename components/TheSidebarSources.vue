<template>
  <div class="sidebarsources">
    <div class="overlay" />

    <div class="sidebar-content-wrapper">
      <div>
        <section>
          <h2>Sources</h2>
          <ul class="sources">
            <li
              v-for="(source, i) in sourcesJson"
              :key="i"
              :id="`source-${i + 1}`"
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

    <div class="sidebar-button-wrapper"></div>
  </div>
</template>

<script>
import importSourcesJson from '~/assets/json/sources.json'

export default {
  asyncData({ params }) {
    return { importSourcesJson }
  },

  data() {
    return {
      sourcesJson: []
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
  z-index: 9999;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: pink;
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
    z-index: 1;

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
            margin-bottom: 2rem;

            .title {
              font-weight: bold;
              position: relative;

              &:before {
                content: attr(data-number) ') ';
                position: absolute;
                top: 0;
                right: 100%;
                transform: translateX(-0.5rem);
                opacity: 0.5;
              }
            }
          }
        }
      }
    }
  }
}
</style>
