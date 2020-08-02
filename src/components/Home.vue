<template>
  <b-container >
    <b-row class="dropdown searchBox" style="margin-left: 12%"><!--class="justify-content-md-center"-->
      <b-col cols="7" lg="7" md="5" sm="7" style="padding-right: 0">
        <input
            class="dropdown-input"
            v-model.trim="filterText"
            type="text"
            style="width: 100%;"
            placeholder="Search Stocks"
        />
        <div class="text-center">
          <small>Click the 'Clear' button for new search</small>
        </div>
        <div v-show="filterText" class="dropdown-list">
          <div
              v-for="item in filteredNames"
              :key="item.symbol"
              @click.prevent="storeData(item)"
              class="dropStocks"
          >
            {{ item.name || "N/A" }}: ({{ item.symbol }})
          </div>
        </div>
      </b-col>
      <b-col cols="1" style="padding: 0">
        <button size="sm"  class="" @click="clearData">Clear</button>
      </b-col>
      <b-col cols="4" style="padding-left: 5%" class="top-label" >
        {{ getSockPrice || 0 | currency}}
      </b-col>

    </b-row>
      <chart class="chart" :clearDataObj="clearData"></chart>
  </b-container>
</template>

<script>
import { stockMixin } from "@/mixins/stockMixin";
import Chart from "./Chart";

export default {
  name: "Home",
  components: {
    Chart,
  },
  mixins: [stockMixin],
  data() {
    return {
      stockName: "",
      stockSymbol: "",
      showList: true,
      clearDataObj: false

    };
  },
  methods: {
    storeData(item) {

      this.$store.state.symbol = item.symbol;
      this.stockName = item.name;
      this.stockSymbol = item.symbol;
      this.filterText = `${this.stockName} (${this.stockSymbol} )`;
      this.showList = false;
      this.clearDataObj = true;

    },
    clearData() {
      this.filterText = "";
      this.stockName = "";
      this.stockSymbol = "";
      this.$store.state.symbol = "";
      this.$store.state.stockPrice = 0;
    }
  },
  computed:{
    getSockPrice(){
      return this.$store.state.stockPrice
    }
  },
  filters: {
    currency: function (value) {
      let formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
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
  margin-top: 30px;

  font-size: 20px;
}
.chart {
  margin-top: 30px;
  position: relative;
}
.top-label{
  font-weight: bold;
  font-size: 20px;
}
</style>
