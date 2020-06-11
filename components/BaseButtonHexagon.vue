<template>
  <button class="button" @click="$emit('click')">
    <div class="title is-strong">
      <span>{{ title }}</span>
    </div>

    <svg
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 0L31.5885 9V27L16 36L0.411543 27V9L16 0Z" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$size: $unit * 2;
$background: $red;

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: $unit/2 0;
  padding: 0;
  width: $size;
  height: $size;
  min-height: unset;
  min-width: unset;
  /* background: red; */
  border-radius: 0;
  pointer-events: all;

  &:focus,
  &:hover {
    .title {
      opacity: 1;
      transform: translateX(0);
    }

    svg path {
      fill: lighten($red, 25%);
    }
  }

  .title {
    position: absolute;
    display: block;
    width: $size * 10;
    left: $size * 1.25;
    text-align: left;
    pointer-events: none;
    opacity: 0;
    transform: translateX(-$size);
    transition: transform 0.33s $easeOutQuint, opacity 0.66s $easeOutQuint;

    span {
      background: rgba(#fff, 0.75);
    }
  }

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: visible;

    path {
      fill: #fff;
      stroke: $red;
      stroke-width: 1px;
      transition: fill 0.33s $easeOutQuint;
    }
  }
}
</style>
