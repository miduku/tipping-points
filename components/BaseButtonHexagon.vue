<template>
  <button class="button button-hexagon" @click="$emit('click')">
    <div class="content">
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div class="desc">
        <span> {{ desc }} </span>
      </div>
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

    <i :class="'i-' + icon" />
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  }
}
</script>
