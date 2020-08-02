import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);
//import axios from 'axios';

const store = new Vuex.Store({
    state:{
        symbol:'',
        stockPrice:0
    },
    getters:{

    }
})

export default store;
