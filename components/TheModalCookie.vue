<template>
  <div v-if="isActive">
    <div class="modal-cookie">
      <p>
        🍪 We would like to use cookies for analytics. <br />Read more about it
        in our
        <nuxt-link to="/legal-privacy" target="_blank"
          >Legal & Privacy</nuxt-link
        >
        page.
      </p>

      <BaseButton
        style="display: inline-block; margin-right: .25rem"
        @click="handleClick(true)"
      >
        Yes, sure
      </BaseButton>
      <BaseButton style="display: inline-block;" @click="handleClick(false)">
        No
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BaseButton from './BaseButton.vue'

export default {
  components: {
    BaseButton
  },

  data() {
    return {
      toggle: ['disabled', 'enabled'],
      isActive: true
    }
  },

  computed: {
    ...mapState({
      isCookieUsed: (state) => state.cookies.is_cookiesAccepted,
      isBannerActive: (state) => state.cookies.is_cookieBannerActive
    })
  },

  watch: {
    isBannerActive(val) {
      this.isActive = val
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.$store.commit(
        'cookies/SET_COOKIE_BANNER_ACTIVE',
        this.getStorageIsBannerActive() !== 'false'
      )
    })
  },

  methods: {
    getStorageIsBannerActive() {
      return process.browser
        ? localStorage.getItem(process.env.COOKIES.BANNER)
        : 'true'
    },
    getStorageIsCookiesAccepted() {
      return process.browser
        ? localStorage.getItem(process.env.COOKIES.ANALYTICS)
        : 'true'
    },

    handleClick(bool) {
      // this.$store.commit('cookies/SET_COOKIE_BANNER_ACTIVE', false)

      console.log(this.getStorageIsCookiesAccepted())

      localStorage.setItem(process.env.COOKIES.BANNER, false)

      localStorage.setItem(process.env.COOKIES.ANALYTICS, bool)
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-cookie {
  position: fixed;
  width: 100%;
  max-width: 400px;
  margin: 2rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba($light, 0.15);
  box-shadow: 0px 0px 10px rgba($shadow, 0.5);
  transition: all 0.33s $easeOutQuint;
  border: 1px solid rgba($dark-grey, 0.25);
  border-radius: $border-radius * 2;
  bottom: 0;
  left: 0;

  .modal-cookie-setting {
    color: rgba($dark-grey, 0.66);

    .modal-cookie-setting--toggle {
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>
