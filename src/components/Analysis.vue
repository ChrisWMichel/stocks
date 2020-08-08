<template>
  <b-container fluid class="text-center">
    <b-row>
      <b-col lg="12" class="p-3 mt-4">
        <h4 style="text-decoration:underline">SHORT DESCRIPTION</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="pr-5 pl-5">
        <h5 class="mx-lg-5 mx-0">{{ this.shortData }}</h5>
      </b-col>
    </b-row>
    <b-row style="display: flex;" class="pt-5 pb-5">
      <b-col lg="1"></b-col>
      <b-col lg="4" class="pr-3">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="2">TECHNICAL BREAKDOWN</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th class="text-center">TRENDING BAND:</b-th>
              <b-th class="text-left">{{ this.band }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">RSI:</b-th>
              <b-th class="text-left">{{ this.rsiData }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">MACD:</b-th>
              <b-th class="text-left">{{ this.macdData }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">VOLUME:</b-th>
              <b-th class="text-left">{{ this.volumeData }}</b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col lg="2"></b-col>
      <b-col lg="4">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="2">FUNDAMENTAL BREAKDOWN</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th class="text-center">PRICE TO EARNINGS:</b-th>
              <b-th class="text-left pr-4 pr-md-5 pr-lg-0">{{ this.pe }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">EBITDA RATING:</b-th>
              <b-th class="text-left">{{ this.ebit }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PRICE TO BOOK RATIO:</b-th>
              <b-th class="text-left">{{ this.pb }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PROFIT MARGIN:</b-th>
              <b-th class="text-left">{{ this.pm }}</b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col lg="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Analysis",
  props: {},
  data() {
    return {
      description: this.shortData,
    };
  },
  computed: {
    ...mapGetters({
      choppiness: "getChoppiness",
      chopPct: "getChopPct",
      band: "getBand",
      rsiData: "getRsiData",
      volumeData: "getVolumeData",
      macdData: "getMacdData",
      shortData: "getShortData",
      pe: "getPe",
      pb: "getPb",
      pm: "getPm",
      ebit: "getEbit",
    }),
  },
  methods: {},
};
</script>

<style scoped></style>
