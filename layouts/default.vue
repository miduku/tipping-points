<template>
  <div class="root">
    <div class="root-content">
      <nuxt />
    </div>
    <TheNavMain />

    <TheSidebar id="sidebar-main" />

    <TheOverlayIntro />

    <TheSidebarSources id="sidebar-sources" />
  </div>
</template>

<script>
import TheOverlayIntro from '~/components/TheOverlayIntro.vue'
import TheNavMain from '~/components/TheNavMain.vue'
import TheSidebar from '~/components/TheSidebar.vue'
import TheSidebarSources from '~/components/TheSidebarSources.vue'

export default {
  components: {
    TheOverlayIntro,
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
