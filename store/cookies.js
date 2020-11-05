export const state = () => ({
  is_cookieBannerActive: true,
  is_cookiesAccepted: false
})

export const mutations = {
  SET_COOKIE_BANNER_ACTIVE(state, payload) {
    state.is_cookieBannerActive = payload
  },
  SET_COOKIES_ACCEPTED(state, payload) {
    state.is_cookiesAccepted = payload
  }
}
