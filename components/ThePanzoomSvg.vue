<template>
  <svg>
    <!-- Arrow head for paths -->
    <defs>
      <marker
        id="link-arrow"
        markerWidth="5"
        markerHeight="9"
        refX="4"
        refY="4.5"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path
          d="M1 1L4.5 4.5L1 8"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
      </marker>

      <marker
        id="link-arrow-red"
        markerWidth="5"
        markerHeight="9"
        refX="4"
        refY="4.5"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path
          d="M1 1L4.5 4.5L1 8"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
      </marker>

      <filter id="shadow">
        <feDropShadow dx="0" dy="0" stdDeviation="6" />
      </filter>

      <filter id="shadow-active">
        <feDropShadow dx="0" dy="0" stdDeviation="6" />
      </filter>
    </defs>

    <image
      id="world-map"
      x="0"
      y="0"
      width="100%"
      xlink:href="~assets/svg/world.svg#world"
    />

    <!-- Slot -->
    <slot />
    <!-- Slot END -->
  </svg>
</template>

<style lang="scss" scoped>
svg {
  position: relative;
  background: transparent;
  left: 0;
  top: 0;
  pointer-events: none;

  &.is-map-hidden {
    #world-map {
      opacity: 0;
      transform: scale(0.975);
    }
  }

  #world-map {
    opacity: 0.175;
    transform-origin: center;
    transition: opacity 0.66s $easeOutQuint, transform 1s $easeOutQuint;
  }

  marker {
    &#link-arrow path {
      stroke: $dark-grey;
    }

    &#link-arrow-red path {
      stroke: $red;
    }
  }

  filter {
    &#shadow {
      feDropShadow {
        flood-color: rgba($node-color-hover, 0.5);
      }
    }
    &#shadow-active {
      feDropShadow {
        flood-color: rgba($node-color-active, 0.5);
      }
    }
  }
}
</style>
