<template>
  <button :class="icon ? 'icon' : ''" class="button" @click="$emit('click')">
    <i v-if="icon" :class="icon" />

    <span>
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
