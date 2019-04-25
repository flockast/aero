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
        <div v-if="currentTab == 'arr'">
          <board :headers="['время', 'задержка', 'вылет из', 'рейс']"
                 :flights="this.arrivals"/>
        </div>
        <div v-if="currentTab == 'dep'">
          <board :headers="['время', 'задержка', 'прилёт в', 'рейс']"
                 :flights="this.departures"/>
        </div>
      </div>
  </div>
</template>

<script>

  import TabsLine from 'vue-tabs-with-active-line';
  import Board from './Board.vue';
  import arrivalsJSON from '../js/arrivals.json';
  import departuresJSON from '../js/departures.json';

  export default {
    components: {
      TabsLine,
      Board
    },
    data() {
      return {
        tabs: [
          {
            title: 'Прилёт',
            value: 'arr'
          },
          {
            title: 'Вылет',
            value: 'dep'
          }
        ],
        currentTab: 'arr',
        arrivals: '',
        departures: ''
      }
    },
    methods: {
      handleClickOnTab(newTab) {
        this.currentTab = newTab;
      },
      getArrivals() {
        return arrivalsJSON.flightTracks.map(flight => {
          return {
            'time': flight.departureDate.dateLocal,
            'delay': flight.delayMinutes,
            'place': flight.departureAirportFsCode,
            'flightNumber': flight.flightNumber,
          }
        })
      },
      getDepartures() {
        return departuresJSON.flightTracks.map(flight => {
          return {
            'time': flight.departureDate.dateLocal,
            'delay': flight.delayMinutes,
            'place': flight.arrivalAirportFsCode,
            'flightNumber': flight.flightNumber,
          }
        })
      }
    },
    created() {
      this.arrivals = this.getArrivals();
      this.departures = this.getDepartures();
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