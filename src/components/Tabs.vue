<template>
  <div>
    <div class="fade-in" v-if="arrivals && departures">
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
          <board :headers="['дата/время', 'задержка', 'вылет из', 'рейс']"
                 :flights="arrivals"/>
        </div>
        <div v-if="currentTab == 'dep'">
          <board :headers="['дата/время', 'задержка', 'прилёт в', 'рейс']"
                 :flights="departures"/>
        </div>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<script>

    import TabsLine from 'vue-tabs-with-active-line';
    import Board from './Board.vue';
    import axios from 'axios';

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
                departures: '',
                arrReady: false,
                endpoint: "http://aero.flockast.ru"
            }
        },
        methods: {
            handleClickOnTab(newTab) {
                this.currentTab = newTab;
            },
            getParams(shedule) {
                const today = new Date();
                return {
                    shedule: shedule,
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate(),
                    hour: today.getHours()
                }
            },
            getArrivals() {
                let vm = this;
                axios.get(this.endpoint, {
                    params: vm.getParams('arr')
                })
                    .then(function (response) {
                        const {data} = response;
                        vm.arrivals = data.flightStatuses.map(flight => {

                            let place = data.appendix.airports.filter(airport => {
                                return airport.fs === flight.departureAirportFsCode;
                            })[0];

                            let delay = 0;
                            if (flight.delays) {
                                delay = flight.delays.arrivalGateDelayMinutes ? flight.delays.arrivalGateDelayMinutes : 0;
                            }

                            return {
                                'time': flight.arrivalDate.dateLocal,
                                'delay': delay,
                                'place': place.city,
                                'flightNumber': `${flight.carrierFsCode} ${flight.flightNumber}`,
                            }
                        }).sort((a, b) => {
                            return new Date(a.time) - new Date(b.time);
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDepartures() {
                let vm = this;
                axios.get(this.endpoint, {
                    params: vm.getParams('dep')
                })
                    .then(function (response) {
                        const {data} = response;
                        vm.departures = data.flightStatuses.map(flight => {

                            let place = data.appendix.airports.filter(airport => {
                                return airport.fs === flight.arrivalAirportFsCode;
                            })[0];

                            let delay = 0;
                            if (flight.delays) {
                                delay = flight.delays.departureGateDelayMinutes ? flight.delays.departureGateDelayMinutes : 0;
                            }

                            return {
                                'time': flight.departureDate.dateLocal,
                                'delay': delay,
                                'place': place.city,
                                'flightNumber': `${flight.carrierFsCode} ${flight.flightNumber}`,
                            }
                        }).sort((a, b) => {
                            return new Date(a.time) - new Date(b.time);
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created() {
            this.getArrivals();
            this.getDepartures();
        }
    }
</script>

<style lang="scss">
  @keyframes showShedule {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

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

  .fade-in {
    animation: showShedule .4s ease-in-out forwards;
  }
</style>