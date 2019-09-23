<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-if="addIndex && columns.length > 0">No</th>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <td v-if="addIndex && columns.length > 0">{{index + 1}}</td>
      <slot :row="item">
        <!-- <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td> -->
        <td v-for="column in columns" :key="column">{{itemValue(item, column)}}</td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      addIndex: {
        type: Boolean,
        default : false
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column] !== 'undefined';
      },
      itemValue (item, column) {
        return item[column]
      }
    }
  }
</script>
<style>
</style>
