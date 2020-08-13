<template>
  <div class="root">
    <TheIntroOverlay />

    <TheNavMain />

    <div class="root-content">
      <nuxt />
    </div>

    <TheSidebar id="sidebar-main" />

    <TheSidebarSources id="sidebar-sources" />
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
