<template>
  <div>
    <div v-if="stockSym">
      <VueTradingView
        :options="{
          symbol: stockSym,
          theme: 'light',
          interval: 'D',
          width: 1000,
          allow_symbol_change: true,
        }"
      />
    </div>

    <div>
      <analysis :financeData="financialData"></analysis>
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
  //props:['clearDataObj'],
  data() {
    return {
      url: "",
      stockPrice: this.$store.state.stockPrice,
      financialData: {},
    };
  },
  computed: {
    stockSym() {
      return this.$store.state.symbol;
    },
  },
  methods: {
    async updateStocks() {
      console.log("publicToken", this.publicToken);
      if (!this.$store.state.clearDataObj) {
        return;
      }
      console.log("symbol", this.$store.state.symbol);
      try {
        await axios
          .get(
            `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/quote?token=sk_9fea5a3a643e4dc3b771899b3a642177`
          )
          .then((res) => {
            this.financialData = res.data;
          });
      } catch (err) {
        console.log("error", err);
      }

      this.$store.state.clearDataObj = false;
      console.log("financialData", this.financialData);
      this.$store.state.stockPrice = this.financialData.latestPrice;
    },
  },
};
</script>
