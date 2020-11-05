// @ts-nocheck
export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  // if (process.env.NODE_ENV !== 'production') return

  /*
   ** Every time the route changes (fired on initialization too)
   */
  const gaTrackingId = process.env.GA_TRACKING_ID
  // const cookieHideBanner = process.env.COOKIES.BANNER
  const cookieAcceptAnalytics = process.env.COOKIES.ANALYTICS

  app.router.afterEach((to) => {
    if (
      // localStorage.getItem(cookieHideBanner) === 'true' &&
      localStorage.getItem(cookieAcceptAnalytics) === 'true' /* && */
      // localStorage.getItem('ga-disable-' + gaTrackingId) !== 'true'
    ) {
      ;(function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r
        ;(i[r] =
          i[r] ||
          function() {
            ;(i[r].q = i[r].q || []).push(arguments)
          }),
          (i[r].l = 1 * new Date())
        ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(
        window,
        document,
        'script',
        'https://www.google-analytics.com/analytics.js',
        'ga'
      )

      ga('create', gaTrackingId, 'auto')
      ga('set', 'forceSSL', true)
      ga('set', 'anonymizeIp', true)
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')

      console.log('Analytics is on')
    } else {
      console.log('Analytics is off')
    }
  })

  // functions
  function getCookie(key) {
    let result
    return (result = new RegExp(
      '(?:^|; )' + encodeURIComponent(key) + '=([^;]*)'
    ).exec(document.cookie))
      ? result[1]
      : null
  }
}
