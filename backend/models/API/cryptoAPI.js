var unirest = require("unirest");

const CryptoInformer = {
    getAllCoinsInfo: async function(){
        let response = await new Promise((resolve, reject) => {
            unirest("GET", "https://coinranking1.p.rapidapi.com/coins")
                .headers({
                    "x-rapidapi-key": "f463316395msh7e8c983d120ae5ep1f57e7jsn5e6b0f0d5903",
                    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                    "useQueryString": true
                })
                .end(function (response) {
                    if (response.error) {
                      return reject(response.error);
                    }
                    return resolve(response.body);
                });
        });
        return response.data.coins;
    },
    getCoinInfo: async function(id){
        let response = await new Promise((resolve, reject) => {
            unirest("GET", `https://coinranking1.p.rapidapi.com/coin/${id}`)
            .headers({
                "x-rapidapi-key": "f463316395msh7e8c983d120ae5ep1f57e7jsn5e6b0f0d5903",
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "useQueryString": true
            })
            .end(function (response) {
                if (response.error) {
                  return reject(response.error);
                }
                return resolve(response.body);
            });
        });
        return response.data.coin;
    }
}
module.exports = CryptoInformer;