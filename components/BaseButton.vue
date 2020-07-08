<template>
  <button
    :class="[{ icon: icon }, onlyIcon ? `is-${iconPosition}` : '']"
    class="button"
    @click="$emit('click')"
  >
    <i v-if="icon && iconPosition === 'left'" :class="'i-' + icon" />

    <span v-if="!onlyIcon">
      <slot />
    </span>

    <i v-if="icon && iconPosition === 'right'" :class="'i-' + icon" />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },

    iconPosition: {
      type: String,
      default: 'left'
    },

    onlyIcon: {
      type: Boolean,
      defalt: false
    }
  }
}
</script>
