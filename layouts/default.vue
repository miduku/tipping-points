<template>
  <div v-resize:throttle.250="isClientTooNarrow" class="root">
    <div v-if="errorScreenIsUnsupportedDevice || errorScreenIsCLientTooNarrow">
      <component :is="errorScreenText" />

      <TheNavMain :is-minimal-nav="true" />
    </div>

    <div v-else>
      <div class="root-content">
        <nuxt />
      </div>

      <TheOverlayTutorial v-if="modeIsTutorial" />

      <TheNavMain
        :class="[
          { 'is-visible--impacts': tutorialStep >= 6 || !modeIsTutorial }
        ]"
      />

      <TheSidebar id="sidebar-main" />

      <TheOverlayIntro />

      <TheSidebarSources id="sidebar-sources" />
    </div>
  </div>
</template>

<script>
// import _throttle from 'lodash/throttle'

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

  data() {
    return {
      deviceType: String,
      browser: String,
      errorScreenIsCLientTooNarrow: false,
      errorScreenIsUnsupportedDevice: false
    }
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    }),

    errorScreenText() {
      if (this.errorScreenIsUnsupportedDevice) {
        return () => import(`~/components/_dynamic/TheUnsupportedDeviceText`)
      }

      if (this.errorScreenIsCLientTooNarrow) {
        return () => import(`~/components/_dynamic/TheIsClientTooNarrowText`)
      }

      return null
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.checkIsUnsupportedDevice()
      this.isClientTooNarrow()
    })
  },

  methods: {
    checkIsUnsupportedDevice() {
      const detect =
        this.$ua.isFromSmartphone() ||
        this.$ua.isFromMobilephone() ||
        this.$ua.isFromTablet() ||
        this.$ua.isFromWindowsPhone() ||
        this.$ua.isFromAndroidMobile() ||
        this.$ua.isFromIphone() ||
        this.$ua.browser() === ('MSIE' || 'IE' || 'Safari')

      // console.log('isUnsupportedDevice', detect)
      this.errorScreenIsUnsupportedDevice = detect
    },

    isClientTooNarrow() {
      this.errorScreenIsCLientTooNarrow = this.$el.clientWidth <= 800
    }
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
