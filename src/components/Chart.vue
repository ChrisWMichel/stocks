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
        allow_symbol_change: true,
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
  //props:['clearDataObj'],
  data(){
    return{
      url:'',
      stockPrice:this.$store.state.stockPrice,
      financialData:{}
    }

  },
  computed:{
    stockSym(){
      return this.$store.state.symbol
    }
  },
  methods:{
   async updateStocks(){
      console.log('clearData', this.$store.state.clearDataObj)
      if(!this.$store.state.clearDataObj){
        return
      }
      const vm = this;
      const unirest = require('unirest');
     const API_KEY = "1db6b9ba8amsh9cc23089d055ba9p13a441jsna126072d3c8b";
      try {
       await unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${this.$store.state.symbol}`)
            .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", API_KEY)
            .end(function (result) {
              vm.financialData =  result.body.financialData
            });
      } catch (err){
        console.log('error', err)
      }


      this.$store.state.clearDataObj = false;
      console.log('financialData', this.financialData)
      this.$store.state.stockPrice = this.financialData.currentPrice.raw;
    }
  }
};
</script>
