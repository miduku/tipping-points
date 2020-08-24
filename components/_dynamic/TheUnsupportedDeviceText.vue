<template>
  <div class="content">
    <h2>Your browser is not supported :(</h2>
    <p>
      To experience this website you'll need to use a newer browser.
      <br />We recommend you use one of the following:
    </p>

    <ul class="browser-list">
      <li>
        <a href="https://www.google.com/chrome/" target="_blank">
          <img src="~assets/svg/logo-chrome.svg?inline" alt="" />
          <span>Chrome</span>
        </a>
      </li>
      <li>
        <a href="https://www.mozilla.org/" target="_blank">
          <img src="~assets/svg/logo-firefox.svg?inline" alt="" />
          <span>Firefox</span>
        </a>
      </li>
      <li>
        <a href="https://www.microsoft.com/en-us/edge" target="_blank">
          <img src="~assets/svg/logo-edge.svg?inline" alt="" />
          <span>Edge</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100vh;

  .root & {
    margin: 0 auto;
    padding: 2rem 0 4rem;
    max-width: 500px;
    width: 100%;
    text-align: center;
  }

  .root > div & {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    font-size: 3rem;
    line-height: 3.5rem;
    margin-bottom: 2.5rem;
  }

  ul {
    &.browser-list {
      list-style: none;
      padding: 0;
      margin: 4rem 0 0;
      display: flex;
      justify-content: center;

      li {
        width: 100%;
        padding: 0 1rem;

        a {
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;

          img {
            width: 100%;
            max-width: 72px;
          }

          span {
            display: inline-block;
            margin-top: 1rem;
          }
        }
      }
    }
  }
}
</style>
