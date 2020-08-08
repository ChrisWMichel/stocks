<template>
  <div>
    <vue-autosuggest
      ref="autocomplete"
      v-model="query"
      :suggestions="suggestions"
      :inputProps="inputProps"
      :sectionConfigs="sectionConfigs"
      :renderSuggestion="renderSuggestion"
      :getSuggestionValue="getSuggestionValue"
      @input="fetchResults"
    />
    <!--<div v-if="selected" style="margin-top: 10px; display: flex;">
        <p style="margin-right: 10px">You have selected:</p>
        <h4 style="color: green">{{selected}}</h4>
      </div>-->
  </div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import axios from "axios";
export default {
  name: "AutoSearch",
  components: { VueAutosuggest },

  data() {
    return {
      query: "",
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 250,
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Search Stocks",
        class: "form-control",
        name: "hello",
      },
      suggestions: [],
      sectionConfigs: {
        securityName: {
          limit: 10,
          label: "",
          onSelected: (selected) => {
            this.selected = selected.item;
          },
        },
        // symbol: {
        //   limit: 10,
        //   label: "symbol",
        //   onSelected: selected => {
        //     this.selected = selected.item;
        //   }
        // }
      },
    };
  },
  methods: {
    fetchResults() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const usersPromise = axios.get(
          `https://cloud.iexapis.com/stable/search/${this.query}?token=pk_b126cb1ba8dc441aa3673f3ccb2a3ba5`
        );

        Promise.all([usersPromise]).then((resp) => {
          this.suggestions = [];
          this.selected = null;
          let values = resp[0].data;
          let stockList = [];
          for (let x in values) {
            let value = values[x];

            stockList.push(`${value.securityName} (${value.symbol})`);
          }
          //const stockName = this.filterResults(stockList.name, query);

          // const symbol = this.filterResults(stockList.symbol, query);

          //symbol.length && this.suggestions.push({ name: "symbol", data: symbol });

          stockList.length &&
            this.suggestions.push({ name: "securityName", data: stockList });
        });
      }, this.debounceMilliseconds);
    },
    filterResults(data, text) {
      return data
        .filter((item) => {
          if (item.toLowerCase().indexOf(text.toLowerCase()) > -1) {
            return item;
          }
        })
        .sort();
    },
    renderSuggestion(suggestion) {
      return suggestion.item;
    },
    getSuggestionValue(suggestion) {
      const regExp = /\(([^)]+)\)/;
      const selected = regExp.exec(suggestion.item);
      this.$store.state.symbol = selected[1];
      this.$emit("getStock");
      this.$store.state.clearDataObj = true;
      return `${suggestion.item}`;
    },
  },
};
</script>

<style>
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: aliceblue;
  padding: 0px;
  height: 200px;
  overflow-y: scroll;
}

.autosuggest__results ul {
  list-style: none !important;
  padding-left: 0;
  margin: 0;
  background-color: aliceblue !important;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results-before {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results
  .autosuggest__results-item.autosuggest__results-item--highlighted {
  background-color: #f6f6f6;
}
</style>
