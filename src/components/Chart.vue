<template>
  <div>
    <div v-if="stockSym">
      {{ updateStocks() }}
      <vue-trading-view
        :key="stockSym"
        :options="{
          symbol: stockSym,
          theme: 'light',
          interval: 'D',
          width: 1000,
          allow_symbol_change: true,
        }"
      ></vue-trading-view>
    </div>

    <div>
      <analysis
        :financeData="band"
        :rsiData="rsiData"
        :macdData="macdData"
        :volumeData="volumeData"
      ></analysis>
    </div>
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";
import Analysis from "@/components/Analysis";
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
      stockPrice: this.$store.state.stockPrice,
      financialData: {},
      bandData: {},
      upperBand: 0,
      lowerBand: 0,
      band: "",
      rsi: "",
      rsiData: "",
      macd: "",
      macdData: "",
      volume: "",
      volumeData: "",
      priceData: {},
      highData: {},
      highPrice: 0,
      lowData: {},
      lowPrice: 0,
      HV: 0,
      EM: 0,
    };
  },
  computed: {
    stockSym() {
      console.log("symbol", this.$store.state.symbol);
      return this.$store.state.symbol;
    },
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
              // console.log("====================>>", this.EM);
            })
          );
      } catch (err) {
        console.log("error", err);
      }
      this.$store.state.clearDataObj = false;
      if (this.$store.state.stockPrice > this.upperBand) {
        this.$store.state.band = "BULLISH";
      } else if (this.$store.state.stockPrice < this.lowerBand) {
        this.$store.state.band = "BEARISH";
      } else if (
        this.upperBand > this.$store.state.stockPrice &&
        this.$store.state.stockPrice > this.lowerBand
      ) {
        this.$store.state.band = "NEUTRAL";
      }
      this.band = this.$store.state.band;
      //RSI if-then statements
      if (this.rsi > 70) {
        this.rsiData = "BEARISH";
      } else if (this.rsi < 35) {
        this.rsiData = "BULLISH";
      } else if (35 < this.rsi && 70 > this.rsi) {
        this.rsiData = "NEUTRAL";
      }
      //MACD if-then statements
      if (this.macd > 0) {
        this.macdData = "BULLISH";
      } else if (this.macd < 0) {
        this.macdData = "BEARISH";
        console.log("===>", this.macdData);
      }
      //Volume if-then statements
      if (this.$store.state.stockPrice > this.volume) {
        this.volumeData = "BULLISH";
      } else if (this.$store.state.stockPrice < this.volume) {
        this.volumeData = "BEARISH";
      }
      // this.forceUpdate();
    },
  },
};
</script>
