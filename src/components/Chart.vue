<template>
  <div>
      <div v-if="stockSym">
        {{updateStocks()}}
        <vue-trading-view
            :key="stockSym"
            :options="{
              symbol: stockSym,
              theme: 'light',
              interval: 'D',
              width: 1000,
              allow_symbol_change: true
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

  data(){
    return{
      url:'',
      stockPrice:this.$store.state.stockPrice,
      financialData:{}
    }

  },
  computed:{
    stockSym(){
      console.log('symbol', this.$store.state.symbol)
      return this.$store.state.symbol
    }
  },
  methods:{
    async updateStocks(){

      if(!this.$store.state.clearDataObj){
        return
      }
      try {
        await axios.get(
            //  pk_b126cb1ba8dc441aa3673f3ccb2a3ba5
            // sk_9fea5a3a643e4dc3b771899b3a642177
            `https://cloud.iexapis.com/stable/stock/${this.$store.state.symbol}/quote?token=pk_b126cb1ba8dc441aa3673f3ccb2a3ba5`
        )
            .then((res) => {
              this.financialData = res;
              console.log("financialData", res.data);
              this.$store.state.stockPrice = this.financialData.data.latestPrice;
            });
      } catch (err){
        console.log('error', err)
      }

      this.$store.state.clearDataObj = false;
      this.forceUpdate();
    }
  }
};
</script>
