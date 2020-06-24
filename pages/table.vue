<template>
  <v-layout>
    <v-flex class="text-center">
      <div v-for="(index,rtable) in dataTable" :key="rtable">
        <v-card class="mt-5">
          <v-toolbar flat>
            <v-toolbar-title>{{(rtable+1)/2}}%</v-toolbar-title>
          </v-toolbar>
          <v-data-table :headers="headerTable" :items="index.tablePeriods" class="elevation-1"></v-data-table>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import TableFunction from "~/assets/TableFunction.js";
export default {
  data() {
    return {
      tableFunction: new TableFunction(),
      dataTable: [],
      headerTable: [
        { text: "number", value: "n" },
        { text: "F/P", value: "fp" },
        { text: "P/F", value: "pf" },
        { text: "F/A", value: "fa" },
        { text: "A/F", value: "af" },
        { text: "A/P", value: "ap" },
        { text: "P/A", value: "pa" },
        { text: "A/G", value: "ag" },
        { text: "P/G", value: "pg" }
      ]
    };
  },
  mounted() {
    this.dataTable = this.tableFunction.printTable(3, 100);
  }
};
</script>
