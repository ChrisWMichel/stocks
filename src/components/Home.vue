<template>
  <b-container>
    <b-row class="dropdown searchBox" style="margin-left: 12%"
      ><!--class="justify-content-md-center"-->
      <b-col cols="8" lg="7" md="5" sm="7" style="padding-right: 0">
        <auto-search @getStock="getStock"></auto-search>
      </b-col>
      <!--<b-col cols="1" style="padding: 0">
        <button size="sm" class="" @click="clearData">Clear</button>
      </b-col>-->
      <b-col cols="4" style="padding-left: 20%" class="top-label">
        {{ getSockPrice || 0 | currency }}
      </b-col>
    </b-row>
    <chart class="chart" ref="updateStock"></chart>
  </b-container>
</template>

<script>
import Chart from "./Chart";
import AutoSearch from "@/components/AutoSearch";

export default {
  name: "Home",
  components: {
    AutoSearch,
    Chart,
  },
  data() {
    return {
      showList: true,
    };
  },
  methods: {
    getStock() {
      this.$refs.updateStock.updateStocks();
    },

    clearData() {
      this.filterText = "";
      this.stockName = "";
      this.stockSymbol = "";
      this.$store.state.symbol = "";
      this.$store.state.stockPrice = 0;
      this.$store.state.clearDataObj = true;
      this.$refs.typeBox.focus();
    },
  },
  computed: {
    getSockPrice() {
      return this.$store.state.stockPrice;
    },
  },
  filters: {
    currency: function(value) {
      let formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  },
};
</script>

<style scoped>
.dropStocks {
  background-color: aliceblue;
  padding-left: 8px;
}
.dropStocks:hover {
  font-weight: bolder;
  background-color: #b3d7e5;
  cursor: pointer;
  padding-left: 8px;
}
.dropdown-list {
  height: 200px;
  overflow: auto;
  width: calc(100% - 10px);
  z-index: 1000;
  position: absolute;
}
.searchBox {
  /*margin-left: 150px;*/
  margin-top: 40px;

  font-size: 20px;
}
.chart {
  margin-top: 10px;
  position: relative;
}
.top-label {
  font-weight: bold;
  font-size: 20px;
}
</style>
