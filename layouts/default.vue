<template>
  <div class="root">
    <div v-if="isUnsupportedDevice()">
      <component :is="unsupportedDeviceText" />

      <TheNavMain :is-unsupported-device="isUnsupportedDevice()" />
    </div>

    <div v-else>
      <div class="root-content">
        {{ deviceType }}, {{ browser }}, {{ isUnsupportedDevice() }}
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
      browser: String
    }
  },

  computed: {
    ...mapState({
      tutorialStep: (state) => state.tutorialStep,
      modeIsTutorial: (state) => state.mode.isTutorial
    }),

    unsupportedDeviceText() {
      if (this.isUnsupportedDevice()) {
        return () => import(`~/components/_dynamic/TheUnsupportedDeviceText`)
      }

      return null
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.detectDevice()
      this.detectBrowser()

      this.isClientTooNarrow()
    })
  },

  methods: {
    detectBrowser() {
      const browser = this.$ua.browser()
      this.browser = browser
    },

    detectDevice() {
      const deviceType = this.$ua.deviceType()
      this.deviceType = deviceType
    },

    isUnsupportedDevice() {
      const detect =
        this.$ua.isFromSmartphone() ||
        this.$ua.isFromMobilephone() ||
        this.$ua.isFromTablet() ||
        this.$ua.isFromWindowsPhone() ||
        this.$ua.isFromAndroidMobile() ||
        this.$ua.isFromIphone()

      if (detect) {
        return true
      }

      return true
    },

    isClientTooNarrow() {
      const clientTooNarrow = this.$el.clientWidth <= 800
      console.log(clientTooNarrow)
      // if (clientWidth >= 800) {
      //   return false
      // }

      // return false
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
