if (process.env.NODE_ENV === 'test') {
  module.exports = {
    /* move the json file to `/public` first */
    url: "./adcvd_orders-paper.json",
    accessToken: "test",  
  }
} else {
  module.exports = {
    url: "https://api.trade.gov/gateway/v1/adcvd_orders/search",
    accessToken: "b0045391-2ef8-3049-a215-f78b7716f045",  
  }
}
