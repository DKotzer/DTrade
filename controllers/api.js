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
