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
    </defs>

    <!-- Slot -->
    <slot />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  position: relative;
  background: transparent;
  left: 0;
  top: 0;

  marker {
    &#link-arrow path {
      stroke: $light;
    }

    &#link-arrow-red path {
      stroke: $red;
    }
  }
}
</style>
