<template>
  <div>
    <div class="dropdown searchBox">
        <input
            class="dropdown-input"
            v-model.trim="inputValue"
            type="text"
            style="width: 80%;"
            placeholder="Search Stocks"
        />
        <div v-show="inputValue" class="dropdown-list">
          <div
              v-show="itemVisible(item) && showList"
              v-for="item in Stocknames"
              :key="item.symbol"
              @click="storeData(item)"
              class="dropStocks"
          >
            {{item.name}}: {{item.symbol}}

          </div>
        </div>
     <!-- <button size="sm" text="Button" class="" @click="clearData">Clear</button>-->
      </div>

  </div>
</template>

<script>
import {stockNames} from "@/mixins/stockNames";

export default {
  name: "Home",
  mixins:[stockNames],
  data(){
    return{
      inputValue:'',
      stockName:'',
      stockSymbol:'',
      showList: false
    }
  },
  methods:{
    itemVisible(item){
      this.showList = true;
      let name = item.name.toLowerCase();
      let input = this.inputValue.toLowerCase();
      return name.includes(input);
    },
    storeData(item){

      this.stockName = item.name;
      this.stockSymbol = item.symbol;
      this.inputValue = `${this.stockName} (${this.stockSymbol} )`;
      this.showList = false;
    },
    clearData(){
      this.inputValue = '';
      this.stockName = '';
      this.stockSymbol = '';
    }
  }
}
</script>

<style scoped>
.dropStocks{
  background-color: aliceblue
}
.dropStocks:hover{
  font-weight: bolder;
  background-color: #b3d7e5;
  cursor: pointer;
}
.searchBox{
  margin-top:30px
}
</style>
