<template>
  <div>
    <div v-if="stockSym">
      <p style="color: white">
        {{ updateStocks() }}
      </p>
      <vue-trading-view
        :key="stockSym"
        :options="{
          symbol: stockSym,
          theme: 'light',
          interval: 'D',
          width: 900,
          allow_symbol_change: true,
        }"
      ></vue-trading-view>
    </div>

    <div v-if="stockSym">
      <analysis :financeData="band"></analysis>
    </div>
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";
import Analysis from "@/components/Analysis";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Chart",
  components: {
    Analysis,
    VueTradingView,
  },

  data() {
    return {
      url: "",
      financialData: {},
      bandData: {},
      upperBand: 0,
      lowerBand: 0,
      rsi: "",
      macd: "",
      volume: "",
      priceData: {},
      highData: {},
      highPrice: 0,
      lowData: {},
      lowPrice: 0,
      HV: 0,
      EM: 0,
      midLine: 0,
      devHigh: 0,
      devLow: 0,
    };
  },
  computed: {
    stockSym() {
      return this.$store.state.symbol;
    },
    ...mapActions(["band", "rsidata", "volumeData", "macdData", "shortData"]),
    ...mapGetters({
      choppiness: "getChoppiness",
      chopPct: "getChopPct",
      band: "getBand",
      rsiData: "getRsiData",
      volumeData: "getVolumeData",
      macdData: "getMacdData",
      stockPrice: "getStockPrice",
      shortData: "getShortData",
    }),
  },
  methods: {
    async updateStocks() {
      if (!this.$store.state.clearDataObj) {
        return;
      }
      try {
        await axios
          .all([
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/quote?token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/indicator/bbands?range=1m&token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/indicator/rsi?range=1m&token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/indicator/macd?range=6m&token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/indicator/sma?range=6m&token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/chart/1y?token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
            axios.get(
              `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/advanced-stats?token=sk_9fea5a3a643e4dc3b771899b3a642177`
            ),
          ])
          .then(
            axios.spread((res1, res2, res3, res4, res5, res6) => {
              this.financialData = res1;
              this.$store.state.stockPrice = this.financialData.data.latestPrice;
              this.bandData = res2.data.indicator;
              this.upperBand = this.bandData[2].slice(-1).pop();
              this.lowerBand = this.bandData[0].slice(-1).pop();
              this.rsi = res3.data.indicator[0].slice(-1).pop();
              this.macd = res4.data.indicator[0].slice(-1).pop();
              this.volume = res5.data.indicator[0].slice(-1).pop();
              this.$store.commit("calcChoppiness", res6.data);
              this.priceData = res6.data;
              this.highData = this.priceData.map((ele) => {
                return ele.high;
              });
              this.highPrice = Math.max.apply(Math, this.highData);
              this.lowData = this.priceData.map((ele) => {
                return ele.low;
              });
              this.lowPrice = Math.min.apply(Math, this.lowData);
              this.HV =
                (this.highPrice - this.lowPrice) /
                ((this.highPrice + this.lowPrice) / 2);
              this.EM =
                this.$store.state.stockPrice * this.HV * Math.sqrt(5 / 253);
              this.midLine = this.upperBand - this.EM;
              this.devHigh = this.midLine + 4 * this.EM;
              this.devLow = this.midLine - 4 * this.EM;
            })
          );
      } catch (err) {
        console.log("error", err);
      }
      this.$store.state.clearDataObj = false;
      if (this.stockPrice > this.upperBand) {
        this.$store.state.band = "BULLISH";
      } else if (this.stockPrice < this.lowerBand) {
        this.$store.state.band = "BEARISH";
      } else if (
        this.upperBand > this.stockPrice &&
        this.stockPrice > this.lowerBand
      ) {
        this.$store.state.band = "NEUTRAL";
      }
      //RSI if-then statements
      if (this.rsi > 70) {
        this.$store.state.rsiData = "BEARISH";
      } else if (this.rsi < 35) {
        this.$store.state.rsiData = "BULLISH";
      } else if (35 < this.rsi && 70 > this.rsi) {
        this.$store.state.rsiData = "NEUTRAL";
      }
      //MACD if-then statements
      if (this.macd > 0) {
        this.$store.state.macdData = "BULLISH";
      } else if (this.macd < 0) {
        this.$store.state.macdData = "BEARISH";
      }
      //Volume if-then statements
      if (this.$store.state.stockPrice > this.volume) {
        this.$store.state.volumeData = "BULLISH";
      } else if (this.$store.state.stockPrice < this.volume) {
        this.$store.state.volumeData = "BEARISH";
      }
      // short description
      if (
        this.stockPrice > this.upperBand &&
        (this.choppiness = "No Choppiness") &&
        this.stockPrice > 0.01 * this.devHigh
      ) {
        this.$store.state.shortData =
          "This stock is in an uptrend and trends well. This should be a good buy if a stop loss is placed at roughly (stock price * .96).";
      } else if (
        this.stockPrice > this.upperBand &&
        (this.choppiness = "Has Choppiness") &&
        this.stockPrice > 0.01 * this.devHigh
      ) {
        this.$store.state.shortData =
          "This stock is in an uptrend but performs best as a range bound stock. If you decide to buy now, then a stop loss should be placed at roughly (stock price * .96).";
      } else if (
        this.stockPrice > this.upperBand &&
        (this.choppiness = "No Choppiness") &&
        this.stockPrice < 0.01 * this.devHigh
      ) {
        this.$store.state.shortData =
          "This stock is in an uptrend and trends well. However, the stock appears to be overextended since it is close to the top most band.";
      } else if (
        this.stockPrice < this.upperBand &&
        this.stockPrice > this.lowerBand &&
        (this.choppiness = "No Choppiness")
      ) {
        this.$store.state.shortData =
          "This stock is currently neutral/range bound because it is inside the band which means anything can happen. However, this stock trends well, so it should be a good buy above the band.";
      } else if (
        this.stockPrice < this.upperBand &&
        this.stockPrice > this.lowerBand &&
        (this.choppiness = "Has Choppiness")
      ) {
        this.$store.state.shortData =
          "This stock is currently neutral/range bound because it is inside the band which means anything can happen. However, this stock works best as a range bound stock.";
      } else if (
        this.stockPrice < this.lowerBand &&
        (this.choppiness = "No Choppiness") &&
        this.stockPrice > this.devLow
      ) {
        this.$store.state.shortData =
          "This stock is in a downtrend but typically trends well which means it will make a good buy when it gets above the band or a good dip buy when it goes below and crosses back above the bottom most line.";
      } else if (
        this.stockPrice < this.lowerBand &&
        (this.choppiness = "Has Choppiness") &&
        this.stockPrice > this.devLow
      ) {
        this.$store.state.shortData =
          "This stock is in a downtrend and is a good range bound stock which means that it will be a great buy at the bottom most band.";
      } else if (
        (this.choppiness = "Has Choppiness") &&
        this.stockPrice < this.devLow
      ) {
        this.$store.state.shortData =
          "This stock is currently at a great place to dip buy. Since this is more of a range bound stock, you have a perfect take profit at the top band.";
      } else if (
        (this.choppiness = "No Choppiness") &&
        this.stockPrice < this.devLow
      ) {
        this.$store.state.shortData =
          "This stock is currently at a great place to dip buy. This stock typically trends well so this is a great opportunity to get the stock at a great price.";
      }
      console.log("===>", this.choppiness);
      console.log("lb====================>>", this.lowerBand);
      console.log("ub====================>>", this.upperBand);
      console.log("h====================>>", this.devHigh);
      console.log("l====================>>", this.devLow);
      console.log("short======", this.$store.state.shortData);
    },
    startSetInterval() {
      setInterval(() => {
        this.updateStocks();
      }, 32000);
    },
  },
};
</script>
