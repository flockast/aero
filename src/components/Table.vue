<template>
  <div class="table-wrap">
    <table class="table">
      <thead>
      <tr>
        <th>время</th>
        <th>задержка</th>
        <th>место</th>
        <th>рейс</th>
        <th>терминал</th>
        <th>статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="n in 10">
        <td>08:30</td>
        <td>+10</td>
        <td>Москва</td>
        <td>SU 199</td>
        <td>A</td>
        <td>Прибыл</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
        return {

        }
    }
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