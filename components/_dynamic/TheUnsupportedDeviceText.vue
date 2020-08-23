<template>
  <div class="content">
    <h2>Your browser is not supported :(</h2>
    <p>
      To experience this website you'll need to use a newer browser that
      supports the technologies we have implemented here.
    </p>

    <ul>
      <li>
        <a href="">
          <img src="~assets/svg/logo-chrome.svg?inline" alt="" />
          <span>Chrome</span>
        </a>
      </li>
      <li>
        <a href="">
          <img src="~assets/svg/logo-firefox.svg?inline" alt="" />
          <span>Firefox</span>
        </a>
      </li>
      <li>
        <a href="">
          <img src="~assets/svg/logo-edge.svg?inline" alt="" />
          <span>Edge</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.content {
  .root & {
    margin: 8rem auto;
    max-width: 500px;
    width: 100%;
  }

  h2 {
    font-size: 3rem;
    line-height: 3.5rem;
    margin-bottom: 2.5rem;
  }
}
</style>
