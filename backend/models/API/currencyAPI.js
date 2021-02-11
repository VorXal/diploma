var unirest = require("unirest");

const CurrencyInformer = {
    getAllRatesToUSD: async function(){
        let response = await new Promise((resolve, reject) => {
            unirest("GET", "https://currency26.p.rapidapi.com/rates")
            .headers({
                "x-rapidapi-key": "f463316395msh7e8c983d120ae5ep1f57e7jsn5e6b0f0d5903",
                "x-rapidapi-host": "currency26.p.rapidapi.com",
                "useQueryString": true
            })
            .end(function (response) {
                if (response.error) {
                  return reject(response.error);
                }
                return resolve(response.body);
            });
        });
        return response.rt;
    }
}
module.exports = CurrencyInformer;