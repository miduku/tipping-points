<template>
  <div class="root">
    <TheIntroOverlay />

    <TheNavMain />

    <div class="root-content">
      <nuxt />
    </div>

    <TheSidebar id="content-sidebar" />

    <TheSidebarSources id="content-sidebarsources" />
  </div>
</template>

<script>
import TheIntroOverlay from '~/components/TheIntroOverlay.vue'
import TheNavMain from '~/components/TheNavMain.vue'
import TheSidebar from '~/components/TheSidebar.vue'
import TheSidebarSources from '~/components/TheSidebarSources.vue'

export default {
  components: {
    TheIntroOverlay,
    TheNavMain,
    TheSidebar,
    TheSidebarSources
  }
}
</script>

<style lang="scss" scoped>
.root {
  position: relative;
}

#content-sidebar,
#content-sidebarsources {
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
