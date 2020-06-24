<template>
  <v-layout>
    <v-flex class="text-center">
      <v-card class="pt-5 pl-5 pr-5">
        <v-text-field v-model="value" label="Value" required></v-text-field>
        <v-text-field v-model="valueInterest" label="Interest Rate" required></v-text-field>
        <v-text-field v-model="valuePeriods" label="Periods" required></v-text-field>
        <v-select :items="optionSelect" v-model="valueSelect"></v-select>
        <v-btn block color="primary" @click="count">COUTN</v-btn>
      </v-card>
      <v-card class="mt-5">
        COUNTED:
        {{counted}}
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import TableFunction from "~/assets/TableFunction.js";
export default {
  data() {
    return {
      tableFunction: new TableFunction(),
      optionSelect: [
        { text: "F/P", value: "F/P" },
        { text: "P/F", value: "P/F" },
        { text: "F/A", value: "F/A" },
        { text: "A/F", value: "A/F" },
        { text: "A/P", value: "A/P" },
        { text: "P/A", value: "P/A" },
        { text: "A/G", value: "A/G" },
        { text: "P/G", value: "P/G" }
      ],
      value: 0,
      valueInterest: 0,
      valuePeriods: 0,
      counted: 0,
      valueSelect: "F/P"
    };
  },
  methods: {
    count: function() {
      this.counted = this.tableFunction.find(
        Number(this.value) ,
        this.valueSelect,
        Number(this.valueInterest),
        Number(this.valuePeriods)
      );
    }
  }
};
</script>
