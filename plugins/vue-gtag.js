import Vue from 'vue'
import VueGtag from 'vue-gtag'

const getConsent = localStorage.getItem(process.env.COOKIES.ANALYTICS)

Vue.use(VueGtag, {
  config: { id: process.env.GA_TRACKING_ID },
  bootstrap: getConsent === 'true',
  enabled: getConsent === 'true'
})
