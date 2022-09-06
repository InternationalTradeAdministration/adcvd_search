if (process.env.NODE_ENV === 'test') {
  module.exports = {
    /* move the json file to `/public` first */
    url: "./adcvd_orders-paper.json",
    accessToken: "test",
  }
} else {
  module.exports = {
    url: "CHANGEME",
    accessToken: "CHANGEME",
  }
}
