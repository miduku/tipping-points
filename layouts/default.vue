<template>
  <div class="root">
    <div class="root-content">
      <nuxt />
    </div>

    <TheOverlayTutorial v-if="modeIsTutorial" />

    <TheNavMain
      :class="[{ 'is-visible--impacts': tutorialStep >= 6 || !modeIsTutorial }]"
    />

    <TheSidebar id="sidebar-main" />

    <TheOverlayIntro />

    <TheSidebarSources id="sidebar-sources" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TheOverlayIntro from '~/components/TheOverlayIntro.vue'
import TheOverlayTutorial from '~/components/TheOverlayTutorial.vue'
import TheNavMain from '~/components/TheNavMain.vue'
import TheSidebar from '~/components/TheSidebar.vue'
import TheSidebarSources from '~/components/TheSidebarSources.vue'

export default {
  components: {
    TheOverlayIntro,
    TheOverlayTutorial,
    TheNavMain,
    TheSidebar,
    TheSidebarSources
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    })
  }
}
</script>

<style lang="scss" scoped>
.root {
  position: relative;
}

#sidebar-main,
#sidebar-sources {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: $sidebar-width-mobile;

  @include tablet {
    width: $sidebar-width-tablet;
  }

  @include desktop {
    width: $sidebar-width-desktop;
  }
}
</style>
