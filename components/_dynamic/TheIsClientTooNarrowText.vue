<template>
  <div class="content">
    <h2>Your screen size is too small :(</h2>
    <p>
      Please, view this website on a bigger screen.
    </p>
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
}
</style>
