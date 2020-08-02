<template>
  <div>
      <div v-if="stockSym">
        {{updateStocks()}}
      <vue-trading-view
          :options="{
            symbol: stockSym,
        theme: 'light',
        interval: 'D',
        width: 1000,
        allow_symbol_change: ture,
          }"
      ></vue-trading-view>
      </div>

    <div>
      <analysis :financeData="financialData"></analysis>


    </div>
  </div>
</template>

<script>




import VueTradingView from "vue-trading-view";
import Analysis from "@/components/Analysis";
import axios from 'axios'

export default {
  name: "Chart",
  components: {
    Analysis,
    VueTradingView,
  },
  props:['clearData'],
  data(){
    return{
      url:'',
      stockPrice:this.$store.state.stockPrice,
      apikey:'?apikey=bbfda58f6fe85810182cd88c8f84c4ac',
      financialData:{}
    }

  },
  computed:{
    stockSym(){
      return this.$store.state.symbol
    }
  },
  methods:{
    updateStocks(){
      if(!this.clearData){
        return
      }
      const vm = this;
      const unirest = require('unirest');
      const API_KEY = "56ed08883fmsh85f6cf789654c75p1d540cjsn8c0df248e1ae";
      unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${this.$store.state.symbol}`)
          .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
          .header("X-RapidAPI-Key", API_KEY)
          .end(function (result) {
            vm.financialData =  result.body.financialData
          });
      this.$store.state.stockPrice = this.financialData.currentPrice.raw;
    }
  }
};
</script>
