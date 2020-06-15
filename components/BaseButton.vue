<template>
  <button class="button" @click="$emit('click')">
    <span><slot /></span>
  </button>
</template>
