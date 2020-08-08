import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//import axios from 'axios';

const store = new Vuex.Store({
  state: {
    symbol: "",
    stockPrice: 0,
    clearDataObj: true,
    choppiness: "",
    chopPct: "",
    band: "",
    rsiData: "",
    volumeData: "",
    macdData: "",
    shortData: "",
    pm: "",
    pb: "",
    pe: "",
    ebit: "",
  },
  getters: {
    getChoppiness: (state) => state.choppiness,
    getChopPct: (state) => state.chopPct,
    getBand: (state) => state.band,
    getRsiData: (state) => state.rsiData,
    getVolumeData: (state) => state.volumeData,
    getMacdData: (state) => state.macdData,
    getLowerBand: (state) => state.lowerBand,
    getShortData: (state) => state.shortData,
    getSymbol: (state) => state.symbol,
    getStockPrice: (state) => state.stockPrice,
    getClearDataObject: (state) => state.clearDataObj,
    getUpperBand: (state) => state.upperBand,
    getPm: (state) => state.pm,
    getPb: (state) => state.pb,
    getPe: (state) => state.pe,
    getEbit: (state) => state.ebit,
  },
  mutations: {
    calcChoppiness(state, payload) {
      const greaterPrices = [];
      for (let x in payload) {
        let price = payload[x];
        if (state.stockPrice > price.high) {
          greaterPrices.push(price);
        }
      }

      const result = (greaterPrices.length / payload.length) * 100;
      state.chopPct = result;
      if (result >= 67) {
        state.choppiness = "No Choppiness";
      } else {
        state.choppiness = "Has Choppiness";
      }
    },
  },
});

export default store;
