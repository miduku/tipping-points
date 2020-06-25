// const onlineURL = 'https://test.dustinkummer.com/tipping-points'
const baseURL =
  process.env.NODE_ENV === 'development' ? '/' : '/tipping-points/'

export default {
  mode: 'universal',

  router: {
    base: baseURL
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/dlb6pxi.css' }
    ],
    htmlAttrs: {
      lang: 'de'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/index.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-panzoom', ssr: false },
    { src: '~/plugins/vue-resize-directive', ssr: false }
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
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
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
    breaks: true
    // use: [
    //   'markdown-it-div',
    //   'markdown-it-attrs'
    // ],
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
