<template>
  <nav class="nav nav-main">
    <button class="button" @click.prevent="panTo('AMZN')">amazon</button>
    <button class="button" @click.prevent="panTo('AMOC')">atlantic</button>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function() {
      console.log(this.$root.$el.querySelector('.content-main'))
    })
  },

  methods: {}
}
</script>
