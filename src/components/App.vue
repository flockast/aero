<template>
  <main>

    <header class="header">
      <div class="container">
        <div class="header__logo">Airport board</div>
      </div>
    </header>

    <section class="content">
      <div class="container">
        <Tabs/>
      </div>
    </section>

  </main>
</template>

<script>
    import Tabs from "./Tabs.vue";

    export default {
        components: {
            Tabs
        }
    }
</script>

<style lang="scss">
  .header {
    padding-top: 1em;

    &__logo {
      font-size: 4rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .content {
    padding-top: 2em;
  }
</style>