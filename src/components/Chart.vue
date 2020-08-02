<template>
  <div>
      <div v-if="stockSym">
        {{updateStocks()}}
       <!-- <h3>Symbol: {{stockSym}}</h3>-->

      <vue-trading-view
          :options="{
            symbol: stockSym,
            theme: 'light'
          }"
      ></vue-trading-view>
      </div>

    <div>
      <analysis></analysis>


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

      /*const data = null;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
         // console.log(this.responseText);
          const financialData = this.responseText
          console.log('allData', financialData)
          console.log('financialData',financialData['financialData']); // .currentPrice.raw
        }
      });

      xhr.open("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=" + this.$store.state.symbol);
      xhr.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "56ed08883fmsh85f6cf789654c75p1d540cjsn8c0df248e1ae");

      xhr.send(data);*/

      const unirest = require('unirest');
      const API_KEY = "56ed08883fmsh85f6cf789654c75p1d540cjsn8c0df248e1ae";
      const region = "US", lang = "en";
      unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${this.$store.state.symbol}`)
          .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
          .header("X-RapidAPI-Key", API_KEY)
          .end(function (result) {
            //console.log(result.status, result.headers, result.body);
            //this.financialData = result.body.financialData
            console.log('financialData', result.body.financialData) // .financialData.currentPrice.raw
            this.getFinancialData(result.body.financialData)
            //console.log('StockPrice', result.body.financialData)
          });
      //this.$store.state.stockPrice = this.financialData.currentPrice.raw;
    },
    getFinancialData(finData){
      console.log('finData', finData)
    }
  }
};
</script>
