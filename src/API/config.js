if (process.env.NODE_ENV === 'production') {
  module.exports = {
    url: "https://api.trade.gov/v1/adcvd_orders/search",
    apiKey: "hSLqwdFz1U25N3ZrWpLB-Ld4",
  }
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    url: "https://api.govwizely.com/v1/adcvd_orders/search",
    apiKey: "Z48wSr3E3nNN4itDUvE4Clje",
  }
} else if (process.env.NODE_ENV === 'test'){
  module.exports = {
    /* move the json file to /public first */
    url: "./adcvd_orders-paper.json",
    apiKey: "test",  
  }
} else {
  module.exports = {
    url: "https://api.govwizely.com/v1/adcvd_orders/search",
    apiKey: "Z48wSr3E3nNN4itDUvE4Clje",  
    // url: "./adcvd_orders-paper.json",
    // apiKey: "test",  
  }
}