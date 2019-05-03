<template>
  <div class="board">

    <div class="board-header">
      <div class="board-header__search">
        <input type="text"
               v-model="flightSearch"
               placeholder="поиск рейса">
      </div>
      <div class="board-header__checkbox">
        <label class="checkbox">Задержка
          <input type="checkbox" class="checkbox__input" v-model="delay">
          <span class="checkbox__checkmark"></span>
        </label>
      </div>
    </div>

    <div class="board-table">
      <Table :headers="headers"
             :flights="filteredFlights"/>
    </div>

  </div>
</template>

<script>

    import Table from './Table.vue';

    export default {
        props: ['headers', 'flights'],
        components: {
            Table
        },
        computed: {
            filteredFlights() {
                return this.flights.filter(flight => {
                    let delay = flight.delay !== 0 || !this.delay;
                    return flight.flightNumber.indexOf(this.flightSearch) !== -1 && delay;
                })
            }
        },
        data() {
            return {
                flightSearch: '',
                delay: false
            }
        }
    }
</script>

<style lang="scss">
  $accent: steelblue;
  .board {
    margin-bottom: 5rem;
  }

  .board-header {
    display: flex;
    margin-bottom: 3rem;
    border-bottom: .3rem solid white;

    &__search {
      position: relative;
      top: .3rem;
      flex: 1;

      input {
        display: block;
        width: 100%;
        border: none;
        background: none;
        border-bottom: .3rem solid white;
        font-size: 1.8rem;
        font-family: 'Roboto Slab', sans-serif;
        color: white;
        padding: .5em 2em;

        &:focus {
          outline: none;
          border-color: $accent;
        }
      }

      &:before {
        content: "";
        position: absolute;
        transform: translateY(50%);
        display: block;
        width: 2rem;
        height: 2rem;
        background-image: svg-load('../img/search.svg');
      }
    }

    &__checkbox {
      padding: 0 1rem;
      background: #333;
      border-radius: .6rem .6rem 0 0;
      display: flex;
      align-items: center;
    }
  }

  .board-table {

  }
</style>