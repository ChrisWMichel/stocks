<template>
  <div class="hello">
    <VueTradingView
      :options="{
        symbol: 'NASDAQ:AAPL',
        theme: 'light',
      }"
    />
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";

export default {
  name: "Chart",
  props: {
    msg: String,
  },
  components: {
    VueTradingView,
  },
};
</script>
