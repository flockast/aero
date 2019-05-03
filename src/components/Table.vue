<template>
  <div class="table-wrap">
    <table class="table">
      <thead>
      <tr>
        <th v-for="header in headers">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="flight in flights">
        <td>{{ flight.time | moment('DD.MM.YY / HH:mm')}}</td>
        <td v-if="flight.delay">{{ flight.delay | moment('mm:ss') }}</td>
        <td v-else>{{ 'без задержки' }}</td>
        <td>{{ flight.place }}</td>
        <td>{{ flight.flightNumber }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        props: ["headers", "flights"]
    }
</script>

<style lang="scss">
  .table-wrap {
    overflow-x: auto;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1.4rem;

    th {
      padding: 1rem .5rem;
      border-bottom: .2rem solid #525252;
      font-weight: bold;
      text-align: left;
    }

    td {
      padding: 1rem .5rem;
      border-bottom: .1rem solid #3c3c3c;
    }

    tr:hover {
      td {
        background: #333333;
      }
    }
  }
</style>