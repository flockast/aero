<template>
  <div>
    <TabsLine
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'tabs-list'"
      :tab-class="'tabs-list__item'"
      :tab-active-class="'tabs-list__item--active'"
      :line-class="'tabs-list__line'"
      @onClick="handleClickOnTab"/>
      <div class="tabs-content">
          <board :type="currentTab"/>
      </div>
  </div>
</template>

<script>

  import TabsLine from 'vue-tabs-with-active-line';
  import Board from './Board.vue';

  export default {
    components: {
      TabsLine,
      Board
    },
    data() {
      return {
        tabs: [
          {
            title: 'Departure',
            value: 'departure'
          },
          {
            title: 'Arrival',
            value: 'arrival'
          }
        ],
        currentTab: 'departure'
      }
    },
    methods: {
      handleClickOnTab(newTab) {
        this.currentTab = newTab;
      }
    }
  }
</script>

<style lang="scss">
  $accent: steelblue;

  .tabs-list {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 1em;
    &__item {
      display: block;
      margin: 0 2em 0 0;
      padding: 1em 0;
      box-shadow: none;
      border: none;
      border-radius: .3rem;
      background: none;
      color: white;
      font-size: 1.8rem;
      font-family: 'Roboto Slab', sans-serif;
      cursor: pointer;
      &:focus {
        outline: none;
      }
      &--active {
        color: $accent;
      }
    }
    &__line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: .3rem;
      background: $accent;
      border-radius: .3rem;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }
</style>