<template>
  <b-container fluid class="text-center">
    <!--justify-content-sm-center justify-content-md-center justify-content-lg-center-->
    <b-row>
      <b-col md="12" class="p-3">
        <h4 >Description</h4>
      </b-col>
    </b-row>
    <b-row >
        <b-col>
          <b-form-textarea
              style="border: none"
            id="textarea"
            v-model="description"
            rows="5"
            class="m-auto"
          ></b-form-textarea>
        </b-col>
    </b-row>
    <b-row style="display: flex;" class="pt-4">
      <b-col md="1"></b-col>
      <b-col md="4" class="pr-5" >
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="2">TECHNICAL BREAKDOWN</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th class="text-center">TRENDING BAND:</b-th>
              <b-th class="text-left">{{trendingBand}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">RSI:</b-th>
              <b-th class="text-left">{{rsi}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">MACD:</b-th>
              <b-th class="text-left">{{macd}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">VOLUME:</b-th>
              <b-th class="text-left">{{volume}}</b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col md="2"></b-col>
      <b-col md="4">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="2">FUNDAMENTAL BREAKDOWN</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th class="text-center">PRICE TO EARNINGS:</b-th>
              <b-th class="text-left">{{priceToEarnings}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">EBITDA RATING:</b-th>
              <b-th class="text-left">{{ebitdaRating}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PRICE TO BOOK RATIO:</b-th>
              <b-th class="text-left">{{priceToBookRatio}}</b-th>
            </b-tr>
            <b-tr>
              <b-th class="text-center">PROFIT MARGIN:</b-th>
              <b-th class="text-left">{{profitMargin}}</b-th>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col md="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Analysis",
  data(){
    return{
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      trendingBand:'BULLISH',
      rsi: 'BULLISH',
      macd:'BULLISH',
      volume: 'BULLISH',
      priceToEarnings:'GOOD',
      ebitdaRating:'FAIR',
      priceToBookRatio:'GOOD',
      profitMargin:'LOW'

    }
  }
}
</script>

<style scoped>

</style>
