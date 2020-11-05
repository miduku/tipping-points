// const onlineURL = 'https://test.dustinkummer.com/tipping-points'
const baseURL =
  // process.env.NODE_ENV === 'development' ? '/' : '/tipping-points/'
  process.env.NODE_ENV === 'development' ? '/' : '/'

export default {
  target: 'static',
  mode: 'universal',

  router: {
    base: baseURL
  },

  env: {
    GA_TRACKING_ID: 'G-E9R5J6L36P',
    COOKIES: {
      BANNER: 'TP-COOKIES-BANNER:active',
      ANALYTICS: 'TP-COOKIES:accepted'
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'Tipping Points — And how they affet us',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'You may ask yourself: “What is a tipping point?” There are so-called tipping elements all around our planet and each one has a certain tipping point. These tipping points are thresholds that, once crossed, push a system into an entirely new state. Sometimes only mere changes are needed. In the past decades rising CO2 levels have been persistently warming up the climate and affecting tipping elements, as well as tipping points.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: baseURL + 'favicon.ico' },
      {
        rel: 'apple-touch-icon',
        href: baseURL + 'apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: baseURL + 'favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: baseURL + 'favicon-16x16.png',
        sizes: '16x16'
      },
      { rel: 'manifest', href: baseURL + 'site.webmanifest' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/dlb6pxi.css' }
    ],
    htmlAttrs: {
      lang: 'de'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#cc372e' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/index.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-gtag', mode: 'client' },
    { src: '~/plugins/vue-panzoom', mode: 'client' },
    { src: '~/plugins/vue-resize-directive', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'vue-scrollto/nuxt',
    // '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    'nuxt-svg-loader',
    'nuxt-user-agent'
  ],
  styleResources: {
    scss: [
      '~assets/scss/resources/_vars.scss',
      '~assets/scss/resources/_functions.scss',
      '~assets/scss/resources/_mixins.scss',
      '~assets/scss/resources/_helpers.scss'
    ]
  },
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    html: true,
    typographer: true,
    quotes: '“”‘’',
    use: [
      'markdown-it-div'
      // 'markdown-it-attrs'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
