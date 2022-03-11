const axios = require("axios");

const baseURL = "https://api.imgflip.com";

//API to call memes from third party api
exports.api_memes_get = (req, res) => {
  axios({
    method: "get",
    url: baseURL + "/get_memes",
    // headers: {'APIKEY': '234234234234'}//key/value go in here for paid apis
  })
    .then((response) => {
      //   console.log(response.data.data.memes);
      res.render("api/api.ejs", { data: response.data.data.memes });
    })
    .catch((error) => {
      console.log(error);
    });
};



// let options = {
//   method: 'GET',
//   url: 'https://yfapi.net/v11/finance/quoteSummary/AAPL',
//   params: {modules: 'defaultKeyStatistics,assetProfile'},
//   headers: {
//     'x-api-key': 'K9mJSDcAuf5lwZ7dNnkY687NO8L9D1si1eQEARqR'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
     