<template>
  <div>
    <div class="dropdown searchBox">
        <input
            class="dropdown-input"
            v-model.trim="filterText"
            type="text"
            style="width: 80%;"
            placeholder="Search Stocks"
        />
        <div v-show="filterText " class="dropdown-list">
          <div
              v-for="item in filteredNames"
              :key="item.symbol"
              @click.prevent="storeData(item)"
              class="dropStocks"
          >
            {{item.name || 'N/A'}}: ({{item.symbol}})

          </div>
        </div>
     <!-- <button size="sm" text="Button" class="" @click="clearData">Clear</button>-->
      </div>

  </div>
</template>

<script>
import {stockMixin} from "@/mixins/stockMixin";

export default {
  name: "Home",
  mixins:[stockMixin],
  data(){
    return{
      inputValue:'',
      stockName:'',
      stockSymbol:'',
      showList:true
    }
  },
  methods:{
    storeData(item){
      this.stockName = item.name;
      this.stockSymbol = item.symbol;
      this.filterText = `${this.stockName} (${this.stockSymbol} )`;
      this.showList = false;
    },
    clearData(){
      this.filterText = '';
      this.stockName = '';
      this.stockSymbol = '';
    }
  }
}
</script>

<style scoped>
.dropStocks{
  background-color: aliceblue;
  padding-left: 8px;


}
.dropStocks:hover{
  font-weight: bolder;
  background-color: #b3d7e5;
  cursor: pointer;
  padding-left: 8px;
}
.dropdown-list{
  height: 200px;
  overflow: auto;
  width:80%
}
.searchBox{
  margin-top:30px
}
</style>
