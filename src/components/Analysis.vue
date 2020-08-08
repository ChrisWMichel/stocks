<template>
  <b-container fluid class="text-center">
    <!--justify-content-sm-center justify-content-md-center justify-content-lg-center-->
    <b-row>
      <b-col md="12" class="p-3">
        <h4>Description</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5 class="mx-3">{{ this.shortData }}</h5>
      </b-col>
    </b-row>
    <b-row style="display: flex;" class="pt-4">
      <b-col md="1"></b-col>
      <b-col md="4" class="pr-5">
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
      <b-col md="2"></b-col>
      <b-col md="4">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="2">FUNDAMENTAL BREAKDOWN</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th class="text-center">PRICE TO EARNINGS:</b-th>
              <b-th class="text-left">{{ priceToEarnings }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">EBITDA RATING:</b-th>
              <b-th class="text-left">{{ ebitdaRating }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PRICE TO BOOK RATIO:</b-th>
              <b-th class="text-left">{{ priceToBookRatio }}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PROFIT MARGIN:</b-th>
              <b-th class="text-left">{{ profitMargin }}</b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col md="1"></b-col>
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
      priceToEarnings: "GOOD",
      ebitdaRating: "FAIR",
      priceToBookRatio: "GOOD",
      profitMargin: "LOW",
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
    }),
  },
  methods: {},
};
</script>

<style scoped></style>
